import { useSearchParams } from "react-router-dom";
import { SimpleBackdrop } from "../../util/reusables/Backdrop";
import { IconSend2 } from "@tabler/icons-react";
import { RoomCodeCard } from "../../util/game_cards/Misc";


function TicTacToe() {
  const [searchParams] = useSearchParams();

  return (
    <>
      <SimpleBackdrop>
        <Lobby />
        {/* <Game /> */}
      </SimpleBackdrop>
    </>
  );
}

function Lobby() {
  const [searchParams] = useSearchParams();

  return (
    <>
      <div className="flex w-screen flex-row items-center justify-center gap-8 p-20">
        <div className="flex h-[48rem] flex-col justify-start gap-4">
          <RoomCodeCard code={searchParams.get("room") ?? ""} />
          <div
            className="flex h-3/4 w-96 flex-col items-center justify-center gap-4 rounded-xl border-4 
                        border-dashed border-dark-primary bg-background/50 p-4"
          >
            <div className="font-nueu text-4xl font-extrabold text-accent">
              Chat
            </div>
            <div className="h-full w-full overflow-y-auto px-2">
              {Array.from({ length: 60 }, (_, i) => {
                return (
                  <div key={i} className="text-text">
                    hello
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
              <div className="flex cursor-pointer items-center justify-center rounded-lg bg-primary px-4 py-2 hover:bg-accent">
                <IconSend2 stroke={2} className="size-9 text-text" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex h-[48rem] w-[54rem] rounded-xl border-4 border-dashed border-dark-primary bg-background/50"></div>
      </div>
    </>
  );
}

function Game() {
  const [searchParams] = useSearchParams();

  return (
    <>
      <div className="flex w-screen flex-row items-center justify-center gap-8 p-20">
        <div className="flex h-[48rem] flex-col justify-start gap-4">
          <RoomCodeCard code={searchParams.get("room") ?? ""} />
          <div
            className="flex h-3/4 flex-col items-center justify-center gap-4 rounded-xl 
                    border-4 border-dashed border-dark-primary bg-background/50 p-4"
          >
            <div className="font-nueu text-4xl font-extrabold text-accent">
              Players
            </div>
            <div className="h-full w-full overflow-y-auto px-2">
              {Array.from({ length: 6 }, (_, i) => {
                return (
                  <div
                    key={i}
                    className="h-12 w-80 border-b-2 border-black bg-white"
                  ></div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex h-[48rem] w-[48rem] rounded-xl border-4 border-dashed border-dark-primary bg-background/50"></div>
        <div
          className="flex h-[48rem] w-96 flex-col items-center justify-center gap-4 rounded-xl 
                    border-4 border-dashed border-dark-primary bg-background/50 p-4"
        >
          <div className="font-nueu text-4xl font-extrabold text-accent">
            Chat
          </div>
          <div className="h-full w-full overflow-y-auto px-2">
            {Array.from({ length: 60 }, (_, i) => {
              return (
                <div key={i} className="text-text">
                  hello
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
            <div className="flex cursor-pointer items-center justify-center rounded-lg bg-primary px-4 py-2 hover:bg-accent">
              <IconSend2 stroke={2} className="size-9 text-text" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TicTacToe;
