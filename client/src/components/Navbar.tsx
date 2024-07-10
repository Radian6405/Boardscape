import {
  IconMoonFilled,
  IconSunFilled,
  IconUserFilled,
} from "@tabler/icons-react";
import { DoubleOutlineButton } from "./util/Buttons";

function Navbar({
  theme,
  setTheme,
}: {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <>
      <div className=" sticky top-0 z-50 flex justify-end items-center py-5 px-10 gap-4">
        <div
          className="size-14 rounded-full flex justify-center items-center hover:cursor-pointer"
          onClick={() => {
            if (theme == "dark") setTheme("light");
            else setTheme("dark");
          }}
        >
          {theme === "light" ? (
            <IconSunFilled className="text-text size-8" />
          ) : (
            <IconMoonFilled className="text-text size-8" />
          )}
        </div>

        <DoubleOutlineButton>Login / Sign Up</DoubleOutlineButton>

        <div className="p-2">
          <div className="p-3 bg-secondary border-2 border-dark-accent rounded-full cursor-pointer select-none">
            {/* placeholder: replace with user profile */}
            <IconUserFilled className="text-text size-8" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
