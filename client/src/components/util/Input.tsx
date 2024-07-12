import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { useState } from "react";

export function TextInput({ placeholder }: { placeholder: string }) {
  return (
    <input
      type="text"
      className="h-14 w-72 border-b-2 border-accent bg-transparent p-2 text-xl text-text
                    focus:outline-0 "
      placeholder={placeholder}
    />
  );
}
export function PasswordInput({ placeholder }: { placeholder: string }) {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          className="h-14 w-72 border-b-2 border-accent bg-transparent p-2 text-xl text-text
        focus:outline-0 "
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
