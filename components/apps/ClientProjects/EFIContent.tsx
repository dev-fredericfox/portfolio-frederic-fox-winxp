import { cn } from "@/lib/utils";
import Image from "next/image";

export function EFIContent() {
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
				"overflow-scroll",
				"overflow-x-scroll",
			)}>
			<div className="flex items-start justify-between gap-4">
				<div className="flex items-center gap-3">
					<Image
						src="https://upload.wikimedia.org/wikipedia/de/3/32/Logo_Eintracht_Frankfurt_1998.svg"
						alt="Eintracht Frankfurt"
						className="h-9 w-auto"
						draggable={false}
						width={330 * 2}
						height={100 * 2}
					/>
				</div>

				<div className="text-right">
					<div className="inline-flex flex-col items-end gap-1">
						<div className="text-[11px] tracking-wide">DOC ID: EFI-OPS-REPORT-001</div>
						<div className="relative">
							<div
								className="
										select-none
										rotate-[-8deg]
										border-2
										border-[#B00000]
										text-[#B00000]
										px-3
										py-1
										font-bold
										tracking-[0.2em]
										text-[12px]
										uppercase
									">
								CLASSIFIED
							</div>
						</div>
						<div className="text-[11px]">DISTRIBUTION: INTERNAL ONLY</div>
					</div>
				</div>
			</div>

			<hr className="my-3 border-[#7F9DB9]" />
			<div className="w-full text-right mb-4">
				<p>Frankfur, Germany 2024 - Current</p>
			</div>
			{/* Notepad-style text body */}
			<div className="whitespace-pre-wrap">
				{`Eintracht Frankfurt Intelligence - Football Analysis and Internal Reporting
===============================

CLIENT
--------
Eintracht Frankfurt is a professional football club based in Frankfurt, Germany, founded in 1899, competing in the Bundesliga, the top tier of German football.
During the 2024/2025 Bundesliga season, Eintracht Frankfurt secured a 3rd place finish.

OVERVIEW
--------
Eintracht Frankfurt Intelligence (EFI) is an internal analysis and intelligence platform focused on video analysis,
tactical, performance, and opposition analysis within professional football environments.

The platform aggregates video, data, and written analysis into a unified workflow intended for analysts, coaches,
and technical staff.

TECHNICAL STACK
---------------
- Frontend Framework : Typescript, React + Next.js
- Styling Framework    : Tailwind CSS
- UI Components        : shadcn/ui
- Video Playback         : Video.js

CORE FEATURES
-------------
- Match and opponent breakdowns
- Player-level video tagging and annotation
- Tactical phase analysis (in-possession / out-of-possession)
- Set-piece intelligence and pattern recognition
- Historical match archive with searchable metadata

NOTES
-----
This document represents a working concept. Features, scope, and tooling are subject to change
based on internal requirements and feedback.
`}
			</div>
		</div>
	);
}
