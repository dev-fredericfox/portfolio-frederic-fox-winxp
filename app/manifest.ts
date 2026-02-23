import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "Frederic Fox CV PWA",
		short_name: "FredericFoxCV",
		description: "A Windows XP inspired CV website for Frederic Fox, showcasing skills and experience in a nostalgic interface.",
		start_url: "/",
		display: "standalone",
		background_color: "#345dd5",
		theme_color: "#345dd5",
		icons: [
			{
				src: "https://www.rw-designer.com/icon-view/18835.png",
				sizes: "192x192",
				type: "image/png",
			},
			{
				src: "https://www.rw-designer.com/icon-view/18835.png",
				sizes: "512x512",
				type: "image/png",
			},
		],
	};
}
