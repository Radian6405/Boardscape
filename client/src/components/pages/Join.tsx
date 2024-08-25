import { useEffect, useState } from "react";
import { SimpleBackdrop } from "../util/reusables/Backdrop";
import { SolidButton } from "../util/reusables/Buttons";
import {
  IconPalette,
  IconRotate,
  IconRotateClockwise,
} from "@tabler/icons-react";
import { BorderBox } from "../util/reusables/Cards";
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
        <div className="flex w-[100vw] flex-col items-center justify-center gap-20 pt-20">
          <BorderBox>
            <div className="flex flex-col gap-6">
              <div className="w-full px-20 text-start font-nueu text-5xl font-bold text-accent">
                Enter a Room Code:
              </div>
              <div className="flex flex-row justify-center gap-5">
                <input
                  className="h-18 w-64 rounded-xl border-2 border-accent bg-background/40 px-4 text-2xl 
                  text-text focus:outline-none active:outline-none"
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
                  Join
                </SolidButton>
              </div>
              <div
                className={
                  "text-md text-center text-error" +
                  " " +
                  (debugText === null || debugText === "" ? "hidden" : "block")
                }
              >
                {debugText}
              </div>
            </div>
          </BorderBox>
          <BorderBox>
            <div className="mx-20 flex flex-col">
              <div className="flex flex-row">
                <div
                  className={
                    "cursor-pointer select-none border-accent px-20 py-5 font-nueu text-4xl font-bold text-accent" +
                    " " +
                    (!isAuth
                      ? "rounded-t-xl border-2 border-b-0 bg-background/40 underline  underline-offset-4"
                      : " border-b-2 ")
                  }
                  onClick={() => setIsAuth(false)}
                >
                  Join as Guest
                </div>
                <div
                  className={
                    "cursor-pointer select-none border-accent px-20 py-5 font-nueu text-4xl font-bold text-accent" +
                    " " +
                    (isAuth
                      ? "rounded-t-xl border-2 border-b-0 bg-background/40 underline underline-offset-4"
                      : "border-b-2")
                  }
                  onClick={() => setIsAuth(true)}
                >
                  {/* placeholder: change "User" to user's username */}
                  Join as User
                </div>
              </div>
              <div className="flex h-96 flex-row  items-center justify-center gap-10 rounded-b-xl border-2 border-t-0 border-accent bg-background/40">
                {isAuth ? <UserOptions /> : <GuestOptions />}
              </div>
            </div>
          </BorderBox>
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
            className="absolute -right-5 bottom-10 flex size-16 cursor-pointer items-center 
                      justify-center rounded-full bg-primary text-text"
            onClick={() => setAvatarRot((avatarRot + 90) % 360)}
          >
            <IconRotateClockwise stroke={2} className="size-8 rotate-90" />
          </div>
          <div
            className="absolute -bottom-5 right-10  flex size-16 cursor-pointer items-center 
                      justify-center rounded-full bg-primary text-text"
          >
            <IconPalette stroke={2} className="size-8" />
          </div>
        </Avatar>
        <div className="text-lg text-text/50">type an avatar</div>
      </div>
      <div className="flex flex-col justify-center gap-10">
        <div className="flex flex-row gap-2">
          <input
            type="text"
            className="h-14 w-72 border-b-2 border-accent bg-transparent p-2 text-xl text-text
            focus:outline-0 "
            placeholder="Enter a username"
          />
          <div className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-xl bg-primary text-text  ">
            <IconRotate stroke={2} className="size-6" />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="px-2 text-xl text-text"> Language:</div>
          <select className="h-12 rounded-xl bg-primary px-4 text-xl text-text focus:outline-0">
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
            className="absolute -right-5 bottom-10 flex size-16 cursor-pointer items-center 
                      justify-center rounded-full bg-primary text-text"
            onClick={() => setAvatarRot((avatarRot + 90) % 360)}
          >
            <IconRotateClockwise stroke={2} className="size-8 rotate-90" />
          </div>
          <div
            className="absolute -bottom-5 right-10  flex size-16 cursor-pointer items-center 
                      justify-center rounded-full bg-primary text-text"
          >
            <IconPalette stroke={2} className="size-8" />
          </div>
        </Avatar>
        <div className="text-lg text-text/50">type an avatar</div>
      </div>

      <div className="flex flex-col justify-center gap-10">
        <div className="size-64 bg-white">login</div>
      </div>
    </>
  );
}

export default JoinRoom;
