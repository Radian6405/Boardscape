import { useSearchParams } from "react-router-dom";
import { Socket } from "socket.io-client";
import { chatMessage, RoomCodeCard, Chat } from "../../util/game_cards/Misc";
import { userData } from "../../util/Navbar";
import { AvatarSmall } from "../../util/reusables/Avatar";
import { useEffect, useState } from "react";
import { IconCircle, IconX } from "@tabler/icons-react";
import { SolidButton } from "../../util/reusables/Buttons";
import { isSolved, isSolvedCell, solvedCells } from "../../util/Misc";

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
  const [solvedCell, setSolvedCell] = useState<solvedCells | null>(null);
  // if diagonal is
  // 1 - top left to bottom right (row = col)
  // 0 - bottom left to top right (row + col = 2)

  function init() {
    socket?.on("tictactoe-update", (data) => {
      const isBoardSolved = isSolved(data.board);
      setSolvedCell(isBoardSolved);
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
                    className="mb-2 flex flex-row items-center justify-between rounded-lg bg-secondary p-2"
                  >
                    <div className="flex flex-row items-center justify-start gap-4">
                      <AvatarSmall text="tst" rot={0} disabled />
                      <div className="font-nueu text-2xl font-bold text-text">
                        {user.username}
                      </div>
                    </div>
                    <div className="mx-2 rounded-sm bg-accent/20 p-2">
                      {i == 0 ? (
                        <IconX className="size-6 text-text" />
                      ) : (
                        <IconCircle className="size-6 text-text" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div
          className="flex h-[48rem] w-[48rem] flex-col items-center justify-center gap-10 rounded-xl border-4 border-dashed
                        border-dark-primary bg-background/50"
        >
          <div className="relative flex flex-col">
            <div
              className={
                "absolute inset-0 items-center justify-center bg-dark-background/50" +
                " " +
                (solvedCell !== null && userList && userList.length >= 2
                  ? "flex"
                  : "hidden")
              }
            >
              <div className="flex items-center justify-center rounded-xl bg-primary p-6 font-nueu text-5xl font-bold text-text">
                {userList &&
                  userList.length >= 2 &&
                  (solvedCell?.player
                    ? userList[0].username
                    : userList[1].username)}{" "}
                wins!
              </div>
            </div>
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
                        isSolved={isSolvedCell(i, j, solvedCell)}
                        value={board[i][j]}
                        playCell={() => {
                          if (solvedCell !== null) return;
                          socket?.emit(
                            "tictactoe-play",
                            { row: i, col: j },
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
          <SolidButton
            onClick={() => {
              socket?.emit("tictactoe-reset", searchParams.get("code"));
            }}
          >
            Reset
          </SolidButton>
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
  isSolved,
  value,
  playCell,
}: {
  row: number;
  col: number;
  isSolved: boolean;
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
        "flex size-40 select-none items-center justify-center p-2 border-text" +
        " " +
        (col !== 2 && "border-r-8") +
        " " +
        (col !== 0 && "border-l-8") +
        " " +
        (row !== 2 && "border-b-8") +
        " " +
        (row !== 0 && "border-t-8") +
        " " +
        (isSolved && "bg-primary ")
      }
    >
      <div
        className={
          "cursor-pointer p-4 " +
          " " +
          (isSolved ? "hover:bg-primary" : "hover:bg-secondary")
        }
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
