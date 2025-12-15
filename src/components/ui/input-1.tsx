import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-[#FFF5FA] selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border  bg-[#FFF5FA] px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-1 focus:bg-[#FFF5FA] focus-visible:bg-[#FFF5FA]",
        "hover:bg-[#FFF5FA]",
        "autofill:bg-[#FFF5FA] autofill:shadow-[inset_0_0_0px_1000px_#FFF5FA]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  );
}

export { Input };
