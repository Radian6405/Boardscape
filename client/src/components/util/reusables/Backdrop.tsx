import { ReactNode } from "react";

function Backdrop({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="relative">
        <div
          className="-z-10 flex flex-col items-center justify-center gap-44 bg-background
            pt-[20%] blur-[48px] sm:pt-[10%] sm:blur-[72px] md:blur-[96px] lg:pt-[5%]
            "
        >
          <div className="animate-spin-slow">
            <div className="size-40 rounded-full bg-dark-primary/50 sm:size-60 md:size-80 lg:size-96"></div>
            <div className="size-20 rounded-full bg-accent/50 sm:size-32 md:size-44 lg:size-48"></div>
          </div>

          <div className="h-96 w-[50%] bg-dark-accent/20"></div>
        </div>

        <div className=" absolute top-0 w-full">{children}</div>
      </div>
    </>
  );
}

export function SimpleBackdrop({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="relative">
        <div
          className="-z-10 flex items-center justify-center bg-background p-20
                    blur-[48px] sm:blur-[72px] md:blur-[96px]"
        >
          <div className="h-[80vh] w-[50%] bg-dark-accent/20"></div>
        </div>

        <div className=" absolute top-0">{children}</div>
      </div>
    </>
  );
}

export default Backdrop;
