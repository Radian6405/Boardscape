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
      <div className="absolute flex w-[100%] justify-center">
        <div
          className={
            "relative z-50 w-[40%] flex-col items-center justify-end" +
            " " +
            "rounded-xl border-4 border-secondary bg-background p-8" +
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
            className="absolute right-5 top-5 cursor-pointer"
            onClick={() => setShow(false)}
          >
            <IconX className="size-10 text-text/80" stroke={2} />
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
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [debugText, setDebugText] = useState<string | null>(null);

  const [, setCookie] = useCookies(["token"]);

  function callDebug(text: string) {
    setDebugText(text);
    setTimeout(() => {
      setDebugText(null);
    }, 5000);
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

    if (!response.ok) {
      throw new Error("failed to fetch");
    }

    const token = await response.json();
    setCookie(
      "token",
      { token: token.token, type: "native" },
      { path: "/", maxAge: 60 * 60 * 24 }
    );

    setShow(false);
  }
  return (
    <>
      <div className="w-[100%] px-10 py-12 text-center font-nueu text-6xl font-bold text-accent">
        Login
      </div>

      <div className="flex flex-col gap-4">
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

      <div className="flex flex-col gap-2 py-6">
        <div
          className={
            "text-md text-center text-error" +
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
          Submit
        </SolidButton>
        <div className="w-[100%] text-center font-nueu text-lg font-bold text-text/50">
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
        <div className="w-[100%] text-center font-nueu text-lg font-bold text-text">
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
      callDebug("email is required");
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
      validUsernameLength.test(username) &&
      validUsernameChars.test(username) &&
      validEmail.test(email) &&
      validPasswordLength.test(password) &&
      validPasswordChars.test(password) &&
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

    if (!response.ok) {
      throw new Error("failed to fetch");
    }

    const token = await response.json();
    setCookie(
      "token",
      { token: token.token, type: "native" },
      { path: "/", maxAge: 60 * 60 * 24 }
    );

    setShow(false);
  }

  return (
    <>
      <div className="w-[100%] px-10 py-12 text-center font-nueu text-6xl font-bold text-accent">
        Register
      </div>

      <div className="flex flex-col gap-4">
        <TextInput
          placeholder="Username*"
          value={username}
          setValue={setUsername}
        >
          <div
            className={
              "text-start text-sm text-error" +
              " " +
              (username === null ? "hidden" : "block")
            }
          >
            {!validUsernameLength.test(username ?? "") && (
              <span>
                must be between 6 to 16 characters long <br />
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
              "text-start text-sm text-error" +
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
              "text-start text-sm text-error" +
              " " +
              (password === null || password === "" ? "hidden" : "block")
            }
          >
            {!validPasswordLength.test(password ?? "") && (
              <span>
                must be atleast 6 characters long
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
              "text-start text-sm text-error" +
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

      <div className="flex flex-col gap-2 py-6">
        <div
          className={
            "text-md text-center text-error" +
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
          Submit
        </SolidButton>
        <div className="w-[100%] text-center font-nueu text-lg font-bold text-text/50">
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
        <div className="w-[100%] text-center font-nueu text-lg font-bold text-text">
          Other Login Options:
        </div>
        <GoogleOauth />
      </div>
    </>
  );
}

export default LoginRegister;
