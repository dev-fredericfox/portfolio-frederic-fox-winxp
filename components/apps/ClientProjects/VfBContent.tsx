import { cn } from "@/lib/utils";
import Image from "next/image";

export function VFBContent() {
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
				"overflow-x-scroll",
			)}>
			<div className="flex items-start justify-between gap-4">
				<div className="flex items-center gap-3">
					<Image
						src="https://upload.wikimedia.org/wikipedia/commons/e/eb/VfB_Stuttgart_1893_Logo.svg"
						alt="VfB Stuttgart"
						className="h-9 w-auto"
						draggable={false}
						width={330 * 2}
						height={100 * 2}
					/>
					<Image
						src="https://l4wlsi8vxy8hre4v.public.blob.vercel-storage.com/PayloadLogoBlack.svg"
						alt="Payload CMS"
						className="h-7 w-auto opacity-90"
						draggable={false}
						width={330 * 2}
						height={100 * 2}
					/>
				</div>

				<div className="text-right">
					<div className="inline-flex flex-col items-end gap-1">
						<div className="text-[11px] tracking-wide">DOC ID: VFB-OPS-REPORT-002</div>
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
				<p>Stuttgart, Germany 2025 - Current</p>
			</div>
			{/* Notepad-style text body */}
			<div className="whitespace-pre-wrap">
				{`VfB Project
======================================

CLIENT
--------
The VfB is a German professional sports club based in Stuttgart, Baden-Württemberg. 
The club's football team is currently part of Germany's first division, the Bundesliga. VfB Stuttgart has won the national championship five times, most recently in 2006–07, the DFB-Pokal four times and the UEFA Intertoto Cup a record two times. In the all-time Bundesliga table the club sits in fourth place.

STATUS
------
Active development. A significant portion of scope remains undisclosed under NDA.
This document intentionally excludes proprietary details, partner names, and implementation specifics beyond approved disclosure.


OBJECTIVE (HIGH-LEVEL)
----------------------
Deliver a reliable platform layer that can ingest human generated content as well as ingest, normalize, and serve match-adjacent information in real or near real time, while maintaining strong access control, auditing, and operational observability.

ARCHITECTURE NOTES
------------------------------
Backend:
- Payload CMS as the core content and admin layer
- Service integrations for live match-related data flows
- Access control for journalists, editors, and technical staff
- Digital Asset Management (DAM) subsystem for media handling
- Custom Payload Plugin: AI Translation services for multi-language support

Frontend:
- Typescript, React + Next.js application
- Tailwind CSS for layout and utility styling
- shadcn/ui for component primitives and consistency
- Additional libraries/modules as needed (NDA-restricted specifics omitted)


SECURITY / COMPLIANCE
---------------------
- Documentation and access scopes
- Clear separation between public, internal, and restricted data surfaces


DELIVERABLES
----------------------------
- Backend foundation + CMS configuration in Payload
- Integration framework to connect live match-related services
- Frontend shell and core UI system (design tokens, components, layouts)
- Deployment-ready baseline (environments, CI hooks, and observability scaffolding)

DO NOT DISTRIBUTE.
`}
			</div>
		</div>
	);
}
