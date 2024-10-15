import { ReactNode } from "react";

interface AvatarProps {
  children?: ReactNode;
  text: string;
  rot: number;
  disabled: boolean;
  color?: string;
  value?: string | null;
  setValue?: React.Dispatch<React.SetStateAction<string | null>>;
}

function Avatar({
  children,
  text,
  rot,
  disabled,
  color,
  value,
  setValue,
}: AvatarProps) {
  return (
    <>
      <div
        className={
          "relative flex size-48 items-center justify-center rounded-full border-2 border-primary bg-transparent sm:size-64"
        }
      >
        <textarea
          maxLength={3}
          spellCheck={false}
          disabled={disabled}
          defaultValue={text}
          autoFocus
          value={value ?? ""}
          onChange={(event) => {
            if (setValue !== undefined)
              setValue(event.target.value === "" ? null : event.target.value);
          }}
          className={
            "my-2 h-48 w-52 select-none resize-none items-center bg-transparent pb-8 pt-12 text-center font-nueu text-8xl text-text focus:outline-0" +
            " " +
            "sm:scale-125" +
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

export function AvatarMedium({
  children,
  text,
  rot,
  disabled,
  color,
}: AvatarProps) {
  return (
    <>
      <div
        className={
          "relative flex size-32 items-center justify-center rounded-full border-2 border-primary bg-transparent"
        }
      >
        <textarea
          maxLength={3}
          spellCheck={false}
          disabled={disabled}
          defaultValue={text}
          autoFocus
          className={
            "my-3 h-20 w-[6.5rem] scale-125 select-none resize-none items-center bg-transparent py-2 text-center font-nueu text-6xl text-text focus:outline-0" +
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
export function AvatarSmall({
  children,
  text,
  rot,
  disabled,
  color,
}: AvatarProps) {
  return (
    <>
      <div
        className={
          "relative flex size-12 items-center justify-center rounded-full border-2 border-primary bg-transparent"
        }
      >
        <textarea
          maxLength={3}
          spellCheck={false}
          disabled={disabled}
          defaultValue={text}
          autoFocus
          className={
            "h-10 w-[2.5rem] scale-125 select-none resize-none items-center bg-transparent pb-[0.25rem] pt-[0.375rem] text-center font-nueu text-xl text-text focus:outline-0" +
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
