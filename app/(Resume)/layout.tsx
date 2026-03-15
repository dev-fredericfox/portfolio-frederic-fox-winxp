import type { Viewport } from "next";
import { Geist, Geist_Mono, Libre_Franklin, Signika } from "next/font/google";
import "../globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

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
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
		</html>
	);
}
