import { IconClock, IconTags, IconUsers } from "@tabler/icons-react";
import { ReactNode } from "react";

export function GameCard() {
  return (
    <>
      <div className="rounded-2xl border-2 border-secondary bg-accent">
        <div
          className="h-48 w-80 cursor-pointer rounded-xl border-2 border-secondary bg-dark-primary transition 
                    ease-in-out hover:-translate-y-2 hover:scale-110"
        ></div>
        <div className="flex max-h-28 w-80 flex-col gap-1 rounded-xl bg-accent px-6 py-2">
          <div className="flex flex-row items-center justify-start gap-2">
            <IconUsers stroke={2} className="size-5 text-secondary" />
            <div className="font-sans text-lg font-semibold text-secondary">
              2-8 Players
            </div>
          </div>
          <div className="flex flex-row items-center justify-start gap-2">
            <IconClock stroke={2} className="size-5 text-secondary" />
            <div className="font-sans text-lg font-semibold text-secondary">
              5-10 Minutes
            </div>
          </div>
          <div className="flex flex-row items-center justify-start gap-2">
            <IconTags stroke={2} className="size-5 text-secondary" />
            <div className="flex flex-row items-center justify-center gap-2 truncate">
              <TagCard>Tag 1</TagCard>
              <TagCard>Tag 2</TagCard>
              <TagCard>Tag 3</TagCard>
              <TagCard>Tag 4</TagCard>
              <TagCard>Tag 5</TagCard>
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
      <div className="font-sans text-lg font-semibold text-secondary underline cursor-pointer hover:text-text">
        {children}
      </div>
    </>
  );
}
