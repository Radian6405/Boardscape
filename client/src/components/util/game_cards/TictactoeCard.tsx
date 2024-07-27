import { useNavigate } from "react-router-dom";
import { GameCard } from "../reusables/Cards";

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
        playerCountText="2-8 players"
        gameTimeText="5-10 mins"
        tags={["1", "2", "3"]}
        onCreate={getRoomCode}
      />
    </>
  );
}

export default TictactoeCard;
