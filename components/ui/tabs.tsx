"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
	return <TabsPrimitive.Root data-slot="tabs" className={cn("flex flex-col", className)} {...props} />;
}

function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
	return (
		<TabsPrimitive.List
			data-slot="tabs-list"
			className={cn(
				// XP tabstrip: no rounded "pill" container; small left inset; sits above panel
				"relative z-10 flex w-fit items-end gap-0",
				"m-0 -mb-0.5 pl-0.75",
				"bg-transparent p-0",
				className
			)}
			{...props}
		/>
	);
}

function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
	return (
		<TabsPrimitive.Trigger
			data-slot="tabs-trigger"
			className={cn(
				// Base tab shape
				"relative inline-flex select-none items-center justify-center whitespace-nowrap",
				"rounded-t-[3px]",
				"px-3 pt-1 pb-1.5",
				"text-[13px] leading-none text-[#222]",
				// Inactive tab background + border (XP-ish grey/blue)
				"bg-[rgb(236,236,236)]",
				"border-x border-t border-[rgb(145,155,156)]",
				"shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]",
				// Slight overlap between tabs
				"-ml-0.75 first:ml-0 z-1",
				// Focus ring like classic dotted outline
				"focus-visible:outline-1 focus-visible:outline-dotted focus-visible:outline-[#222] focus-visible:-outline-offset-4",
				// Hover: brighten slightly
				"hover:bg-[rgb(242,242,242)]",
				// Active tab: lifts up, sits above others and above panel border
				"data-[state=active]:z-8 data-[state=active]:bg-[rgb(252,252,254)] data-[state=active]:-mt-0.5 data-[state=active]:pb-2 data-[state=active]:border-t data-[state=active]:border-t-[rgb(230,139,44)]",
				// Active tab subtle inner yellow-ish highlight
				"data-[state=active]:shadow-[inset_0_2px_0_rgba(255,199,60,0.85),inset_0_1px_0_rgba(255,255,255,0.9)]",
				// Bottom edge trick: active tab should visually merge into panel
				// We add a 1px 'cap' that matches the panel background to cover the panel border underneath.
				"data-[state=active]:after:content-['']",
				"data-[state=active]:after:absolute data-[state=active]:after:left-0 data-[state=active]:after:right-0",
				"data-[state=active]:after:-bottom-px data-[state=active]:after:h-0.5",
				"data-[state=active]:after:bg-[rgb(252,252,254)]",

				// Disabled
				"disabled:opacity-60 disabled:pointer-events-none",

				className
			)}
			{...props}
		/>
	);
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
	return (
		<TabsPrimitive.Content
			data-slot="tabs-content"
			className={cn(
				// XP panel: padded, bordered, sits under the active tab
				"relative z-2",
				"bg-[rgb(252,252,254)]",
				"border border-[rgb(145,155,156)]",
				"p-3.5",
				"outline-none",
				className
			)}
			{...props}
		/>
	);
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
