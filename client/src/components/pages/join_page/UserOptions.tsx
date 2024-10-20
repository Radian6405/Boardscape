import { IconRotateClockwise, IconPalette } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import Avatar, { ColorPicker } from "../../util/reusables/Avatar";
import { avatar, userData } from "../../util/interfaces";

function UserOptions({
  avatar,
  setAvatar,
  setIsChanged,
  userData,
}: {
  avatar: avatar | null;
  setAvatar: React.Dispatch<React.SetStateAction<avatar | null>>;
  setIsChanged: React.Dispatch<React.SetStateAction<boolean>>;
  userData: userData | null;
}) {
  const [cookie] = useCookies(["token", "googleRefreshToken"]);
  const [isAuth, setIsAuth] = useState(cookie.token !== undefined);

  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [tempColor, setTempColor] = useState(avatar?.color ?? "#FF16DC");

  useEffect(() => {
    if (avatar !== null) setAvatar({ ...avatar, color: tempColor });
  }, [tempColor]);

  useEffect(() => {
    if (cookie.token !== undefined) {
      if (userData !== null) {
        setAvatar({
          text: userData.avatar_text,
          color: userData.avatar_color,
          rot: userData.avatar_rotation,
        });
        setTempColor(userData.avatar_color);
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    }
  }, [userData]);

  useEffect(() => {
    if (avatar === null || userData === null) return;

    setIsChanged(
      avatar.text !== userData.avatar_text ||
        avatar.color !== userData.avatar_color ||
        avatar.rot !== userData.avatar_rotation
    );
  }, [avatar]);

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-5">
        {/* fill text and rot with user pref */}
        {isAuth && avatar !== null ? (
          <>
            <div className="flex flex-col items-center justify-center gap-5">
              <Avatar
                value={avatar?.text ?? ""}
                onChange={(event) => {
                  setAvatar({
                    ...avatar,
                    text: event.target.value,
                  });
                }}
                rot={avatar?.rot ?? 0}
                disabled={false}
                // avatarColor is null until data comes from backend
                color={avatar?.color ?? "#FF16DC"}
              >
                <div
                  className="absolute -right-5 bottom-10 flex cursor-pointer items-center justify-center rounded-full 
                  bg-primary p-4 text-text sm:p-5"
                  onClick={() => {
                    setAvatar({ ...avatar, rot: (avatar.rot + 90) % 360 });
                  }}
                >
                  <IconRotateClockwise
                    stroke={2}
                    className="size-6 rotate-90 md:size-8"
                  />
                </div>
                <div
                  className="absolute -bottom-5 right-10  flex cursor-pointer items-center justify-center rounded-full 
                  bg-primary p-4 text-text sm:p-5"
                  onClick={() => {
                    setDisplayColorPicker(true);
                  }}
                  onMouseLeave={() => {
                    setDisplayColorPicker(false);
                  }}
                >
                  <IconPalette stroke={2} className="size-6 md:size-8" />
                  <ColorPicker
                    avatarColor={tempColor}
                    setAvatarColor={setTempColor}
                    className={
                      "absolute top-10 md:bottom-10 md:left-10 md:top-auto" +
                      " " +
                      (displayColorPicker ? "block" : "hidden")
                    }
                  />
                </div>
              </Avatar>

              {/* TODO before merge: update the changed avatar text and rot */}
              {/* <SolidButton>Update</SolidButton> */}
            </div>
            <div className="text-sm text-text/50 sm:text-base md:text-lg">
              type an avatar
            </div>
          </>
        ) : (
          // TODO before merge: add login Popup
          <div className="size-64 bg-white">click here to login</div>
        )}
      </div>
    </>
  );
}

export default UserOptions;
