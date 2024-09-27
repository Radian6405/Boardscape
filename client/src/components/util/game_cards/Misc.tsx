import {
  IconCheckbox,
  IconCircle,
  IconCopy,
  IconSend2,
  IconX,
} from "@tabler/icons-react";
import { useState } from "react";
import { Socket } from "socket.io-client";
import { AvatarMedium, AvatarSmall } from "../reusables/Avatar";
import { userData } from "../Navbar";

export function RoomCodeCard({ code }: { code: string }) {
  const [copyDebug, setCopyDebug] = useState(false);
  return (
    <>
      <div
        className="flex flex-col items-center justify-center gap-4 rounded-xl border-4 border-dashed
                  border-dark-primary bg-background/50 py-2"
      >
        <div className="font-nueu text-3xl font-extrabold text-accent lg:text-4xl">
          Room Code:
        </div>
        <div className="flex flex-row items-center justify-center gap-2 lg:gap-4">
          <div className="flex flex-col gap-1">
            <div
              className="flex items-center justify-center rounded-lg border-2 border-primary bg-background 
            px-6 py-3 font-nueu text-2xl font-bold text-text lg:text-3xl"
            >
              {code}
            </div>
            <div className="text-center text-xs text-text/50 md:text-sm">
              Use code to invite
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <div
              className="flex cursor-pointer select-none items-center justify-center rounded-lg bg-primary p-4 font-nueu font-bold
              text-white hover:bg-accent"
              onClick={() => {
                navigator.clipboard.writeText(
                  "http://127.0.0.1:5173/join?code=" + code
                );
                setCopyDebug(true);
                setTimeout(() => {
                  setCopyDebug(false);
                }, 1000);
              }}
            >
              {copyDebug ? (
                <IconCheckbox className="size-6 lg:size-8" stroke={2} />
              ) : (
                <IconCopy className="size-6 lg:size-8" stroke={2} />
              )}
            </div>
            <div className="line-clamp-1 text-center text-xs text-text/50 md:text-sm">
              Copy link
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export interface chatMessage {
  username: string;
  message: string;
}

export function Chat({
  socket,
  chatList,
  room,
}: {
  socket: Socket | null;
  chatList: chatMessage[];
  room: string | null;
}) {
  const [message, setMessage] = useState<string | null>(null);

  function sendMessage() {
    if (message !== null) socket?.emit("send-message", message, room);
    setMessage(null);
  }

  return (
    <>
      <div className="py-2 font-nueu text-4xl font-extrabold text-accent md:text-5xl">
        Chat
      </div>
      <div className="h-full w-full overflow-y-auto px-2">
        {chatList.map((entry, i) => {
          return (
            <div
              key={i}
              className={
                "flex flex-row gap-2 px-2 py-2" +
                " " +
                (i % 2 != 0 && "bg-secondary/70")
              }
            >
              <div className="font-nueu text-xl font-bold text-text">
                {entry.username}:
              </div>
              <div className="font-nueu text-xl text-text">{entry.message}</div>
            </div>
          );
        })}
      </div>
      <div className="flex w-full flex-row justify-center">
        <input
          type="text"
          className="h-14 w-4/5 border-b-2 border-primary bg-transparent p-2 text-xl text-text
          focus:outline-0"
          placeholder="send message"
          value={message ?? ""}
          onChange={(event) =>
            setMessage(event.target.value === "" ? null : event.target.value)
          }
          onKeyDown={(event) => {
            if (event.key === "Enter") sendMessage();
          }}
        />
        <div
          className="flex cursor-pointer items-center justify-center rounded-r-lg bg-primary px-4 text-white hover:bg-accent"
          onClick={sendMessage}
        >
          <IconSend2 stroke={2} className="size-6 md:size-8" />
        </div>
      </div>
    </>
  );
}

export function PlayerRowCard({ i, user }: { i: number; user: userData }) {
  return (
    <div className="mb-2 flex flex-row items-center justify-between rounded-lg bg-secondary p-2 md:px-4">
      <div className="flex flex-row items-center justify-start gap-2">
        <AvatarSmall text="tst" rot={0} disabled />
        <div className="font-nueu text-2xl font-bold text-text">
          {user.username}
        </div>
      </div>
      <div className=" rounded-sm bg-accent/20 p-2">
        {i == 0 ? (
          <IconX className="size-4 text-text md:size-6" />
        ) : (
          <IconCircle className="size-4 text-text md:size-6" />
        )}
      </div>
    </div>
  );
}

export function PlayerLobbyCard({ user }: { user: userData }) {
  return (
    <div className="w-26 flex h-min flex-col items-center justify-start gap-2 rounded-md p-2 hover:bg-secondary sm:w-48 sm:rounded-lg sm:p-6">
      <div className="hidden sm:block">
        <AvatarMedium text="tst" rot={0} disabled />
      </div>
      <div className="block sm:hidden">
        <AvatarSmall text="tst" rot={0} disabled />
      </div>
      <div className="truncate text-center font-nueu text-xl text-text sm:text-4xl">
        {user.username}
      </div>
    </div>
  );
}
