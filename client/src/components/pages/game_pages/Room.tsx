import { useNavigate, useSearchParams } from "react-router-dom";
import { SimpleBackdrop } from "../../util/reusables/Backdrop";
import {
  Chat,
  chatMessage,
  PlayerLobbyCard,
  RoomCodeCard,
} from "../../util/game_cards/Misc";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { getUser, userData } from "../../util/Navbar";
import { useCookies } from "react-cookie";
import { DoubleOutlineButton } from "../../util/reusables/Buttons";
import TicTacToeGame from "./TicTacToe";

function Room() {
  const [searchParams] = useSearchParams();
  const [cookie, setCookie] = useCookies(["token", "googleRefreshToken"]);
  const navigate = useNavigate();

  const [socket, setSocket] = useState<Socket | null>(null);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [game, setGame] = useState<string | null>(null);
  const [userList, setUserList] = useState<userData[] | null>(null);
  const [chatList, setChatList] = useState<chatMessage[]>([]);

  async function init() {
    // get user data
    let data: userData = await getUser(cookie, setCookie);
    if (data === null || data === undefined) {
      data = {
        username: "user_" + String(Math.floor(Math.random() * 10000)),
        user_id: null,
      };
    }

    // connection call
    const socket = io("http://localhost:8000/room", {
      auth: { userData: data },
    });
    setSocket(socket);
    console.log(socket);

    // room join call
    socket.emit("join-room", { room: searchParams.get("code") }, () => {
      navigate("/room-not-found");
    });

    //message calls
    socket.on("receive-message", (data: chatMessage) => {
      setChatList([...chatList, data]);
      chatList.push(data);
    });

    // updated user list listener
    socket.on("room-update", (data) => {
      setUserList(data.userList);
      setIsGameStarted(data.isGameStarted);

      // console.log(data.game);
      setGame(data.game);
    });
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <SimpleBackdrop>
        {isGameStarted ? (
          game === "tictactoe" && (
            <TicTacToeGame
              userList={userList}
              socket={socket}
              chatList={chatList}
            />
          )
        ) : (
          <Lobby
            userList={userList}
            startGame={() => {
              setIsGameStarted(true);
              socket?.emit("set-game-status", searchParams.get("code"), true);
            }}
            socket={socket}
            chatList={chatList}
          />
        )}
      </SimpleBackdrop>
    </>
  );
}

function Lobby({
  userList,
  startGame,
  socket,
  chatList,
}: {
  userList: userData[] | null;
  startGame: React.MouseEventHandler<HTMLDivElement>;
  socket: Socket | null;
  chatList: chatMessage[];
}) {
  const [searchParams] = useSearchParams();

  return (
    <>
      <div
        className="grid w-screen grid-cols-1 grid-rows-[repeat(5,_12rem)] gap-y-5 p-5 sm:p-8 md:grid-cols-3
                  md:grid-rows-[repeat(3,_12rem)] md:gap-x-5 md:p-10 lg:grid-rows-[repeat(4,_12rem)] lg:gap-x-8 lg:px-24"
      >
        <RoomCodeCard code={searchParams.get("code") ?? ""} />

        <div
          className="row-span-2 flex flex-col gap-2 rounded-xl border-4 border-dashed border-dark-primary
                    bg-background/50 p-2 md:col-span-2 md:row-span-3 lg:row-span-4"
        >
          <div className="py-4 text-center font-nueu text-4xl font-extrabold text-accent sm:text-5xl md:text-6xl">
            Players {userList?.length ?? 0}/2
          </div>
          <div className="flex flex-wrap items-start justify-center gap-4 overflow-auto">
            {userList?.map((user, i) => {
              return <PlayerLobbyCard key={i} user={user} />;
            })}
          </div>
          <div className="flex items-center justify-center p-5">
            <DoubleOutlineButton
              sizeClass="text-2xl px-4 py-2 sm:text-3xl md:text-4xl md:px-6 md:py-4 "
              onClick={startGame}
            >
              Start
            </DoubleOutlineButton>
          </div>
        </div>

        <div
          className="row-span-2 flex flex-col items-center justify-center gap-4 rounded-xl border-4 
                    border-dashed border-dark-primary bg-background/50 p-5 pb-8 lg:row-span-3"
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

export default Room;
