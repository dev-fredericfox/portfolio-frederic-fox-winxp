import { DesktopIcon } from "@/components/atoms/DesktopIcon";
import { useRef, useState } from "react";
import { useWindowManager } from "@/components/context-providers/WindowManagerProvider";
import { WindowMetaData } from "@/lib/WindowMetaData";
import { KundNContent } from "./KundNContent";

export default function KundNIcon() {
	const { addWindow } = useWindowManager();
	const [, setIsOpen] = useState(false);
	const windowMetaData = new WindowMetaData({
		name: "KundN",
		title: "König + Neurath",
		iconUrl: "https://upload.wikimedia.org/wikipedia/commons/4/48/Koenig-Neurath_Logo.svg",
		component: <KundNContent />,
	});
	const windowMetaDataRef = useRef<WindowMetaData | null>(windowMetaData);

	function open() {
		setIsOpen(true);
		if (!windowMetaDataRef.current) return;
		addWindow(windowMetaDataRef.current);
	}
	return (
		<div>
			<div className="flex gap-8 flex-wrap mb-12">
				<DesktopIcon
					onOpen={open}
					id={windowMetaData.name}
					windowMetaData={windowMetaData}
					label={windowMetaData.title}
					imageUrl={windowMetaData?.iconUrl ?? ""}
					imageAlt={`${windowMetaData.title} Icon`}
					imageTitle={windowMetaData.title}
				/>
			</div>
		</div>
	);
}
