import {
  IconMoonFilled,
  IconSunFilled,
  IconUserFilled,
} from "@tabler/icons-react";
import { DoubleOutlineButton } from "./reusables/Buttons";
import LoginRegister from "./Login";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

interface userData {
  user_id: number;
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
  const [cookie] = useCookies(["token"]);

  async function getUser() {
    const response = await fetch("http://localhost:8000/status", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: cookie.token,
      },
    });

    if (response.status === 401) {
      return;
    }
    if (!response.ok) {
      throw new Error("failed to fetch");
    }
    const user = await response.json();
    setUserData(user);
  }

  useEffect(() => {
    getUser();
  }, [, userData]);

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

        <LoginRegister show={showLoginPopup} setShow={setShowLoginPopup} />
      </div>
    </>
  );
}

export default Navbar;
