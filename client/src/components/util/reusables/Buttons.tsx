import { MouseEventHandler, ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement>;
  className?: string;
  sizeClass?: string;
  minWidth?: boolean;
}

export function DoubleOutlineButton({
  children,
  onClick,
  className,
  sizeClass,
}: ButtonProps) {
  return (
    <>
      <div
        className={
          "flex cursor-pointer select-none items-center justify-center rounded-lg  bg-secondary font-nueu" +
          " " +
          "font-bold text-text ring-2 ring-dark-accent ring-offset-2 ring-offset-secondary hover:bg-dark-accent" +
          " " +
          (sizeClass ?? "px-4 py-3 text-xl") +
          " " +
          className
        }
        onClick={onClick}
      >
        {children}
      </div>
    </>
  );
}

export function SolidButton({
  children,
  onClick,
  className,
  sizeClass,
  minWidth,
}: ButtonProps) {
  return (
    <div className="flex">
      <div
        className={
          "flex cursor-pointer select-none items-center justify-center rounded-xl bg-primary px-6 py-4 font-nueu" +
          " " +
          "font-bold text-text hover:bg-accent" +
          " " +
          (minWidth && "min-w-44") +
          " " +
          (sizeClass ?? "text-3xl") +
          " " +
          className
        }
        onClick={onClick}
      >
        {children}
      </div>
    </div>
  );
}

export function HollowButton({ children, className, sizeClass }: ButtonProps) {
  return (
    <div
      className={
        "flex cursor-pointer select-none items-center justify-center rounded-xl bg-secondary font-nueu" +
        " " +
        "font-bold text-text hover:bg-accent" +
        " " +
        (sizeClass ?? "px-6 py-4 text-3xl") +
        " " +
        className
      }
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
