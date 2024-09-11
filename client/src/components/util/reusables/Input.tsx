import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { ReactNode, useState } from "react";

interface InputProps {
  placeholder: string;
  value: string | null;
  setValue: React.Dispatch<React.SetStateAction<string | null>>;
  children?: ReactNode;
}

export function TextInput({
  placeholder,
  value,
  setValue,
  children,
}: InputProps) {
  return (
    <>
      <div className="flex flex-col">
        <input
          type="text"
          className="h-10 w-48 border-b-2 border-accent bg-transparent p-2 text-base text-text
                    focus:outline-0 sm:h-12 sm:w-64 sm:text-lg md:h-14 md:w-72 md:text-xl"
          value={value ?? ""}
          onChange={(event) =>
            setValue(event.target.value === "" ? null : event.target.value)
          }
          placeholder={placeholder}
        />
        {children}
      </div>
    </>
  );
}
export function PasswordInput({
  placeholder,
  value,
  setValue,
  children,
}: InputProps) {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="relative flex flex-col ">
        <input
          type={show ? "text" : "password"}
          className="h-10 w-48 border-b-2 border-accent bg-transparent p-2 pr-10 text-base
                      text-text focus:outline-0 sm:h-12 sm:w-64 sm:text-lg md:h-14 md:w-72 md:text-xl"
          value={value ?? ""}
          onChange={(event) =>
            setValue(event.target.value === "" ? null : event.target.value)
          }
          placeholder={placeholder}
        />
        <div
          className="absolute right-0 top-0 flex h-full cursor-pointer items-center justify-center pr-1 text-text sm:pr-2"
          onClick={() => setShow(!show)}
        >
          {show ? (
            <IconEyeOff className="size-6 sm:size-8 md:size-9" stroke={2} />
          ) : (
            <IconEye className="size-6 sm:size-8 md:size-9" stroke={2} />
          )}
        </div>
        {children}
      </div>
    </>
  );
}
