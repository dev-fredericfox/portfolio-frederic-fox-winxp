"use client";
import { WindowManagerProvider } from "@/components/context-providers/WindowManagerProvider";
import Desktop from "@/components/window/Desktop";

export default function Page() {
	return (
		<WindowManagerProvider>
			<Desktop />
		</WindowManagerProvider>
	);
}
