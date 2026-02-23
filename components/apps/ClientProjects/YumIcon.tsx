import { DesktopIcon } from "@/components/atoms/DesktopIcon";
import { useRef, useState } from "react";
import { useWindowManager } from "@/components/context-providers/WindowManagerProvider";
import { WindowMetaData } from "@/lib/WindowMetaData";
import { YumContent } from "./YumContent";
import { envs } from "@/lib/envs";

export default function YumIcon() {
	const { addWindow } = useWindowManager();
	const [, setIsOpen] = useState(false);
	const windowMetaData = new WindowMetaData({
		name: "yum",
		title: "Yum GmbH",
		iconUrl: `${envs.NEXT_PUBLIC_BASE_PATH}/app-icons/yum.png`,
		component: <YumContent />,
	});
	const windowMetaDataRef = useRef<WindowMetaData | null>(windowMetaData);

	function open() {
		setIsOpen(true);
		if (!windowMetaDataRef.current) return;
		addWindow(windowMetaDataRef.current);
	}
	return (
		<div>
			<div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
				<DesktopIcon
					onOpen={open}
					id={windowMetaData.name}
					windowMetaData={windowMetaData}
					label={windowMetaData.title}
					imageAlt={`${windowMetaData.title} Icon`}
					imageTitle={windowMetaData.title}
					imageUrl={windowMetaData?.iconUrl ?? ""}
				/>
			</div>
		</div>
	);
}
