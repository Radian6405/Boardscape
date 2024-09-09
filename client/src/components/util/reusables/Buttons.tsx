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
          (sizeClass ??
            "text-md px-3 py-2 sm:px-4 sm:text-xl md:px-6 md:text-3xl lg:text-4xl lg:py-3 lg:px-7") +
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
          "flex cursor-pointer select-none items-center justify-center rounded-md bg-primary font-nueu" +
          " " +
          "font-bold text-text hover:bg-accent" +
          " " +
          "sm:rounded-lg md:rounded-xl" +
          " " +
          (minWidth && "min-w-16 sm:min-w-24 md:min-w-36 lg:min-w-44 ") +
          " " +
          (sizeClass ??
            "text-md p-2 sm:text-2xl md:p-4 md:text-3xl lg:text-4xl") +
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

export function HollowButton({
  children,
  className,
  sizeClass,
  minWidth,
}: ButtonProps) {
  return (
    <div
      className={
        "flex cursor-pointer select-none items-center justify-center rounded-md bg-secondary font-nueu" +
        " " +
        "font-bold text-text hover:bg-accent" +
        " " +
        "sm:rounded-lg md:rounded-xl" +
        " " +
        (minWidth && "min-w-16 sm:min-w-24 md:min-w-36 lg:min-w-44 ") +
        " " +
        (sizeClass ??
          "text-md p-2 sm:text-2xl md:p-4 md:text-3xl lg:text-4xl") +
        " " +
        className
      }
    >
      {children}
    </div>
  );
}
