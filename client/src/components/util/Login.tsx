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
      <div
        className={
          " absolute left-[30%] top-[100%] z-50 w-[40%] flex-col items-center justify-end gap-6" +
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

  const [, setCookie] = useCookies(["token"]);

  async function handleLogin() {
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
      <div className="w-[100%] px-10 py-5 text-center font-nueu text-6xl font-bold text-accent">
        Login
      </div>
      <TextInput
        placeholder="Username"
        value={username}
        setValue={setUsername}
      />
      <PasswordInput
        placeholder="Password"
        value={password}
        setValue={setPassword}
      />
      <div className="flex flex-col gap-2">
        <SolidButton onClick={handleLogin}>Submit</SolidButton>
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
  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [confirmPassword, setConfirmPassword] = useState<string | null>(null);

  const [, setCookie] = useCookies(["token"]);

  async function handleRegister() {
    if (password != confirmPassword) return;// todo: edge case

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
      <div className="w-[100%] px-10 py-5 text-center font-nueu text-6xl font-bold text-accent">
        Register
      </div>
      <TextInput
        placeholder="Username"
        value={username}
        setValue={setUsername}
      />
      <TextInput placeholder="Email" value={email} setValue={setEmail} />
      <PasswordInput
        placeholder="Password"
        value={password}
        setValue={setPassword}
      />
      <PasswordInput
        placeholder="Confirm Password"
        value={confirmPassword}
        setValue={setConfirmPassword}
      />
      <div className="flex flex-col gap-2">
        <SolidButton onClick={handleRegister}>Submit</SolidButton>
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
