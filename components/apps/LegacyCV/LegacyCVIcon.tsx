"use client";
import { DesktopIcon } from "@/components/atoms/DesktopIcon";

export default function LegacyCVIcon() {
	const imageUrl = "/app-icons/internet_explorer.png";
	const imageAlt = "Legacy CV Icon";
	const imageTitle = "Legacy CV";
	const label = "Legacy Website";
	return (
		<div>
			<div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
				<DesktopIcon
					onOpen={() => {
						window.open("https://www.frederic-fox.com", "_blank");
					}}
					id="legacy-cv"
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
