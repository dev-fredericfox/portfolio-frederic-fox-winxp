"use client";
import { DesktopIcon } from "@/components/atoms/DesktopIcon";
import { useRef, useState } from "react";
import { useWindowManager } from "@/components/context-providers/WindowManagerProvider";
import { WindowMetaData } from "@/lib/WindowMetaData";
import { BrickwiseContent } from "./BrickwiseContent";

export default function BrickwiseIcon() {
	const { addWindow } = useWindowManager();
	const [, setIsOpen] = useState(false);
	const windowMetaData = new WindowMetaData({
		name: "brickwise",
		title: "Brickwise",
		iconUrl: "https://cdn.prod.website-files.com/62414ac6ad5d1a1acc6c486a/62414ac6ad5d1aceab6c49c4_brickwise_logo.svg",
		component: <BrickwiseContent />,
		initialWindowHeight: "small",
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
