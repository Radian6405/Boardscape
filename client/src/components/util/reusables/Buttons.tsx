import { MouseEventHandler, ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export function DoubleOutlineButton({ children, onClick }: ButtonProps) {
  return (
    <>
      <div
        className="flex cursor-pointer  select-none items-center justify-center rounded-lg  bg-secondary px-4 py-3 font-nueu 
                   text-xl font-bold text-text ring-2 ring-dark-accent ring-offset-2 ring-offset-secondary hover:bg-dark-accent"
        onClick={onClick}
      >
        {children}
      </div>
    </>
  );
}

export function SolidButton({ children, onClick }: ButtonProps) {
  return (
    <div
      className="flex min-w-44 cursor-pointer select-none items-center justify-center rounded-xl bg-primary px-6 py-4 font-nueu text-3xl 
                font-bold text-text hover:bg-accent"
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export function HollowButton({ children }: { children: ReactNode }) {
  return (
    <div
      className="flex min-w-44 cursor-pointer select-none items-center justify-center rounded-xl bg-secondary px-6 py-4 font-nueu text-3xl 
                font-bold text-text hover:bg-accent "
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
