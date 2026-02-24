import { cn } from "@/lib/utils";
import Image from "next/image";

export function BrickwiseContent() {
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
						src="https://cdn.prod.website-files.com/62414ac6ad5d1a1acc6c486a/62414ac6ad5d1aceab6c49c4_brickwise_logo.svg"
						alt="Brickwise GmbH Logo"
						className="h-9 w-auto"
						draggable={false}
						width={120}
						height={120}
					/>
				</div>

				<div className="text-right">
					<div className="inline-flex flex-col items-end gap-1">
						<div className="text-[11px] tracking-wide">DOC ID: BRICK-OPS-REPORT-005</div>
						<div className="relative"></div>
						<div className="text-[11px]">DISTRIBUTION: PUBLIC</div>
					</div>
				</div>
			</div>

			<hr className="my-3 border-[#7F9DB9]" />
			<div className="w-full text-right mb-4">
				<p>Vienna, Austria 2022 - 2023</p>
			</div>
			{/* Notepad-style text body */}
			<div className="whitespace-pre-wrap">
				{`Brickwise GmbH
===============================

CLIENT
--------
Brickwise is a proptech company that provides a platform for real estate investors to access fractional ownership of real estate assets with blockchain technology.

OVERVIEW
--------
Fullstack TypeScript Development with MongoDB, Express, React, and Node.js (MERN).

PROJECTS
--------
- Implemented automations for key processes, including PDF generation for contracts, enhancing operational efficiency.
- Developed robust tax computations and automated tax filing systems for Austria and Germany.
- Wrote and improved automated tests with Jest, enhancing system stability and reliability.
- Worked on several internal packages for shared validation and reusable utility functions across our code base.
- Programmed the customer-facing platform with React & Material UI.
`}
			</div>
		</div>
	);
}
