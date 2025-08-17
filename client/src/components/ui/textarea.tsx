import * as React from "react";

import { cn } from "@/lib/utils";
import { useController, type Control } from "react-hook-form";
type TextAreaProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, any>;
  name: string;
} & React.ComponentProps<"textarea">;
function Textarea({ className, control, name, ...props }: TextAreaProps) {
  const {
    field: { onChange, onBlur, value },
  } = useController({
    control,
    name,
  });
  return (
    <textarea
      data-slot="textarea"
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      id={name}
      name={name}
      className={cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
