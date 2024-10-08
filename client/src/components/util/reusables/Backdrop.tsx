import { ReactNode } from "react";

function Backdrop({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="relative">
        <div
          className="-z-10 flex flex-col items-center justify-center gap-44 bg-background
            pt-[10%] blur-[48px] sm:pt-[5%] sm:blur-[72px] md:blur-[96px] 
            "
        >
          <div className="animate-spin-slow">
            <div className="size-40 rounded-full bg-dark-primary/50 sm:size-60 md:size-80 lg:size-96"></div>
            <div className="size-20 rounded-full bg-accent/50 sm:size-32 md:size-44 lg:size-48"></div>
          </div>

          {/* <div className="w-[50%] bg-dark-accent/20"></div> */}
        </div>

        <div className=" absolute top-0 w-full">{children}</div>
      </div>
    </>
  );
}

export function SimpleBackdrop({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="relative h-lvh">
        <div
          className="-z-10 flex h-[100vh] items-center justify-center bg-background p-20
                    blur-[48px] sm:blur-[72px] md:blur-[96px]"
        >
          <div className="h-4/5 w-3/5 bg-dark-accent/20"></div>
        </div>
        <div className="absolute top-0 flex w-full items-center justify-center">
          {children}
        </div>
      </div>
    </>
  );
}

export default Backdrop;
