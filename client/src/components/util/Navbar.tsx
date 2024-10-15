import {
  IconMoonFilled,
  IconSunFilled,
  IconUserFilled,
} from "@tabler/icons-react";
import { DoubleOutlineButton } from "./reusables/Buttons";
import LoginRegister from "./Login";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { userData } from "./interfaces";

function Navbar({
  theme,
  setTheme,
}: {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [userData, setUserData] = useState<userData | null>(null);

  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [cookie, setCookie] = useCookies(["token", "googleRefreshToken"]);

  async function setUser() {
    const data: userData = await getUser(cookie, setCookie);
    if (data !== null) setUserData(data);
  }

  useEffect(() => {
    setUser();
  }, [, cookie]);

  return (
    <>
      <div
        className="sticky top-0 z-50 flex items-center justify-end gap-4 px-5 py-4 
        sm:px-10 md:px-16 md:py-6 lg:px-20"
      >
        <div
          className="flex items-center justify-center rounded-full p-2 hover:cursor-pointer hover:bg-primary"
          onClick={() => {
            if (theme == "dark") setTheme("light");
            else setTheme("dark");
          }}
        >
          {theme === "light" ? (
            <IconSunFilled className="size-6 text-text sm:size-8 lg:size-10" />
          ) : (
            <IconMoonFilled className="size-6 text-text sm:size-8 lg:size-10" />
          )}
        </div>

        {userData === null ? (
          <DoubleOutlineButton onClick={() => setShowLoginPopup(true)}>
            Login
          </DoubleOutlineButton>
        ) : (
          <div className="p-2">
            <div className="cursor-pointer select-none rounded-full border-2 border-dark-accent bg-secondary p-3">
              {/* placeholder: replace with user profile */}
              <IconUserFilled className="size-8 text-text" />
            </div>
          </div>
        )}
      </div>
      <LoginRegister show={showLoginPopup} setShow={setShowLoginPopup} />
    </>
  );
}

export async function getUser(
  cookie: { token?: any; googleRefreshToken?: any },
  setCookie: (
    name: "token" | "googleRefreshToken",
    value: any,
    options?: any
  ) => void
) {
  if (cookie.token == undefined) {
    //generating access token from google refresh tokens
    if (cookie.googleRefreshToken) {
      const response = await fetch(
        `http://localhost:8000/google-oauth/access-token?refresh_token=${cookie.googleRefreshToken}`,
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
          maxAge: data.expires_in,
        }
      );
    } else return null;
  }

  // for normal users
  if (cookie.token.type == "native") {
    const response = await fetch("http://localhost:8000/status", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: cookie.token.token,
      },
    });

    if (response.status === 401) {
      return null;
    }
    if (!response.ok) {
      throw new Error("failed to fetch");
    }
    const user = await response.json();
    return user;
  }

  // for google authorised users
  if (cookie.token.type == "google") {
    const response = await fetch(
      `http://localhost:8000/google-oauth/status?access_token=${cookie.token.access_token}`,
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
    const user = await response.json();
    return user;
  }
}

export default Navbar;
