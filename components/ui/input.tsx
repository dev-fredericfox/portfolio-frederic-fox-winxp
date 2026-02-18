import * as React from "react";

import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const inputVariants = cva("", {
	variants: {
		variant: {
			default: cn(
				"file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
				"focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
				"aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
			),
			winXPOneLine: cn("relative z-2", "bg-[rgb(252,252,254)]", "border border-[rgb(145,155,156)]", "px-1 py-0.5", "outline-none", "w-60", "select-invert"),
		},
	},
	defaultVariants: {
		variant: "winXPOneLine",
	},
});

function Input({ className, variant, type, ...props }: React.ComponentProps<"input"> & { variant?: "default" | "winXPOneLine" }) {
	return <input type={type} data-slot="input" className={cn(inputVariants({ variant }), className)} {...props} />;
}

export { Input };
