import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ClientDesktopProjectsProps, ClientProjectsProps } from "./shared-types";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// Type guard to check placement
export function isDesktopPlacement(props: ClientProjectsProps): props is ClientDesktopProjectsProps {
	return props.placement === "desktop";
}
