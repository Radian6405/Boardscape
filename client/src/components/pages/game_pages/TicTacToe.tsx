import { useSearchParams } from "react-router-dom";
import { Socket } from "socket.io-client";
import { chatMessage, RoomCodeCard, Chat } from "../../util/game_cards/Misc";
import { userData } from "../../util/Navbar";
import { AvatarSmall } from "../../util/reusables/Avatar";
import { useEffect, useState } from "react";
import { IconCircle, IconX } from "@tabler/icons-react";

function TicTacToeGame({
  userList,
  socket,
  chatList,
}: {
  userList: userData[] | null;
  socket: Socket | null;
  chatList: chatMessage[];
}) {
  const [searchParams] = useSearchParams();

  const [board, setBoard] = useState<(boolean | null)[][]>(
    Array(3).fill(Array(3).fill(null))
  );

  function init() {
    socket?.on("tictactoe-update", (data) => {
      setBoard(data.board);
    });
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <div className="flex w-screen flex-row items-center justify-center gap-8 p-20">
        <div className="flex h-[48rem] flex-col justify-start gap-4">
          <RoomCodeCard code={searchParams.get("code") ?? ""} />
          <div
            className="flex h-3/4 flex-col items-center justify-center gap-4 rounded-xl 
                      border-4 border-dashed border-dark-primary bg-background/50 p-4"
          >
            <div className="font-nueu text-4xl font-extrabold text-accent">
              Players
            </div>
            <div className="h-full w-full overflow-y-auto px-2">
              {userList?.map((user, i) => {
                return (
                  <div
                    key={i}
                    className="mb-2 flex flex-row items-center justify-start gap-4 rounded-lg bg-secondary p-2"
                  >
                    <AvatarSmall text="tst" rot={0} disabled />
                    <div className="font-nueu text-2xl font-bold text-text">
                      {user.username}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div
          className="flex h-[48rem] w-[48rem] items-center justify-center rounded-xl border-4 border-dashed
                        border-dark-primary bg-background/50"
        >
          <div className="flex flex-col">
            {[...Array(3).keys()].map((_, i) => {
              return (
                <div key={i} className="flex flex-row">
                  {/* columns */}
                  {[...Array(3).keys()].map((_, j) => {
                    return (
                      // cells
                      <Cell
                        key={3 * i + j}
                        row={i}
                        col={j}
                        value={board[i][j]}
                        playCell={() => {
                          socket?.emit(
                            "tictactoe-play",
                            { row: i, col: j},
                            searchParams.get("code")
                          );
                        }}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
        <div
          className="flex h-[48rem] w-96 flex-col items-center justify-center gap-4 rounded-xl 
                      border-4 border-dashed border-dark-primary bg-background/50 p-4"
        >
          <Chat
            socket={socket}
            room={searchParams.get("code")}
            chatList={chatList}
          />
        </div>
      </div>
    </>
  );
}

function Cell({
  row,
  col,
  value,
  playCell,
}: {
  row: number;
  col: number;
  value: boolean | null;
  playCell: React.MouseEventHandler<HTMLDivElement>;
}) {
  /* value: 
        null is empty
        true is cross
        false is circle
    */
  return (
    <div
      className={
        "flex size-40 select-none items-center justify-center p-2" +
        " " +
        (col !== 2 && " border-r-8") +
        " " +
        (col !== 0 && " border-l-8") +
        " " +
        (row !== 2 && " border-b-8") +
        " " +
        (row !== 0 && " border-t-8")
      }
    >
      <div
        className=" cursor-pointer p-4 hover:bg-secondary"
        onClick={playCell}
      >
        {value === null ? (
          <div className="size-24 text-text"></div>
        ) : value ? (
          <IconX stroke={2} className="size-24 text-text" />
        ) : (
          <IconCircle stroke={2} className="size-24 text-text" />
        )}
      </div>
    </div>
  );
}
export default TicTacToeGame;
