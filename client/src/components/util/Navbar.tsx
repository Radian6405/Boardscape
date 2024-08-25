import {
  IconMoonFilled,
  IconSunFilled,
  IconUserFilled,
} from "@tabler/icons-react";
import { DoubleOutlineButton } from "./reusables/Buttons";
import LoginRegister from "./Login";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export interface userData {
  user_id: number | null;
  username: string;
}

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
    const data = await getUser(cookie, setCookie);
    if (data !== null) setUserData(data);
  }

  useEffect(() => {
    setUser();
  }, [, cookie]);

  return (
    <>
      <div className="sticky top-0 z-50 flex items-center justify-end gap-4 px-10 py-5">
        <div
          className="flex size-14 items-center justify-center rounded-full hover:cursor-pointer"
          onClick={() => {
            if (theme == "dark") setTheme("light");
            else setTheme("dark");
          }}
        >
          {theme === "light" ? (
            <IconSunFilled className="size-8 text-text" />
          ) : (
            <IconMoonFilled className="size-8 text-text" />
          )}
        </div>

        {userData === null ? (
          <DoubleOutlineButton onClick={() => setShowLoginPopup(true)}>
            Login / Register
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
