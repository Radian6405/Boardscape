import { ReactNode } from "react";

function Backdrop({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="-z-10 relative">
        <div
          className="bg-dark_purple-200 flex flex-col gap-64 justify-center items-center  
        pt-[30%] blur-[48px] sm:blur-[72px] sm:pt-[20%] md:blur-[96px] lg:pt-[10%] "
        >
          <div className="animate-spin-slow">
            <div className="size-40 bg-slate_blue-400  rounded-full opacity-50 sm:size-60 md:size-80 lg:size-96"></div>
            <div className="size-20 bg-tropical_indigo-500  rounded-full opacity-60 sm:size-32 md:size-44 lg:size-48"></div>
          </div>
        </div>
        <div className="absolute top-0 left-0">{children}</div>
      </div>
    </>
  );
}

export default Backdrop;
