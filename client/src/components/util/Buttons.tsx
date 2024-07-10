import { ReactNode } from "react";

export function DoubleOutlineButton({ children }: { children: ReactNode }) {
  return (
    <>
      <div
        className="bg-secondary rounded-lg  text-xl text-text font-nueu font-bold  ring-2 ring-dark-accent ring-offset-2 ring-offset-secondary 
                   flex items-center justify-center px-4 py-3 hover:bg-dark-accent cursor-pointer select-none "
      >
        {children}
      </div>
    </>
  );
}

export function SolidButton({ children }: { children: ReactNode }) {
  return (
    <div
      className="min-w-44 bg-primary rounded-xl px-6 py-4 text-3xl text-text font-nueu font-bold flex justify-center items-center 
                cursor-pointer select-none hover:bg-accent"
    >
      {children}
    </div>
  );
}

export function HollowButton({ children }: { children: ReactNode }) {
  return (
    <div
      className="min-w-44 bg-secondary rounded-xl px-6 py-4 text-3xl text-text font-nueu font-bold flex justify-center items-center 
                cursor-pointer select-none hover:bg-accent "
    >
      {children}
    </div>
  );
}

{
  /* <div className="bg-secondary border-2 border-dark-accent p-[3px] rounded-xl flex items-center justify-center">
  <div
    className="bg-secondary rounded-lg flex items-center justify-center px-4 py-3 text-xl text-text font-nueu font-bold 
              hover:bg-dark-accent cursor-pointer select-none "
  >
    {children}
  </div>
</div> */
}
