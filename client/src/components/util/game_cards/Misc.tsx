import { IconCopy, IconSend2 } from "@tabler/icons-react";
import { Socket } from "socket.io-client";

export function RoomCodeCard({ code }: { code: string }) {
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
          <div
            className="flex items-center justify-center rounded-lg border-2 border-primary bg-background 
                            px-6 py-3 font-nueu text-3xl font-bold text-text"
          >
            {code}
          </div>
          <div
            className="flex cursor-pointer select-none items-center justify-center rounded-lg bg-primary p-4 font-nueu font-bold
                        text-text hover:bg-accent"
          >
            <IconCopy className="size-8" stroke={2} />
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
  return (
    <>
      <div className="font-nueu text-4xl font-extrabold text-accent">Chat</div>
      <div className="h-full w-full overflow-y-auto px-2">
        {chatList.map((entry, i) => {
          return (
            <div key={i} className="text-text">
              {entry.username}: {entry.message}
            </div>
          );
        })}
      </div>
      <div className="flex flex-row gap-4 px-4">
        <input
          type="text"
          className="h-14 w-60 border-b-2 border-accent bg-transparent p-2 text-xl text-text
          focus:outline-0 "
          placeholder="type here"
        />
        <div
          className="flex cursor-pointer items-center justify-center rounded-lg bg-primary px-4 py-2 hover:bg-accent"
          onClick={() => {
            socket?.emit("send-message", "hello", room);
          }}
        >
          <IconSend2 stroke={2} className="size-9 text-text" />
        </div>
      </div>
    </>
  );
}
