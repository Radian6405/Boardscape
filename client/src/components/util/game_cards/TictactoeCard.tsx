import { useNavigate } from "react-router-dom";
import { GameCard } from "../reusables/Cards";
import { IconTicTac } from "@tabler/icons-react";

function TictactoeCard() {
  const navigate = useNavigate();

  async function getRoomCode() {
    const response = await fetch(
      "http://localhost:8000/create-room?game=tictactoe",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("failed to fetch");
    }

    const data = await response.json();
    navigate(`/room?code=${data.code}&game=tictactoe`);
  }
  return (
    <>
      <GameCard
        playerCountText="1-2 players"
        gameTimeText="2-3 mins"
        tags={["fun", "classic"]}
        onCreate={getRoomCode}
      >
        <div className="h-full flex flex-col items-center justify-center">
        <IconTicTac stroke={1.5} className="text-text size-24 rotate-12" />
        <div className="text-4xl text-text font-nueu font-bold ">TicTacToe</div>
        </div>
      </GameCard>
    </>
  );
}

export default TictactoeCard;
