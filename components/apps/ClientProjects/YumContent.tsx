import { envs } from "@/lib/envs";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function YumContent() {
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
			)}>
			{/* Header row: logos + classification */}
			<div className="flex items-start justify-between gap-4">
				<div className="flex items-center gap-3">
					{/* Replace these paths with your actual assets */}
					<Image
						src={`${envs.NEXT_PUBLIC_BASE_PATH}/app-icons/YUM-Logo-rgb_M_color.svg`}
						alt="Yum GmbH Logo"
						className="h-9 w-auto"
						draggable={false}
						width={120}
						height={120}
					/>
				</div>

				<div className="text-right">
					<div className="inline-flex flex-col items-end gap-1">
						<div className="text-[11px] tracking-wide">DOC ID: YUM-OPS-REPORT-004</div>
						<div className="relative"></div>
						<div className="text-[11px]">DISTRIBUTION: PUBLIC</div>
					</div>
				</div>
			</div>

			<hr className="my-3 border-[#7F9DB9]" />
			<div className="w-full text-right mb-4">
				<p>Frankfurt, Germany 2024 - Current</p>
			</div>
			{/* Notepad-style text body */}
			<div className="whitespace-pre-wrap">
				{`Yum GmbH
===============================

CLIENT
--------
Yum Gmbh is a digital agency based in Germany, specializing in creating innovative web solutions for clients across various industries.

PROJECTS
--------
1) Typescript Transition
2) Moco Google Chrome Extension
3) Google Sheets App
4) Payload CMS Plugins

1) TYPESCRIPT TRANSITION
---------------
- Lead the migration of some codebases from JavaScript to TypeScript, enhancing code quality and maintainability.
- Trained team members on TypeScript best practices and implementation strategies.
- Consulted team on type safety and code architecture to ensure a smooth transition and high quality new code.

2) MOCO GOOGLE CHROME EXTENSION
---------------
- Forked and customized an existing open-source Chrome extension for Moco, a project management tool, to better fit the agency's workflow.
- Reduced erroneously tracked time entries by implementing features that sync with Trello tickets
- Increased report creation speed and convenience by integrating with more trello data.

3) GOOGLE SHEETS APP
---------------
- Created a google sheets app using Google Apps Script to automate data reporting tasks.
- Improved data accuracy and reduced manual effort by automating data retrieval and processing.

4) PAYLOAD CMS PLUGINS
---------------
- Developed multiple plugins for Payload CMS to extend its core functionality.
- Enhanced user experience and content management efficiency for clients using Payload CMS.
`}
			</div>
		</div>
	);
}
