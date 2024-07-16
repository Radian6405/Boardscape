import { Link } from "react-router-dom";
import Backdrop from "../util/reusables/Backdrop";
import { HollowButton, SolidButton } from "../util/reusables/Buttons";
import { BorderBox, GameCard } from "../util/reusables/Cards";
import Footer from "../util/Footer";

function Home() {
  return (
    <>
      <Backdrop>
        <div className="flex flex-col items-center justify-center gap-40 pt-16 ">
          <BorderBox>
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
              <Link to={"/join"}>
                <HollowButton>Join Game</HollowButton>
              </Link>
            </div>
          </BorderBox>
          <BorderBox>
            <div className="w-[100%] px-20 text-start font-nueu text-6xl font-bold text-accent">
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
          </BorderBox>
        </div>
        <div className="m-20"></div>
        <Footer />
      </Backdrop>
    </>
  );
}

export default Home;
