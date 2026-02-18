import { DesktopIcon } from "@/components/atoms/DesktopIcon";
import { useRef, useState } from "react";
import { useWindowManager } from "@/components/context-providers/WindowManagerProvider";
import { WindowMetaData } from "@/lib/WindowMetaData";
import { EFIContent } from "./EFIContent";

export default function EFI() {
	const { addWindow, selectedIconId, setSelectedIconId } = useWindowManager();
	const [, setIsOpen] = useState(false);
	const windowMetaData = new WindowMetaData({
		name: "efi",
		title: "Eintracht Frankfurt",
		iconUrl: "https://upload.wikimedia.org/wikipedia/de/3/32/Logo_Eintracht_Frankfurt_1998.svg",
		component: <EFIContent />,
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
					selectedId={selectedIconId}
					setSelectedId={setSelectedIconId}
					label={windowMetaData.title}
					imageAlt={`${windowMetaData.title} Icon`}
					imageTitle={windowMetaData.title}
					imageUrl={windowMetaData?.iconUrl ?? ""}
				/>
			</div>
		</div>
	);
}
