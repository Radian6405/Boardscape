import { Link } from "react-router-dom";
import Backdrop from "../util/reusables/Backdrop";
import { HollowButton, SolidButton } from "../util/reusables/Buttons";
import { ContainerBox } from "../util/reusables/Cards";
import Footer from "../util/Footer";
import TictactoeCard from "../util/game_cards/TictactoeCard";

function Home() {
  return (
    <>
      <Backdrop>
        <div className="flex w-full flex-col items-center justify-center pt-8">
          <ContainerBox>
            <div
              className="animated-background bg-gradient-to-tr from-accent via-dark-primary to-secondary
              bg-clip-text font-nueu text-5xl font-extrabold text-transparent 
              sm:text-7xl md:text-8xl lg:text-9xl "
            >
              BOARDSCAPE
            </div>
            <div
              className="leading-2 sm:text-md w-[90%] text-ellipsis text-balance text-center font-sans text-xs 
              text-text sm:leading-4 md:text-xl lg:text-xl"
            >
              A platform to play a wide range board games and many more online.
              Challenge your friends and embark on exciting adventures in the
              world of board games.
            </div>
            <div className="flex flex-row gap-8 p-5 sm:gap-12 md:gap-16 lg:gap-20">
              <SolidButton minWidth>Play</SolidButton>
              <Link to={"/join"}>
                <HollowButton minWidth>Join</HollowButton>
              </Link>
            </div>
          </ContainerBox>
        </div>
      </Backdrop>
      <div
        className="flex flex-col items-center justify-center gap-2 rounded-2xl
          sm:gap-4 md:gap-8 lg:gap-10 "
      >
        <div
          className="w-[80%] px-2 text-start font-nueu text-4xl font-bold text-accent 
          sm:text-5xl md:text-6xl"
        >
          <span className="px-2 sm:px-8 lg:px-20">Games</span>
          <div className="m-2 w-full border-b-4 border-dashed border-dark-accent"></div>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          <TictactoeCard />
          <TictactoeCard />
          <TictactoeCard />
        </div>
      </div>
      <div className="m-20"></div>
      <Footer />
    </>
  );
}

export default Home;
