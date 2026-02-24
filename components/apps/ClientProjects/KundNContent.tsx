import { cn } from "@/lib/utils";
import Image from "next/image";

export function KundNContent() {
	return (
		<div
			className={cn(
				"bg-white",
				"border border-[#7F9DB9]",
				"p-4",
				"font-[Tahoma,Arial,sans-serif]",
				"text-[13px]",
				"leading-relaxed",
				"text-black",
				"w-full select-text",
				"overflow-x-auto",
			)}>
			<div className="flex items-start justify-between gap-4">
				<div className="flex items-center gap-3">
					<Image
						src="https://upload.wikimedia.org/wikipedia/commons/4/48/Koenig-Neurath_Logo.svg"
						alt="König & Neurath Logo"
						className="h-9 w-auto"
						draggable={false}
						width={330 * 2}
						height={100 * 2}
					/>
				</div>

				<div className="text-right">
					<div className="inline-flex flex-col items-end gap-1">
						<div className="text-[11px] tracking-wide">DOC ID: KUNDN-OPS-REPORT-003</div>
						<div className="relative"></div>
						<div className="text-[11px]">DISTRIBUTION: PUBLIC</div>
					</div>
				</div>
			</div>

			<hr className="my-3 border-[#7F9DB9]" />
			<div className="w-full text-right mb-4">
				<p>Karben, Germany 2025</p>
			</div>
			{/* Notepad-style text body */}
			<div className="whitespace-pre-wrap">
				{`König + Neurath
===============================

CLIENT
--------
König + Neurath AG is a manufacturer of office furniture, seating and room systems based in Karben.
König+Neurath is one of the highest-grossing German office furniture brands with around 900 employees 
and produces exclusively at its headquarters in Karben.

PROJECTS
--------
1) Style Finder
2) Work Culture Map


1) STYLE FINDER
---------------
A guided tool that asks a short series of multiple-choice questions and allows users to select preferred colors. 
An AI driven recommendation layer then determines which furniture line best matches the user’s style profile.

Tech:
- TypeScript, React, Next.js
- Tailwind CSS
- shadcn/ui
`}
				<p className="mt-3">
					Demo:{" "}
					<a className="text-blue-600 underline" href="https://tools.koenig-neurath.com/de/style-finder/willkommen" target="_blank" rel="noopener noreferrer">
						https://tools.koenig-neurath.com/de/style-finder/willkommen
					</a>
				</p>
				{`
2) WORK CULTURE MAP
-------------------
An interactive assessment designed to help employees identify and articulate the work culture they prefer. 
Outputs support internal alignment, discussions, and workplace design considerations.

Tech:
- TypeScript, React, Next.js
- Tailwind CSS
- shadcn/ui
`}
				<p className="mt-3">
					Demo:{" "}
					<a className="text-blue-600 underline" href="https://tools.koenig-neurath.com/de/work-culture-map/" target="_blank" rel="noopener noreferrer">
						https://tools.koenig-neurath.com/de/work-culture-map/
					</a>
				</p>
			</div>
		</div>
	);
}
