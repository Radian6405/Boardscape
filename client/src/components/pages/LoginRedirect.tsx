import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SimpleBackdrop } from "../util/reusables/Backdrop";
import { IconCheck } from "@tabler/icons-react";
// import { IconExclamationMark, IconX } from "@tabler/icons-react";

function LoginRedirect() {
  const [ignore, setIgnore] = useState(false);
  const [searchParams] = useSearchParams();
  const [, setCookie] = useCookies(["token", "googleRefreshToken"]);

  const navigate = useNavigate();

  async function getUserToken() {
    const code = searchParams.get("code");

    if (code == null) return;

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
      throw new Error("failed to fetch");
    }
    const data = await response.json();

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

  useEffect(() => {
    if (!ignore) getUserToken();
    setIgnore(true);
  }, []);
  return (
    <>
      <SimpleBackdrop>
        <div className="flex h-[80vh] w-[100vw] flex-wrap items-center justify-center ">
          <div className="flex flex-col items-center justify-center gap-12 rounded-3xl border-4 border-dashed border-accent bg-background/50 p-20">
            <div className="border-success rounded-full border-8 p-2">
              <IconCheck stroke={2} className="text-success size-36 " />
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="text-success font-nueu text-7xl font-bold">
                Login Sucessfull
              </div>
              <div className="text-center font-nueu text-2xl text-text">
                You have been sucessfully logged in <br />
                redirecting shortly...
              </div>
            </div>
          </div>
          {/* <div className="flex flex-col items-center justify-center gap-12 rounded-3xl border-4 border-dashed border-accent bg-background/50 p-20">
            <div className="border-error rounded-full border-8 p-2">
              <IconX stroke={2} className="text-error size-36 " />
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="text-error font-nueu text-7xl font-bold">
                Login Failed
              </div>
              <div className="text-center font-nueu text-2xl text-text">
                Your login request failed
                <br />
                Please try again
              </div>
            </div>
          </div> */}
          {/* <div className="flex flex-col items-center justify-center gap-12 rounded-3xl border-4 border-dashed border-accent bg-background/50 p-20">
            <div className="border-warning rounded-full border-8 p-2">
              <IconExclamationMark
                stroke={2}
                className="text-warning size-36 "
              />
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="text-warning font-nueu text-7xl font-bold">
                Login Unsuccessfull
              </div>
              <div className="text-center font-nueu text-2xl text-text">
                There was an issue logging you in
                <br />
                Please try again
              </div>
            </div>
          </div> */}
        </div>
      </SimpleBackdrop>
    </>
  );
}

export default LoginRedirect;
