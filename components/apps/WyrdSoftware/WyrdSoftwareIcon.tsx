"use client";
import { DesktopIcon } from "@/components/atoms/DesktopIcon";
import { envs } from "@/lib/envs";

export default function WyrdSoftwareIcon() {
	const imageUrl = `${envs.NEXT_PUBLIC_BASE_PATH}/app-icons/WyrdLogo_alpha_round.svg`;
	const imageAlt = "Wyrd Software Icon";
	const imageTitle = "WyrdSoftware";
	const label = "WyrdSoftware";
	return (
		<div>
			<div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
				<DesktopIcon
					onOpen={() => {
						window.open("https://www.wyrdsoftware.com", "_blank");
					}}
					id="wyrd-software"
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
