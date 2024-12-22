import { useEffect, useState } from "react";
import { SimpleBackdrop } from "../../util/reusables/Backdrop";
import { SolidButton } from "../../util/reusables/Buttons";
import { ContainerBox } from "../../util/reusables/Cards";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { getUser } from "../../util/Navbar";
import { generateRandomAvatar } from "../../util/misc";
import { avatar, userData } from "../../util/interfaces";
import GuestOptions from "./GuestOptions";
import UserOptions from "./UserOptions";

function JoinRoom() {
  const [cookie, setCookie] = useCookies(["token", "googleRefreshToken"]);

  const [joinToggle, setJoinToggle] = useState(cookie.token !== undefined);
  const [code, setCode] = useState<string>("");
  const [debugText, setDebugText] = useState<string | null>(null);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // for guest options only
  const [username, setUsername] = useState<string | null>(
    localStorage.getItem("prevUsername")
  );
  const prevAvatar = JSON.parse(localStorage.getItem("prevAvatar") ?? "{}");
  const [guestAvatar, setGuestAvatar] = useState<avatar>(
    Object.keys(prevAvatar).length === 0 ? generateRandomAvatar() : prevAvatar
  );

  // for user options only
  const [userData, setUserData] = useState<userData | null>(null);
  const [UserAvatar, setUserAvatar] = useState<avatar | null>(null);
  const [isChanged, setIsChanged] = useState<boolean>(false);

  function callDebug(text: string) {
    setDebugText(text);
    setTimeout(() => {
      setDebugText(null);
    }, 2000);
    return;
  }
  async function joinUser() {
    if (code.length !== 6) {
      callDebug("Not a valid room code");
      return;
    }
    if (!joinToggle) {
      if (username === null) {
        callDebug("Enter a username");
        return;
      }
      if (guestAvatar.text === null) {
        callDebug("Enter an avatar");
        return;
      }
    }

    if (joinToggle && cookie.token === undefined) {
      callDebug("Please login or join as Guest");
      return;
    }

    if (isChanged && UserAvatar !== null && userData !== null) {
      const response = await fetch("http://localhost:8000/update/avatar", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          new_avatar: UserAvatar,
          user_id: userData.user_id,
          email: userData.email,
        }),
      });

      if (!response.ok) {
        throw new Error("failed to update user avatar");
      }
    }

    navigate("/room?code=" + code + "&guest=" + !joinToggle);
  }

  async function getUserData() {
    const data = await getUser(cookie, setCookie);
    setUserData(data);
  }

  useEffect(() => {
    getUserData();

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
                  onClick={joinUser}
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
                    (!joinToggle
                      ? "rounded-t-lg border-2 border-b-0 bg-background/40 underline underline-offset-4 md:rounded-t-xl"
                      : "border-b-2 ")
                  }
                  onClick={() => setJoinToggle(false)}
                >
                  Join as Guest
                </div>
                <div
                  className={
                    "text-md cursor-pointer select-none border-accent px-7 py-1 text-center font-nueu font-bold leading-5 text-accent" +
                    " " +
                    "sm:whitespace-nowrap sm:px-6 sm:py-2 sm:text-2xl md:px-8 md:py-4 md:text-3xl lg:px-20 lg:py-5 lg:text-4xl" +
                    " " +
                    (joinToggle
                      ? "rounded-t-lg border-2 border-b-0 bg-background/40 underline underline-offset-4 md:rounded-t-xl"
                      : "border-b-2")
                  }
                  onClick={() => setJoinToggle(true)}
                >
                  Join as User
                </div>
              </div>
              <div
                className="flex flex-col items-center justify-center rounded-b-lg border-2 border-t-0 border-accent bg-background/40 
                px-6 py-8 md:gap-10 md:rounded-b-xl lg:flex-row"
              >
                <div
                  className={
                    "flex flex-col items-center justify-center gap-5 lg:flex-row" +
                    " " +
                    (joinToggle ? "block" : "hidden")
                  }
                >
                  <UserOptions
                    avatar={UserAvatar}
                    setAvatar={setUserAvatar}
                    setIsChanged={setIsChanged}
                    userData={userData}
                  />
                </div>
                <div
                  className={
                    "flex flex-col items-center justify-center gap-5 lg:flex-row" +
                    " " +
                    (!joinToggle ? "block" : "hidden")
                  }
                >
                  <GuestOptions
                    username={username}
                    setUsername={setUsername}
                    avatar={guestAvatar}
                    setAvatar={setGuestAvatar}
                  />
                </div>
              </div>
            </div>
          </ContainerBox>
        </div>
      </SimpleBackdrop>
    </>
  );
}

export default JoinRoom;
