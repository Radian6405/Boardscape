import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useSearchParams } from "react-router-dom";

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
    <div className="text-text">Logged In, redirecting in 5 seconds...</div>
  );
}

export default LoginRedirect;
