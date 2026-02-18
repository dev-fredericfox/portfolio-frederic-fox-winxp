"use client";
import { DesktopIcon } from "@/components/atoms/DesktopIcon";

type ClientProjectsProps = {
	selectedId: string | null;
	setSelectedId: (id: string | null) => void;
};

export default function LegacyCVIcon({ selectedId, setSelectedId }: ClientProjectsProps) {
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
					selectedId={selectedId}
					setSelectedId={setSelectedId}
					label={label}
					imageAlt={imageAlt}
					imageTitle={imageTitle}
					imageUrl={imageUrl}
				/>
			</div>
		</div>
	);
}
