import { useSearchParams } from "react-router-dom";
import { Socket } from "socket.io-client";
import {
  chatMessage,
  RoomCodeCard,
  Chat,
  PlayerRowCard,
} from "../../util/game_cards/Misc";
import { userData } from "../../util/Navbar";
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
      <div
        className="grid w-screen grid-cols-1 grid-rows-[repeat(7,_12rem)] gap-y-5 p-5 sm:p-8 md:grid-cols-3
                  md:grid-rows-[repeat(4,_12rem)] md:gap-5 md:p-10  xl:grid-cols-4"
      >
        <RoomCodeCard code={searchParams.get("code") ?? ""} />

        <div
          className="row-span-2 flex flex-col items-center justify-center gap-4 rounded-xl border-4 border-dashed
                      border-dark-primary bg-background/50 p-4 md:col-span-2 md:row-span-1 xl:col-span-1 xl:row-span-3 xl:row-start-2"
        >
          <div className="py-2 font-nueu text-4xl font-extrabold text-accent md:text-5xl">
            Players
          </div>
          <div className="h-full w-full overflow-y-auto px-2">
            {userList?.map((user, i) => {
              return <PlayerRowCard key={i} i={i} user={user} />;
            })}
          </div>
        </div>

        <div
          className="row-span-2 row-start-2 flex flex-col items-center justify-center gap-5 rounded-xl border-4 border-dashed border-dark-primary bg-background/50
                    sm:gap-6 md:col-span-2 md:col-start-2 md:row-span-3 md:row-start-2 md:gap-14 lg:gap-10 xl:row-span-4"
        >
          <div className="relative flex flex-col">
            <div
              className={
                "absolute inset-0 items-center justify-center" +
                " " +
                (solvedCell !== null && userList && userList.length >= 2
                  ? "flex"
                  : "hidden")
              }
            >
              <div className="flex items-center justify-center rounded-lg bg-primary px-4 py-2 font-nueu text-3xl font-bold text-text md:p-4 md:text-4xl lg:text-5xl">
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
          className="col-start-1 row-span-2 flex flex-col items-center justify-center gap-4 rounded-xl border-4
                    border-dashed border-dark-primary bg-background/50 p-5 pb-8 md:row-span-3 lg:row-span-3 lg:row-start-2 xl:col-start-4 xl:row-span-4"
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
        "flex select-none items-center justify-center border-text p-2" +
        " " +
        (col !== 2 &&
          "border-r-2 md:border-r-4 lg:border-r-[6px] xl:border-r-8") +
        " " +
        (col !== 0 &&
          "border-l-2 md:border-l-4 lg:border-l-[6px] xl:border-l-8") +
        " " +
        (row !== 2 &&
          "border-b-2 md:border-b-4 lg:border-b-[6px] xl:border-b-8") +
        " " +
        (row !== 0 &&
          "border-t-2 md:border-t-4 lg:border-t-[6px] xl:border-t-8") +
        " " +
        (isSolved && "bg-primary ")
      }
    >
      <div
        className={
          "cursor-pointer p-1 " +
          " " +
          (isSolved ? "hover:bg-primary" : "hover:bg-secondary")
        }
        onClick={playCell}
      >
        {value === null ? (
          <div className="size-14 text-text md:size-16 lg:size-20 xl:size-32"></div>
        ) : value ? (
          <IconX
            stroke={2}
            className="size-14 text-text md:size-16 lg:size-20 xl:size-32"
          />
        ) : (
          <IconCircle
            stroke={2}
            className="size-14 text-text md:size-16 lg:size-20 xl:size-32"
          />
        )}
      </div>
    </div>
  );
}

export default TicTacToeGame;
