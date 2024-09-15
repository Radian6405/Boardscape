import { IconCheckbox, IconCopy, IconSend2 } from "@tabler/icons-react";
import { useState } from "react";
import { Socket } from "socket.io-client";

export function RoomCodeCard({ code }: { code: string }) {
  const [copyDebug, setCopyDebug] = useState(false);
  return (
    <>
      <div
        className="flex h-1/4 flex-col items-center justify-center gap-4 rounded-xl border-4 border-dashed
                  border-dark-primary bg-background/50 px-10"
      >
        <div className="font-nueu text-4xl font-extrabold text-accent">
          Room Code:
        </div>
        <div className="flex flex-row items-center justify-center gap-6">
          <div className="flex flex-col gap-1">
            <div
              className="flex items-center justify-center rounded-lg border-2 border-primary bg-background 
            px-6 py-3 font-nueu text-3xl font-bold text-text"
            >
              {code}
            </div>
            <div className="text-center text-sm text-text/50">
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
                <IconCheckbox className="size-8" stroke={2} />
              ) : (
                <IconCopy className="size-8" stroke={2} />
              )}
            </div>
            <div className="text-center text-sm text-text/50">Copy link</div>
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
      <div className="font-nueu text-4xl font-extrabold text-accent">Chat</div>
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
      <div className="flex flex-row gap-4 px-4">
        <input
          type="text"
          className="h-14 w-60 border-b-2 border-accent bg-transparent p-2 text-xl text-text
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
          className="flex cursor-pointer items-center justify-center rounded-lg bg-primary px-4 py-2 text-white hover:bg-accent"
          onClick={sendMessage}
        >
          <IconSend2 stroke={2} className="size-9" />
        </div>
      </div>
    </>
  );
}
