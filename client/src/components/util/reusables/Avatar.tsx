import { ReactNode } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";

interface AvatarProps {
  children?: ReactNode;
  rot: number;
  disabled: boolean;
  color: string;
  value: string | null;
  setValue?: React.Dispatch<React.SetStateAction<string | null>>;
}

function Avatar({
  children,
  rot,
  disabled,
  color,
  value,
  setValue,
}: AvatarProps) {
  return (
    <>
      <div className="flex items-center justify-center rounded-full p-1 bg-background border-4 border-primary">
        <div
          className={
            "relative flex size-48 items-center justify-center rounded-full border-2 border-primary sm:size-64"
          }
          style={{ backgroundColor: color }}
        >
          <textarea
            maxLength={3}
            spellCheck={false}
            disabled={disabled}
            autoFocus
            value={value ?? ""}
            onChange={(event) => {
              if (setValue !== undefined)
                setValue(event.target.value === "" ? null : event.target.value);
            }}
            className={
              "h-48 w-52 select-none resize-none items-center bg-transparent p-8 text-center font-sans text-8xl" +
              " " +
              "text-black focus:outline-0" +
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
      </div>
    </>
  );
}

export function AvatarMedium({
  children,
  value,
  rot,
  disabled,
  color,
}: AvatarProps) {
  return (
    <>
      <div
        className={
          "relative flex size-32 items-center justify-center rounded-full border-2 border-primary"
        }
        style={{ backgroundColor: color }}
      >
        <textarea
          maxLength={3}
          spellCheck={false}
          disabled={disabled}
          defaultValue={value ?? ""}
          autoFocus
          className={
            "h-20 w-[6.5rem] scale-125 select-none resize-none items-center bg-transparent text-center font-sans" +
            " " +
            "text-6xl text-black focus:outline-0" +
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
  value,
  rot,
  disabled,
  color,
}: AvatarProps) {
  return (
    <>
      <div
        className={
          "relative flex size-12 items-center justify-center rounded-full border-2 border-primary"
        }
        style={{ backgroundColor: color }}
      >
        <textarea
          maxLength={3}
          spellCheck={false}
          disabled={disabled}
          defaultValue={value ?? ""}
          autoFocus
          className={
            "h-10 w-[2.5rem] scale-125 select-none resize-none items-center bg-transparent p-[0.2rem] " +
            " " +
            "text-center font-sans text-xl text-black focus:outline-0" +
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

export function ColorPicker({
  avatarColor,
  setAvatarColor,
  className,
}: {
  avatarColor: string;
  setAvatarColor: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
}) {
  return (
    <div
      className={
        "flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-accent bg-background/90 p-5  backdrop-blur-md" +
        " " +
        (className ?? "")
      }
    >
      <HexColorPicker color={avatarColor} onChange={setAvatarColor} />
      <HexColorInput
        color={avatarColor}
        className="h-10 border-b-2 border-accent bg-inherit px-2 text-text"
        onChange={setAvatarColor}
      />
    </div>
  );
}

export default Avatar;
