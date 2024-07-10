import { ReactNode } from "react";

function Backdrop({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="relative ">
        <div
          className="bg-background flex flex-col gap-64 justify-center items-center -z-10 
        pt-[30%] blur-[48px] sm:blur-[72px] sm:pt-[20%] md:blur-[96px] lg:pt-[10%] "
        >
          <div className="animate-spin-slow">
            <div className="size-40 bg-dark-primary/50 rounded-full sm:size-60 md:size-80 lg:size-96"></div>
            <div className="size-20 bg-accent/60 rounded-full  sm:size-32 md:size-44 lg:size-48"></div>
          </div>
        </div>
        <div className="w-[100vw] absolute top-0">{children}</div>
      </div>
    </>
  );
}

export default Backdrop;
