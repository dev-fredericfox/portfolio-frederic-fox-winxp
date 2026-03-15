"use client";
import { DesktopIcon } from "@/components/atoms/DesktopIcon";
import { envs } from "@/lib/envs";

export default function ClassicCVIcon() {
	const imageUrl = `${envs.NEXT_PUBLIC_BASE_PATH}/app-icons/printer.png`;
	const imageAlt = "Resume Printout";
	const imageTitle = "Resume Printout";
	const label = "Resume Printout";
	return (
		<div>
			<div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
				<DesktopIcon
					onOpen={() => {
						window.open("/resume", "_blank");
					}}
					id="classic-cv"
					windowMetaData={null}
					label={label}
					imageAlt={imageAlt}
					imageTitle={imageTitle}
					imageUrl={imageUrl}
				/>
			</div>
		</div>
	);
}
