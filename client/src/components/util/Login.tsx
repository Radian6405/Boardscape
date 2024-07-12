import { useState } from "react";
import { SolidButton } from "./Buttons";
import { PasswordInput, TextInput } from "./Input";
import { IconX } from "@tabler/icons-react";

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
  return (
    <>
      <div className="w-[100%] px-10 py-5 text-center font-nueu text-6xl font-bold text-accent">
        Login
      </div>
      <TextInput placeholder="Username" />
      <PasswordInput placeholder="Password" />
      <SolidButton>Submit</SolidButton>
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
  return (
    <>
      <div className="w-[100%] px-10 py-5 text-center font-nueu text-6xl font-bold text-accent">
        Register
      </div>
      <TextInput placeholder="Username" />
      <TextInput placeholder="Email" />
      <PasswordInput placeholder="Password" />
      <PasswordInput placeholder="Confirm Password" />
      <SolidButton>Submit</SolidButton>
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
