import Backdrop from "../Backdrop";
import { HollowButton, SolidButton } from "../util/Buttons";
import { GameCard } from "../util/Cards";

function Home() {
  return (
    <>
      <Backdrop>
        <div className="flex flex-col items-center justify-center gap-16 pt-4">
          <div
            className="flex max-w-[75%] flex-col items-center justify-center gap-10 rounded-2xl
                       border-4 border-dashed border-dark-accent bg-background/50 px-32 py-20"
          >
            <div
              className="animated-background bg-gradient-to-tr from-accent via-dark-primary to-secondary
                             bg-clip-text font-nueu text-9xl font-bold text-transparent"
            >
              BOARDSCAPE
            </div>
            <div className="w-[90%] text-ellipsis text-balance text-center font-sans text-xl leading-8 text-text">
              A platform to play a wide range board games and many more online.
              Challenge your friends and embark on exciting adventures in the
              world of board games.
            </div>
            <div className="flex flex-row gap-16 p-5">
              <SolidButton>Play</SolidButton>
              <HollowButton>Join Game</HollowButton>
            </div>
          </div>
          <div
            className="b flex w-[75%] flex-col items-center justify-center gap-10 rounded-2xl border-4 border-dashed 
                        border-dark-accent bg-background/50 px-16 py-20"
          >
            <div className="font-nueu text-6xl font-bold text-accent">
              Games
            </div>
            <div className="w-[100%] border-b-4 border-dashed border-dark-accent"></div>
            <div className="flex flex-wrap justify-center gap-10">
              <GameCard />
              <GameCard />
              <GameCard />
              <GameCard />
              <GameCard />
              <GameCard />
            </div>
          </div>
        </div>
      </Backdrop>
    </>
  );
}

export default Home;
