import { useState } from "react";
import { SolidButton } from "./reusables/Buttons";
import { PasswordInput, TextInput } from "./reusables/Input";
import { IconX } from "@tabler/icons-react";
import { useCookies } from "react-cookie";
import GoogleOauth from "./GoogleOauth";

function LoginRegister({
  show,
  setShow,
}: {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [loginToggle, setLoginToggle] = useState(true);
  return (
    <>
      <div className="absolute flex w-full justify-center">
        <div
          className={
            "relative z-50 flex-col items-center justify-end gap-4 rounded-lg border-4 border-secondary bg-background p-8" +
            " " +
            "sm:p-12 md:gap-6 md:rounded-xl md:px-20 md:py-16 lg:gap-8 lg:px-24 lg:py-20" +
            " " +
            (show ? "flex" : "hidden")
          }
        >
          {loginToggle ? (
            <Login setLoginToggle={setLoginToggle} setShow={setShow} />
          ) : (
            <Register setLoginToggle={setLoginToggle} setShow={setShow} />
          )}
          <div
            className="absolute right-4 top-4 cursor-pointer sm:right-5 sm:top-5"
            onClick={() => setShow(false)}
          >
            <IconX className="size-6 text-text/80 sm:size-8" stroke={2} />
          </div>
        </div>
      </div>
    </>
  );
}

function Login({
  setLoginToggle,
  setShow,
}: {
  setLoginToggle: React.Dispatch<React.SetStateAction<boolean>>;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [timeoutHandler, setTimeoutHandeler] = useState<number | null>();
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [debugText, setDebugText] = useState<string | null>(null);

  const [, setCookie] = useCookies(["token"]);

  function callDebug(text: string) {
    if (timeoutHandler !== null) clearTimeout(timeoutHandler);

    setDebugText(text);
    setTimeoutHandeler(
      setTimeout(() => {
        setDebugText(null);
        setTimeoutHandeler(null);
      }, 5000)
    );
    return;
  }

  async function handleLogin() {
    if (username === null) {
      callDebug("username is required");
      return;
    }
    if (password === null) {
      callDebug("password is required");
      return;
    }

    const response = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    if (response.status === 401) {
      const data = await response.json();
      callDebug(data.message);
      return;
    }
    if (!response.ok) {
      throw new Error("failed to fetch");
    }

    const token = await response.json();
    setCookie(
      "token",
      { token: token.token, type: "native" },
      { path: "/", maxAge: 60 * 60 * 24 }
    );

    window.location.reload();
    setShow(false);
  }
  return (
    <>
      <div className="w-full text-center font-nueu text-4xl font-bold text-accent sm:text-6xl">
        Login
      </div>

      <div className="flex flex-col gap-2 md:gap-4">
        <TextInput
          placeholder="Username*"
          value={username}
          setValue={setUsername}
        />

        <PasswordInput
          placeholder="Password*"
          value={password}
          setValue={setPassword}
        />
      </div>

      <div className="flex flex-col items-center justify-center gap-2">
        <div
          className={
            "text-center text-sm text-error sm:text-base md:text-lg" +
            " " +
            (debugText === null || debugText === "" ? "hidden" : "block")
          }
        >
          {debugText}
        </div>
        <SolidButton
          onClick={handleLogin}
          className={debugText !== null ? "animated-shake" : ""}
        >
          <span className="mx-2">Submit</span>
        </SolidButton>

        <div className="w-full text-center font-nueu text-sm font-bold text-text/50 sm:text-base md:text-lg">
          Click here to{" "}
          <span
            className="cursor-pointer text-accent/80 hover:text-accent"
            onClick={() => setLoginToggle(false)}
          >
            Register
          </span>
        </div>
      </div>
      <div className=" flex flex-col items-center justify-center gap-2">
        <div className="w-full text-center font-nueu text-base font-bold text-text sm:text-lg md:text-xl">
          Other Login Options:
        </div>
        <GoogleOauth />
      </div>
    </>
  );
}

function Register({
  setLoginToggle,
  setShow,
}: {
  setLoginToggle: React.Dispatch<React.SetStateAction<boolean>>;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const validUsernameLength = /^.{6,16}$/;
  const validUsernameChars = /^[A-Za-z0-9_.]+$/;
  const validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const validPasswordLength = /^.{6,256}$/;
  const validPasswordChars = /^[\S]+$/;

  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [confirmPassword, setConfirmPassword] = useState<string | null>(null);
  const [debugText, setDebugText] = useState<string | null>(null);

  const [, setCookie] = useCookies(["token"]);

  function callDebug(text: string) {
    setDebugText(text);
    setTimeout(() => {
      setDebugText(null);
    }, 5000);
    return;
  }

  async function handleRegister() {
    if (username === null) {
      callDebug("username is required");
      return;
    }
    if (email === null) {
      callDebug("email address is required");
      return;
    }
    if (password === null) {
      callDebug("password is required");
      return;
    }
    if (confirmPassword === null) {
      callDebug("enter the password twice");
      return;
    }

    if (
      !validUsernameLength.test(username) ||
      !validUsernameChars.test(username) ||
      !validEmail.test(email) ||
      !validPasswordLength.test(password) ||
      !validPasswordChars.test(password) ||
      password !== confirmPassword
    ) {
      callDebug("");
      return;
    }

    const response = await fetch("http://localhost:8000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
      }),
    });

    if (response.status === 401) {
      const data = await response.json();
      callDebug(data.message);
      return;
    }

    if (!response.ok) {
      throw new Error("failed to fetch");
    }

    const token = await response.json();
    setCookie(
      "token",
      { token: token.token, type: "native" },
      { path: "/", maxAge: 60 * 60 * 24 }
    );

    window.location.reload();
    setShow(false);
  }

  return (
    <>
      <div className="w-full text-center font-nueu text-4xl font-bold text-accent sm:text-6xl">
        Register
      </div>

      <div className="flex flex-col gap-2 md:gap-4">
        <TextInput
          placeholder="Username*"
          value={username}
          setValue={setUsername}
        >
          <div
            className={
              "text-start text-xs text-error sm:text-sm md:text-base" +
              " " +
              (username === null ? "hidden" : "block")
            }
          >
            {!validUsernameLength.test(username ?? "") && (
              <span>
                must be between 6 to 16 characters
                <br />
              </span>
            )}
            {!validUsernameChars.test(username ?? "") && (
              <span>
                must only contain alphabets, numbers, _ and .<br />
              </span>
            )}
          </div>
        </TextInput>

        <TextInput placeholder="Email*" value={email} setValue={setEmail}>
          <div
            className={
              "text-start text-xs text-error sm:text-sm md:text-base" +
              " " +
              (email === null ? "hidden" : "block")
            }
          >
            {!validEmail.test(email ?? "") && "not a valid email address"}
          </div>
        </TextInput>

        <PasswordInput
          placeholder="Password*"
          value={password}
          setValue={setPassword}
        >
          <div
            className={
              "text-start text-xs text-error sm:text-sm md:text-base" +
              " " +
              (password === null || password === "" ? "hidden" : "block")
            }
          >
            {!validPasswordLength.test(password ?? "") && (
              <span>
                must be atleast 6 characters
                <br />
              </span>
            )}
            {!validPasswordChars.test(password ?? "") && (
              <span>
                cannot contain a black space
                <br />
              </span>
            )}
          </div>
        </PasswordInput>

        <PasswordInput
          placeholder="Confirm Password*"
          value={confirmPassword}
          setValue={setConfirmPassword}
        >
          <div
            className={
              "text-start text-xs text-error sm:text-sm md:text-base" +
              " " +
              (confirmPassword === null ? "hidden" : "block")
            }
          >
            {password !== confirmPassword && (
              <span>
                passwords must match
                <br />
              </span>
            )}
          </div>
        </PasswordInput>
      </div>

      <div className="flex flex-col items-center justify-center gap-2">
        <div
          className={
            "text-center text-sm text-error sm:text-base md:text-lg" +
            " " +
            (debugText === null || debugText === "" ? "hidden" : "block")
          }
        >
          {debugText}
        </div>
        <SolidButton
          onClick={handleRegister}
          className={debugText !== null ? "animated-shake" : ""}
        >
          <span className="mx-2">Submit</span>
        </SolidButton>
        <div className="w-full text-center font-nueu text-sm font-bold text-text/50 sm:text-base md:text-lg">
          Click here to{" "}
          <span
            className="cursor-pointer text-accent/80 hover:text-accent"
            onClick={() => setLoginToggle(true)}
          >
            Login
          </span>
        </div>
      </div>
      <div className=" flex flex-col items-center justify-center gap-2">
        <div className="w-full text-center font-nueu text-base font-bold text-text sm:text-lg md:text-xl">
          Other Login Options:
        </div>
        <GoogleOauth />
      </div>
    </>
  );
}

export default LoginRegister;
