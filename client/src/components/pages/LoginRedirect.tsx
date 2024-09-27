import { ReactNode, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { SimpleBackdrop } from "../util/reusables/Backdrop";
import { IconCheck, IconLoader2 } from "@tabler/icons-react";
import { IconExclamationMark, IconX } from "@tabler/icons-react";
import { PasswordInput, TextInput } from "../util/reusables/Input";
import { SolidButton } from "../util/reusables/Buttons";

function LoginRedirect() {
  const validUsernameLength = /^.{6,16}$/;
  const validUsernameChars = /^[A-Za-z0-9_.]+$/;
  const validPasswordLength = /^.{6,256}$/;
  const validPasswordChars = /^[\S]+$/;

  const [searchParams] = useSearchParams();
  const [, setCookie] = useCookies(["token", "googleRefreshToken"]);

  //null status is for loading screen
  const [status, setStatus] = useState<string | null>(null);

  const [newEmail, setNewEmail] = useState<string | null>(null);
  const [newUser, setNewUser] = useState<string | null>(null);

  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [confirmPassword, setConfirmPassword] = useState<string | null>(null);
  const [debugText, setDebugText] = useState<string | null>(null);

  const navigate = useNavigate();

  function callDebug(text: string) {
    setDebugText(text);
    setTimeout(() => {
      setDebugText(null);
    }, 5000);
    return;
  }

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
    if (username === null) {
      callDebug("username is required");
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
        email: newEmail,
      }),
    });

    if (response.status === 401) {
      const data = await response.json();
      callDebug(data.message);
      return;
    }

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
        <div className="flex flex-wrap items-center justify-center p-5 md:p-10 lg:p-16 ">
          {status === null && <MessageBoxLoading />}
          {status === "success" && <MessageBoxSuccess />}
          {status === "failed" && <MessageBoxFailure />}
          {status === "unfinished" && (
            <MessageBoxUnfinished>
              <div className="text-center font-nueu text-xl text-text md:text-2xl lg:text-3xl">
                Hello <span className="text-accent">{newUser ?? ""}</span>
                ,<br />
                set a Username & Password to continue:
              </div>

              <TextInput
                placeholder="Username*"
                value={username}
                setValue={setUsername}
              >
                <div
                  className={
                    "text-center text-xs text-error sm:text-base md:text-lg" +
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

              <PasswordInput
                placeholder="Password*"
                value={password}
                setValue={setPassword}
              >
                <div
                  className={
                    "text-center text-xs text-error sm:text-base md:text-lg" +
                    " " +
                    (password === null ? "hidden" : "block")
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
                    "text-center text-xs text-error sm:text-base md:text-lg" +
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
              <div
                className={
                  "text-center text-base text-error" +
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
      <div className="flex flex-col items-center justify-center gap-6 rounded-3xl border-4 border-dashed border-accent bg-background/50 p-5 md:gap-10 md:p-10 lg:gap-14 lg:p-16">
        <div className="rounded-full border-4 border-success p-2 md:border-[6px] lg:border-8">
          <IconCheck
            stroke={2}
            className="size-16 text-success md:size-24 lg:size-32 "
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="text-center font-nueu text-5xl font-bold text-success md:text-6xl lg:text-7xl">
            Welcome back
          </div>
          <div className="text-center font-nueu text-lg text-text md:text-xl lg:text-2xl">
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
      <div className="flex flex-col items-center justify-center gap-6 rounded-3xl border-4 border-dashed border-accent bg-background/50 p-5 md:gap-10 md:p-10 lg:gap-14 lg:p-16">
        <div className="rounded-full border-4 border-error p-2 md:border-[6px] lg:border-8">
          <IconX
            stroke={2}
            className="size-16 text-error md:size-24 lg:size-32 "
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="text-center font-nueu text-5xl font-bold text-error md:text-6xl lg:text-7xl">
            Login Failed
          </div>
          <div className="text-center font-nueu text-lg text-text md:text-xl lg:text-2xl">
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
      <div className="flex flex-col items-center justify-center gap-6 rounded-3xl border-4 border-dashed border-accent bg-background/50 p-5 md:gap-10 md:p-10 lg:gap-14 lg:p-14">
        <div className="rounded-full border-4 border-warning p-2 md:border-[6px] lg:border-8">
          <IconExclamationMark
            stroke={2}
            className="size-16 text-warning sm:size-20 md:size-28 lg:size-32 "
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="text-center font-nueu text-5xl font-bold text-warning md:text-6xl lg:text-7xl">
            Action required
          </div>
          <div className="text-center font-nueu text-lg text-text md:text-xl lg:text-2xl">
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
      <div className="flex flex-col items-center justify-center gap-6 rounded-3xl border-4 border-dashed border-accent bg-background/50 p-5 md:gap-10 md:p-10 lg:gap-14 lg:p-16">
        <div className="animate-spin rounded-full p-2">
          <IconLoader2
            stroke={2}
            className="size-16 text-text/50 md:size-24 lg:size-32 "
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="text-center font-nueu text-5xl font-bold text-text/50 md:text-6xl lg:text-7xl">
            Please wait
          </div>
          <div className="text-center font-nueu text-lg text-text md:text-xl lg:text-2xl">
            Processing your request
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginRedirect;
