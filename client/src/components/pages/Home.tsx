import Backdrop from "../Backdrop";
import { HollowButton, SolidButton } from "../util/Buttons";
function Home() {
  return (
    <>
      <Backdrop>
        <div className="flex flex-col items-center justify-center pt-16 ">
          <div
            className="max-w-[75%] flex flex-col justify-center items-center gap-10
                        bg-background/50 py-20 px-32 border-4 border-dashed rounded-2xl border-dark-accent"
          >
            <div
              className="text-9xl text-transparent font-nueu font-bold bg-clip-text 
                          bg-gradient-to-tr from-accent via-dark-primary to-secondary animated-background"
            >
              BOARDSCAPE
            </div>
            <div className="max-w-[90%] text-xl text-text font-sans  text-balance text-center text-ellipsis leading-8">
              A platform to play a wide range board games and many more online.
              Challenge your friends and embark on exciting adventures in the
              world of board games.
            </div>
            <div className="flex flex-row gap-16 p-5">
              <SolidButton>Play</SolidButton>
              <HollowButton>Join Game</HollowButton>
            </div>
          </div>
        </div>
      </Backdrop>
    </>
  );
}

export default Home;
