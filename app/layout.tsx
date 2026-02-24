import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Libre_Franklin, Noto_Sans, Pixelify_Sans, Signika } from "next/font/google";
import "./globals.css";
import { envs } from "@/lib/envs";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

/** The pixelated font used before. Leaving it here as reference, because it was hard to find. */
// export const pixelatedSans = Pixelify_Sans({
// 	variable: "--font-pixelated-sans",
// 	subsets: ["latin"],
// 	weight: ["400", "700"],
// });

export const libreFranklin = Libre_Franklin({
	variable: "--font-libre-franklin",
	subsets: ["latin"],
	weight: ["400", "700"],
	style: ["normal", "italic"],
});

export const signika = Signika({
	variable: "--font-signika",
	subsets: ["latin"],
	weight: ["400", "700"],
	style: ["normal"],
});

export const viewport: Viewport = {
	width: "device-width",
	height: "device-height",
	initialScale: 1,
	maximumScale: 1,
	viewportFit: "cover",
	themeColor: [
		{ media: "(prefers-color-scheme: dark)", color: "#0b0b0b" },
		{ media: "(prefers-color-scheme: light)", color: "#ffffff" },
	],
	colorScheme: "dark",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			style={{
				backgroundImage: `url(${envs.NEXT_PUBLIC_BASE_PATH}/win-xp-wallpaper.jpeg)`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
				backgroundColor: "#0b0b0b",
			}}>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen overflow-hidden bg-transparent`}>{children}</body>
		</html>
	);
}
