import { useNavigate, useSearchParams } from "react-router-dom";
import { SimpleBackdrop } from "../../util/reusables/Backdrop";
import { Chat, chatMessage, RoomCodeCard } from "../../util/game_cards/Misc";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { getUser, userData } from "../../util/Navbar";
import { useCookies } from "react-cookie";
import { AvatarMedium } from "../../util/reusables/Avatar";
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
      <div className="flex w-screen flex-row items-center justify-center gap-8 p-20">
        <div className="flex h-[48rem] flex-col justify-start gap-4">
          <RoomCodeCard code={searchParams.get("code") ?? ""} />
          <div
            className="flex h-3/4 w-96 flex-col items-center justify-center gap-4 rounded-xl border-4 
                        border-dashed border-dark-primary bg-background/50 p-4"
          >
            <Chat
              socket={socket}
              room={searchParams.get("code")}
              chatList={chatList}
            />
          </div>
        </div>

        <div className="flex h-[48rem] w-[54rem] flex-col gap-4 rounded-xl border-4 border-dashed border-dark-primary bg-background/50 p-2">
          <div className="p-5 text-center font-nueu text-6xl font-extrabold text-accent">
            Players {userList?.length}/2
          </div>
          <div className="flex flex-wrap  items-start justify-center gap-4 overflow-auto">
            {userList?.map((user, i) => {
              return (
                <div
                  key={i}
                  className="flex h-min flex-col justify-start gap-5 rounded-xl bg-secondary p-6"
                >
                  <AvatarMedium text="tst" rot={0} disabled />
                  <div className="text-center font-nueu text-3xl text-text">
                    {user.username}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-center p-5">
            <DoubleOutlineButton
              sizeClass="text-4xl px-10 py-4"
              onClick={startGame}
            >
              Start
            </DoubleOutlineButton>
          </div>
        </div>
      </div>
    </>
  );
}

export default Room;
