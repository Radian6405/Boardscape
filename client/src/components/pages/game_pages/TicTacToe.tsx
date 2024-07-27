import { useNavigate, useSearchParams } from "react-router-dom";
import { SimpleBackdrop } from "../../util/reusables/Backdrop";
import { Chat, chatMessage, RoomCodeCard } from "../../util/game_cards/Misc";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { getUser, userData } from "../../util/Navbar";
import { useCookies } from "react-cookie";
import { AvatarMedium, AvatarSmall } from "../../util/reusables/Avatar";
import { DoubleOutlineButton } from "../../util/reusables/Buttons";

function TicTacToe() {
  const [searchParams] = useSearchParams();
  const [cookie, setCookie] = useCookies(["token", "googleRefreshToken"]);
  const navigate = useNavigate();

  const [socket, setSocket] = useState<Socket | null>(null);
  const [isGameStarted, setIsGameStarted] = useState(false);
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
    const socket = io("http://localhost:8000/tictactoe", {
      auth: { userData: data },
    });
    setSocket(socket);
    console.log(socket);

    // room join call
    socket.emit("join-room", { room: searchParams.get("room") }, () => {
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
    });
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <SimpleBackdrop>
        {isGameStarted ? (
          <Game userList={userList} socket={socket} chatList={chatList} />
        ) : (
          <Lobby
            userList={userList}
            startGame={() => {
              setIsGameStarted(true);
              socket?.emit("set-game-status", searchParams.get("room"), true);
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
          <RoomCodeCard code={searchParams.get("room") ?? ""} />
          <div
            className="flex h-3/4 w-96 flex-col items-center justify-center gap-4 rounded-xl border-4 
                        border-dashed border-dark-primary bg-background/50 p-4"
          >
            <Chat
              socket={socket}
              room={searchParams.get("room")}
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

function Game({
  userList,
  socket,
  chatList,
}: {
  userList: userData[] | null;
  socket: Socket | null;
  chatList: chatMessage[];
}) {
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
              {userList?.map((user, i) => {
                return (
                  <div
                    key={i}
                    className="mb-2 flex flex-row items-center justify-start gap-4 rounded-lg bg-secondary p-2"
                  >
                    <AvatarSmall text="tst" rot={0} disabled />
                    <div className="font-nueu text-2xl font-bold text-text">
                      {user.username}
                    </div>
                  </div>
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
          <Chat
            socket={socket}
            room={searchParams.get("room")}
            chatList={chatList}
          />
        </div>
      </div>
    </>
  );
}

export default TicTacToe;
