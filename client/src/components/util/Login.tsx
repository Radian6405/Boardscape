import { useState } from "react";
import { SolidButton } from "./Buttons";
import { PasswordInput, TextInput } from "./Input";
import { IconX } from "@tabler/icons-react";
import { useCookies } from "react-cookie";

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
          "absolute left-[30vw] top-[15vh] z-50 w-[40%] flex-col items-center justify-end gap-6" +
          " " +
          "rounded-xl border-4 border-secondary bg-background p-8" +
          " " +
          (show ? "flex" : "hidden")
        }
      >
        {loginToggle ? (
          <Login setLoginToggle={setLoginToggle} />
        ) : (
          <Register setLoginToggle={setLoginToggle} />
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
}: {
  setLoginToggle: React.Dispatch<React.SetStateAction<boolean>>;
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
    setCookie("token", token.token, { path: "/", maxAge: 60 * 60 * 24 });
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
      <SolidButton onClick={handleLogin}>Submit</SolidButton>
      <div className="w-[100%] text-center font-nueu text-lg font-bold text-text/50">
        Click here to{" "}
        <span
          className="cursor-pointer hover:text-accent"
          onClick={() => setLoginToggle(false)}
        >
          Register
        </span>
      </div>
    </>
  );
}

function Register({
  setLoginToggle,
}: {
  setLoginToggle: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [confirmPassword, setConfirmPassword] = useState<string | null>(null);

  const [, setCookie] = useCookies(["token"]);

  async function handleRegister() {
    if (password != confirmPassword) return;

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
    setCookie("token", token.token, { path: "/", maxAge: 60 * 60 * 24 });
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
      <SolidButton onClick={handleRegister}>Submit</SolidButton>
      <div className="w-[100%] text-center font-nueu text-lg font-bold text-text/50">
        Click here to{" "}
        <span
          className="cursor-pointer hover:text-accent"
          onClick={() => setLoginToggle(true)}
        >
          Login
        </span>
      </div>
    </>
  );
}

export default LoginRegister;
