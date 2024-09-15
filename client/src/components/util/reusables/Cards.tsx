import { IconClock, IconTags, IconUsers } from "@tabler/icons-react";
import { MouseEventHandler, ReactNode, useState } from "react";
import { SolidButton } from "./Buttons";

interface GameCardProps {
  playerCountText: string;
  gameTimeText: string;
  tags?: string[];
  onCreate: MouseEventHandler<HTMLDivElement>;
}

export function GameCard({
  playerCountText,
  gameTimeText,
  tags,
  onCreate,
}: GameCardProps) {
  const [showOverlay, setShowOverlay] = useState(false);
  return (
    <>
      <div className="rounded-2xl border-2 border-secondary bg-accent">
        <div
          className="relative h-40 w-60 cursor-pointer rounded-xl border-2 border-secondary bg-dark-primary text-text 
                    transition ease-in-out hover:-translate-y-2 hover:scale-110"
          onMouseEnter={() => setShowOverlay(true)}
          onMouseLeave={() => setShowOverlay(false)}
        >
          <div
            className={
              "absolute h-full w-full items-center justify-center rounded-lg bg-background/40 " +
              " " +
              (showOverlay ? "flex" : "hidden")
            }
          >
            <SolidButton sizeClass="text-base" onClick={onCreate}>
              <span className="mx-4 my-2">Create Room</span>
            </SolidButton>
          </div>
          hello
        </div>

        <div className="flex max-h-28 w-60 flex-col gap-1 rounded-xl bg-accent px-6 py-2">
          <div className="flex flex-row items-center justify-start gap-2">
            <IconUsers stroke={2} className="size-5 text-background" />
            <div className="font-sans text-lg font-semibold text-background">
              {playerCountText}
            </div>
          </div>
          <div className="flex flex-row items-center justify-start gap-2">
            <IconClock stroke={2} className="size-5 text-background" />
            <div className="font-sans text-lg font-semibold text-background">
              {gameTimeText}
            </div>
          </div>
          <div className="flex flex-row items-center justify-start gap-2">
            <IconTags stroke={2} className="size-5 text-background" />
            <div className="flex flex-row items-center justify-center gap-2 truncate">
              {tags !== undefined &&
                tags.map((tag, i) => {
                  return <TagCard key={i}>{tag}</TagCard>;
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function TagCard({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="cursor-pointer font-sans text-lg font-semibold text-background underline hover:text-text">
        {children}
      </div>
    </>
  );
}

export function ContainerBox({ children }: { children: ReactNode }) {
  return (
    <>
      <div
        className="flex max-w-[75%] flex-col items-center justify-center gap-2 rounded-2xl
         sm:gap-4 md:gap-8 lg:gap-10 "
      >
        {children}
      </div>
    </>
  );
}
