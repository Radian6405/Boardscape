import { ReactNode } from "react";

function Backdrop({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="relative ">
        <div
          className="-z-10 flex flex-col items-center justify-center gap-16 bg-background
            pt-[20%] blur-[48px] sm:pt-[10%] sm:blur-[72px] md:blur-[96px] lg:pt-[5%]
            "
        >
          <div className="flex flex-row justify-between gap-32">
            <BackdropHelper1 />
            <BackdropHelper3 />
          </div>
          <div className="flex flex-row justify-between gap-72 ">
            <BackdropHelper2 />
            <BackdropHelper3 />
          </div>
          <div className="flex flex-row justify-between gap-64">
            <BackdropHelper3 />
            <BackdropHelper4 />
            <BackdropHelper3 />
          </div>
        </div>
        <div className=" absolute top-0">{children}</div>
      </div>
    </>
  );
}

function BackdropHelper1() {
  return (
    <div className="animate-spin-slow">
      <div className="size-40 rounded-full bg-dark-primary/60 sm:size-60 md:size-80 lg:size-96"></div>
      <div className="size-20 rounded-full bg-accent/70  sm:size-32 md:size-44 lg:size-48"></div>
    </div>
  );
}
function BackdropHelper2() {
  return (
    <div className="animate-spin-slow">
      <div className="h-20 w-32 rounded-full bg-dark-accent/80 sm:h-32 sm:w-44 md:h-44 md:w-64 lg:h-48 lg:w-80 "></div>
    </div>
  );
}
function BackdropHelper3() {
  return (
    <div className="animate-spin-slow">
      <div className="h-20 w-20 rounded-full bg-primary/90 sm:h-32 md:h-44 lg:h-48"></div>
      <div className="h-28 w-20 rounded-full bg-dark-primary/90 sm:h-32 md:h-52 lg:h-56"></div>
    </div>
  );
}
function BackdropHelper4() {
  return (
    <div className="animate-spin-slow">
      <div className="h-20 w-20 rounded-full bg-dark-accent/90 sm:h-32 md:h-44 lg:h-48"></div>
      <div className="size-20 rounded-full bg-accent/70  sm:size-32 md:size-44 lg:size-48"></div>
    </div>
  );
}

export default Backdrop;
