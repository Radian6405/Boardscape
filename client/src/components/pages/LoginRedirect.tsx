import { ReactNode, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { SimpleBackdrop } from "../util/reusables/Backdrop";
import { IconCheck, IconLoader2 } from "@tabler/icons-react";
import { IconExclamationMark, IconX } from "@tabler/icons-react";
import { PasswordInput } from "../util/reusables/Input";
import { SolidButton } from "../util/reusables/Buttons";

function LoginRedirect() {
  const [searchParams] = useSearchParams();
  const [, setCookie] = useCookies(["token", "googleRefreshToken"]);

  //null status is for loading screen
  const [status, setStatus] = useState<string | null>(null);

  const [newEmail, setNewEmail] = useState<string | null>(null);
  const [newUser, setNewUser] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [confirmPassword, setConfirmPassword] = useState<string | null>(null);

  const navigate = useNavigate();

  async function getUserToken() {
    const code = searchParams.get("code");
    if (code == null) {
      setStatus("failed");
      return;
    }

    const response = await fetch(
      `http://localhost:8000/google-oauth/login?code=${code}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      setStatus("failed");
      throw new Error("failed to fetch");
    }
    const data = await response.json();

    if (response.status === 206) {
      setStatus("unfinished");
      setNewUser(data.username);
      setNewEmail(data.email);
      return;
    }

    if (response.status === 200) {
      setStatus("success");
      setCookie(
        "token",
        {
          access_token: data.access_token,
          type: "google",
        },
        {
          path: "/",
          maxAge: Math.floor(
            (parseInt(data.expiry_date) - new Date().getTime()) / 1000
          ),
        }
      );

      setCookie("googleRefreshToken", data.refresh_token, {
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
      });
      setTimeout(() => {
        navigate("/");
      }, 5000);
    }
  }

  async function handleRegister() {
    if (password != confirmPassword) return; // todo: edge case

    const response = await fetch("http://localhost:8000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: newUser,
        password: password,
        email: newEmail,
      }),
    });

    if (!response.ok) {
      setStatus("failed");
      throw new Error("failed to fetch");
    }

    const token = await response.json();
    setStatus("success");
    setCookie(
      "token",
      { token: token.token, type: "native" },
      { path: "/", maxAge: 60 * 60 * 24 }
    );

    setTimeout(() => {
      navigate("/");
    }, 5000);
  }

  useEffect(() => {
    getUserToken();
  }, []);
  return (
    <>
      <SimpleBackdrop>
        <div className="mt-16 flex w-[100vw] flex-wrap items-center justify-center ">
          {status === null && <MessageBoxLoading />}
          {status === "success" && <MessageBoxSuccess />}
          {status === "failed" && <MessageBoxFailure />}
          {status === "unfinished" && (
            <MessageBoxUnfinished>
              <div className="mt-10 text-center font-nueu text-3xl text-text">
                Hello <span className="text-accent">{newUser ?? ""}</span>
                ,<br />
                set a password here to continue:
              </div>
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
            </MessageBoxUnfinished>
          )}
        </div>
      </SimpleBackdrop>
    </>
  );
}

function MessageBoxSuccess() {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-12 rounded-3xl border-4 border-dashed border-accent bg-background/50 p-20">
        <div className="rounded-full border-8 border-success p-2">
          <IconCheck stroke={2} className="size-36 text-success " />
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="font-nueu text-7xl font-bold text-success">
            Welcome back
          </div>
          <div className="text-center font-nueu text-2xl text-text">
            You have been successfully logged in <br />
            redirecting shortly...
          </div>
          <Link to={"/"}>
            <SolidButton>Go Home</SolidButton>
          </Link>
        </div>
      </div>
    </>
  );
}
function MessageBoxFailure() {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-12 rounded-3xl border-4 border-dashed border-accent bg-background/50 p-20">
        <div className="rounded-full border-8 border-error p-2">
          <IconX stroke={2} className="size-36 text-error " />
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="font-nueu text-7xl font-bold text-error">
            Login Failed
          </div>
          <div className="text-center font-nueu text-2xl text-text">
            Your login request has failed
            <br />
            Please try again
          </div>
          <Link to={"/"}>
            <SolidButton>Go Home</SolidButton>
          </Link>
        </div>
      </div>
    </>
  );
}
function MessageBoxUnfinished({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-12 rounded-3xl border-4 border-dashed border-accent bg-background/50 p-20">
        <div className="rounded-full border-8 border-warning p-2">
          <IconExclamationMark stroke={2} className="size-36 text-warning " />
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="font-nueu text-7xl font-bold text-warning">
            Action required
          </div>
          <div className="text-center font-nueu text-2xl text-text">
            Few more steps remain before loggin you in
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
function MessageBoxLoading() {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-12 rounded-3xl border-4 border-dashed border-accent bg-background/50 p-20">
        <div className="animate-spin rounded-full p-2">
          <IconLoader2 stroke={2} className="size-36 text-text/50 " />
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="font-nueu text-7xl font-bold text-text/50">
            Please wait
          </div>
          <div className="text-center font-nueu text-2xl text-text">
            Processing your request
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginRedirect;
