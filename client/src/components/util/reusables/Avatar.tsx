import { ReactNode } from "react";

interface AvatarProps {
  children: ReactNode;
  text: string;
  rot: number;
  disabled: boolean;
}

function Avatar({ children, text, rot, disabled }: AvatarProps) {
  return (
    <>
      <div className="relative flex size-64 items-center justify-center rounded-full border-2 border-primary bg-transparent">
        <textarea
          maxLength={3}
          spellCheck={false}
          disabled={disabled}
          defaultValue={text}
          autoFocus
          className={
            "my-8 h-48 w-64 scale-125 select-none resize-none items-center bg-transparent py-10 text-center font-nueu text-8xl text-text focus:outline-0" +
            " " +
            (rot === 0 ? "rotate-[0deg]" : "") +
            (rot === 90 ? "rotate-[90deg]" : "") +
            (rot === 180 ? "rotate-[180deg]" : "") +
            (rot === 270 ? "rotate-[270deg]" : "")
          }
        />
        {children}
      </div>
    </>
  );
}

export default Avatar;
