import { useEffect, useState } from "react";
import { SimpleBackdrop } from "../util/reusables/Backdrop";
import { SolidButton } from "../util/reusables/Buttons";
import {
  IconPalette,
  IconRotate,
  IconRotateClockwise,
} from "@tabler/icons-react";
import { ContainerBox } from "../util/reusables/Cards";
import Avatar from "../util/reusables/Avatar";
import { useNavigate, useSearchParams } from "react-router-dom";

function JoinRoom() {
  const [isAuth, setIsAuth] = useState(false);
  const [code, setCode] = useState<string>("");
  const [debugText, setDebugText] = useState<string | null>(null);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  function callDebug(text: string) {
    setDebugText(text);
    setTimeout(() => {
      setDebugText(null);
    }, 2000);
    return;
  }

  useEffect(() => {
    let code = searchParams.get("code")?.replace(/[^a-zA-Z]/g, "");
    if (code !== undefined) setCode(code.toUpperCase());
  }, []);

  return (
    <>
      <SimpleBackdrop>
        <div
          className="my-10 flex flex-col items-center justify-around gap-10 
          sm:my-14 sm:gap-14 md:my-16 md:gap-16"
        >
          <ContainerBox>
            <div className="flex flex-col gap-2 sm:gap-4 md:gap-6 lg:gap-8">
              <div
                className="w-full text-center font-nueu text-2xl font-extrabold text-accent 
                sm:text-3xl md:text-4xl lg:text-5xl"
              >
                Enter a Room Code:
              </div>
              <div className="flex flex-row items-center justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-8">
                <input
                  className="h-10 w-48 rounded-xl border-2 border-accent bg-background/40 px-4
                  text-lg text-text focus:outline-none active:outline-none sm:h-12 sm:w-64
                  sm:text-xl md:h-16 md:text-2xl lg:h-[4.5rem]"
                  placeholder="Enter 6 digit Code"
                  maxLength={6}
                  type="text"
                  value={code}
                  onChange={(event) => {
                    let code = event.target.value.replace(/[^a-zA-Z]/g, "");
                    setCode(code.toUpperCase());
                  }}
                />
                <SolidButton
                  onClick={() => {
                    if (code.length === 6) navigate("/room?code=" + code);
                    else callDebug("Not a valid room code");
                  }}
                  className={debugText !== null ? "animated-shake" : ""}
                >
                  <span className="mx-4">Join</span>
                </SolidButton>
              </div>
              <div
                className={
                  "text-center text-sm text-error sm:text-base md:text-lg" +
                  " " +
                  (debugText === null || debugText === "" ? "hidden" : "block")
                }
              >
                {debugText}
              </div>
            </div>
          </ContainerBox>
          <ContainerBox>
            <div className="flex flex-col">
              <div className="flex flex-row justify-between ">
                <div
                  className={
                    "text-md cursor-pointer select-none border-accent px-7 py-1 text-center font-nueu font-bold leading-5 text-accent" +
                    " " +
                    "sm:whitespace-nowrap sm:px-6 sm:py-2 sm:text-2xl md:px-8 md:py-4 md:text-3xl lg:px-20 lg:py-5 lg:text-4xl" +
                    " " +
                    (!isAuth
                      ? "rounded-t-lg border-2 border-b-0 bg-background/40 underline underline-offset-4 md:rounded-t-xl"
                      : "border-b-2 ")
                  }
                  onClick={() => setIsAuth(false)}
                >
                  Join as Guest
                </div>
                <div
                  className={
                    "text-md cursor-pointer select-none border-accent px-7 py-1 text-center font-nueu font-bold leading-5 text-accent" +
                    " " +
                    "sm:whitespace-nowrap sm:px-6 sm:py-2 sm:text-2xl md:px-8 md:py-4 md:text-3xl lg:px-20 lg:py-5 lg:text-4xl" +
                    " " +
                    (isAuth
                      ? "rounded-t-lg border-2 border-b-0 bg-background/40 underline underline-offset-4 md:rounded-t-xl"
                      : "border-b-2")
                  }
                  onClick={() => setIsAuth(true)}
                >
                  {/* TODO: change "User" to user's username */}
                  Join as User
                </div>
              </div>
              <div
                className="flex flex-col items-center justify-center gap-5 rounded-b-lg border-2 border-t-0 border-accent bg-background/40 
                px-6 py-8 md:gap-10 md:rounded-b-xl lg:flex-row"
              >
                {isAuth ? <UserOptions /> : <GuestOptions />}
              </div>
            </div>
          </ContainerBox>
        </div>
      </SimpleBackdrop>
    </>
  );
}

export function GuestOptions() {
  const [avatarRot, setAvatarRot] = useState(0);
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-5">
        <Avatar text="" rot={avatarRot} disabled={false}>
          <div
            className="absolute -right-5 bottom-10 flex cursor-pointer items-center justify-center rounded-full 
                      bg-primary p-4 text-white sm:p-5"
            onClick={() => setAvatarRot((avatarRot + 90) % 360)}
          >
            <IconRotateClockwise
              stroke={2}
              className="size-6 rotate-90 md:size-8"
            />
          </div>
          <div
            className="absolute -bottom-5 right-10  flex cursor-pointer items-center justify-center rounded-full 
                      bg-primary p-4 text-white sm:p-5"
          >
            <IconPalette stroke={2} className="size-6 md:size-8" />
          </div>
        </Avatar>
        <div className="text-sm text-text/50 sm:text-base md:text-lg">
          type an avatar
        </div>
      </div>
      <div className="flex flex-col justify-center gap-4">
        <div className="flex flex-row gap-2">
          <input
            type="text"
            className="h-10 w-48 border-b-2 border-accent bg-transparent p-2 text-lg text-text focus:outline-0
            sm:h-12 sm:w-64 sm:text-xl md:h-14 md:w-72"
            placeholder="Enter a username"
          />
          <div
            className="flex cursor-pointer items-center justify-center rounded-lg bg-primary p-3 text-white
            md:rounded-xl md:p-4"
          >
            <IconRotate stroke={2} className="size-4 sm:size-6" />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="px-2 text-lg text-text sm:text-xl md:text-2xl">
            Language:
          </div>
          <select className="rounded-md bg-dark-accent p-2 text-base text-white focus:outline-0 sm:text-lg md:rounded-lg md:py-3 md:text-xl">
            <option value="english">English</option>
            <option value="apple">Apple</option>
            <option value="banana">Banana</option>
            <option value="orange">Orange</option>
          </select>
        </div>
      </div>
    </>
  );
}
export function UserOptions() {
  const [avatarRot, setAvatarRot] = useState(0);
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-5">
        {/* fill text and rot with user pref */}
        <Avatar text="lol" rot={avatarRot} disabled={false}>
          <div
            className="absolute -right-5 bottom-10 flex cursor-pointer items-center justify-center rounded-full 
                      bg-primary p-4 text-text sm:p-5"
            onClick={() => setAvatarRot((avatarRot + 90) % 360)}
          >
            <IconRotateClockwise
              stroke={2}
              className="size-6 rotate-90 md:size-8"
            />
          </div>
          <div
            className="absolute -bottom-5 right-10  flex cursor-pointer items-center justify-center rounded-full 
                      bg-primary p-4 text-text sm:p-5"
          >
            <IconPalette stroke={2} className="size-6 md:size-8" />
          </div>
        </Avatar>
        <div className="text-sm text-text/50 sm:text-base md:text-lg">
          type an avatar
        </div>
      </div>

      <div className="flex flex-col justify-center gap-10">
        {/* <div className="size-64 bg-white">login</div> */}
      </div>
    </>
  );
}

export default JoinRoom;
