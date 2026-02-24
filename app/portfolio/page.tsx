import { WindowManagerProvider } from "@/components/context-providers/WindowManagerProvider";
import Desktop from "@/components/window/Desktop";

export const metadata = {
	title: "Frederic Fox's Portfolio | Desktop",
	description: "Frederic Fox's Software Developer Portfolio.",
	appleMobileWebApp: {
		capable: true,
		title: "Frederic Fox's Portfolio | Desktop",
		statusBarStyle: "black-translucent",
	},
};

export default function Page() {
	return (
		<WindowManagerProvider>
			<Desktop />
		</WindowManagerProvider>
	);
}
