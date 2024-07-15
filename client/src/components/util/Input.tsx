import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { useState } from "react";

interface InputProps {
  placeholder: string;
  value: string | null;
  setValue: React.Dispatch<React.SetStateAction<string | null>>;
}

export function TextInput({ placeholder, value, setValue }: InputProps) {
  return (
    <input
      type="text"
      className="h-14 w-72 border-b-2 border-accent bg-transparent p-2 text-xl text-text
                    focus:outline-0 "
      value={value ?? ""}
      onChange={(event) => setValue(event.target.value)}
      placeholder={placeholder}
    />
  );
}
export function PasswordInput({ placeholder, value, setValue }: InputProps) {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          className="h-14 w-72 border-b-2 border-accent bg-transparent p-2 text-xl text-text
        focus:outline-0 "
          value={value ?? ""}
          onChange={(event) => setValue(event.target.value)}
          placeholder={placeholder}
        />
        <div
          className="absolute right-0 top-[20%] flex size-10 items-center justify-center text-text"
          onClick={() => setShow(!show)}
        >
          {show ? (
            <IconEyeOff className="size-8" stroke={2} />
          ) : (
            <IconEye className="size-8" stroke={2} />
          )}
        </div>
      </div>
    </>
  );
}
