import {
  IconMoonFilled,
  IconSunFilled,
  IconUserFilled,
} from "@tabler/icons-react";
import { DoubleOutlineButton } from "./Buttons";
import LoginRegister from "./Login";
import { useState } from "react";

function Navbar({
  theme,
  setTheme,
}: {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
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

        <DoubleOutlineButton onClick={() => setShowLoginPopup(true)}>
          Login / Register
        </DoubleOutlineButton>

        <div className="p-2">
          <div className="cursor-pointer select-none rounded-full border-2 border-dark-accent bg-secondary p-3">
            {/* placeholder: replace with user profile */}
            <IconUserFilled className="size-8 text-text" />
          </div>
        </div>

        <LoginRegister show={showLoginPopup} setShow={setShowLoginPopup}/>
      </div>
    </>
  );
}

export default Navbar;
