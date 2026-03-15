import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { libreFranklin, signika } from "@/app/(Desktop)/layout";

const buttonVariants = cva("", {
	variants: {
		variant: {
			start: [
				"bg-[linear-gradient(to_bottom,#5fcf2a_0%,#8af04b_8%,#4fbf1f_18%,#43b51a_75%,#2e7f0f_100%)]",
				"bg-no-repeat",
				"bg-center",
				"bg-cover",
				"rounded-tr-xl rounded-br-xl",
				"w-28 h-full",
				"text-white font-bold text-xl text-shadow-md italic",
				libreFranklin.className,
			].join(" "),
			system: [
				// layout/behavior
				"inline-flex items-center justify-center gap-2 whitespace-nowrap",
				"disabled:pointer-events-none disabled:opacity-50",
				"[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0",
				// typography
				"antialiased text-[16px] font-medium",
				signika.className,
				// base shape + border
				"rounded-[3px] border border-[#003c74]",
				// base gradient background (idle)
				"bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(236,235,229,1)_86%,rgba(216,208,196,1)_100%)]",
				// default: no shadow
				"shadow-none",
				// hover (only when not disabled)
				"enabled:hover:shadow-[inset_-1px_1px_#fff0cf,inset_1px_2px_#fdd889,inset_-2px_2px_#fbc761,inset_2px_-2px_#e5a01a]",
				// active
				"enabled:active:shadow-none",
				"enabled:active:bg-[linear-gradient(180deg,rgba(205,202,195,1)_0%,rgba(227,227,219,1)_8%,rgba(229,229,222,1)_94%,rgba(242,242,241,1)_100%)]",
				// focus
				"focus:outline-none",
				"focus:shadow-[inset_-1px_1px_#cee7ff,inset_1px_2px_#98b8ea,inset_-2px_2px_#bcd4f6,inset_1px_-1px_#89ade4,inset_2px_-2px_#89ade4]",
			].join(" "),
			technical: "",
			taskbar: [
				"bg-[#4C7FEB]",
				"data-[active=true]:bg-[#1E335E]",
				"bg-no-repeat",
				"bg-center",
				"bg-cover",
				"rounded-sm",
				"text-white font-semibold text-sm",
				"hover:bg-[#73a9f6]",
				"whitespace-nowrap overflow-hidden text-ellipsis",
			].join(" "),
			windowControl: ["flex items-center justify-center disabled:opacity-50"].join(" "),
		},
		size: {
			default: "h-9 px-4 py-2 has-[>svg]:px-3",
			sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
			lg: "h-10 px-6 has-[>svg]:px-4",
			"desktop-icon": "flex flex-col p-0 items-center",
			"icon-sm": "size-8 p-0",
			"icon-lg": "size-10 p-0",
			start: "pt-1",
			taskbar: "px-3 mt-1.5 h-7.5 flex items-center w-50 min-w-50",
			taskbarShort: "px-3 mt-1.5 h-7.5 flex items-center w-26 min-w-26 md:w-50 md:min-w-50 text-ellipsis",
			windowControl: "w-5 h-8",
		},
	},
	defaultVariants: {
		variant: "system",
		size: "default",
	},
});

function Button({
	className,
	size = "default",
	asChild = false,
	variant = "system",
	...props
}: React.ComponentProps<"button"> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
	}) {
	const Comp = asChild ? Slot : "button";

	return <Comp data-slot="button" data-size={size} className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
