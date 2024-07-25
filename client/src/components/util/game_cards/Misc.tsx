import { IconCopy } from "@tabler/icons-react";

export function RoomCodeCard({ code }: { code: string }) {
  return (
    <>
      <div
        className="flex h-1/4 flex-col items-center justify-center gap-4 rounded-xl border-4 border-dashed
                        border-dark-primary bg-background/50"
      >
        <div className="font-nueu text-4xl font-extrabold text-accent">
          Room Code:
        </div>
        <div className="flex flex-row items-center justify-center gap-6">
          <div
            className="flex items-center justify-center rounded-lg border-2 border-primary bg-background 
                            px-6 py-3 font-nueu text-3xl font-bold text-text"
          >
            {code}
          </div>
          <div
            className="flex cursor-pointer select-none items-center justify-center rounded-lg bg-primary p-4 font-nueu font-bold
                        text-text hover:bg-accent"
          >
            <IconCopy className="size-8" stroke={2} />
          </div>
        </div>
      </div>
    </>
  );
}
