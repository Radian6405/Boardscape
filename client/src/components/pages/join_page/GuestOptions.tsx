import { IconRotateClockwise, IconPalette, IconRotate } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import Avatar, { ColorPicker } from "../../util/reusables/Avatar";
import { avatar } from "../../util/interfaces";

export function GuestOptions({
  username,
  setUsername,
  avatar,
  setAvatar,
}: {
  username: string | null;
  setUsername: React.Dispatch<React.SetStateAction<string | null>>;
  avatar: avatar;
  setAvatar: React.Dispatch<React.SetStateAction<avatar>>;
}) {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const [tempColor, setTempColor] = useState(avatar.color);

  useEffect(() => {
    setAvatar({ ...avatar, color: tempColor });
  }, [tempColor]);

  useEffect(() => {
    if (username !== null) localStorage.setItem("prevUsername", username);
    localStorage.setItem("prevAvatar", JSON.stringify(avatar));
  }, [username, avatar]);
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-5">
        <Avatar
          value={avatar.text}
          onChange={(event) => {
            setAvatar({
              ...avatar,
              text: event.target.value === "" ? null : event.target.value,
            });
          }}
          color={avatar.color}
          rot={avatar.rot}
          disabled={false}
        >
          <div
            className="absolute -right-5 bottom-10 flex cursor-pointer items-center justify-center rounded-full 
                        bg-primary p-4 text-white sm:p-5"
            onClick={() =>
              setAvatar({ ...avatar, rot: (avatar.rot + 90) % 360 })
            }
          >
            <IconRotateClockwise
              stroke={2}
              className="size-6 rotate-90 md:size-8"
            />
          </div>
          <div
            className="absolute -bottom-5 right-10  flex cursor-pointer items-center justify-center rounded-full 
                        bg-primary p-4 text-white sm:p-5"
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
            value={username ?? ""}
            onChange={(event) =>
              setUsername(event.target.value === "" ? null : event.target.value)
            }
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

export default GuestOptions;
