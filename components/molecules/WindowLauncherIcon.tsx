"use client";

import { DesktopIcon } from "@/components/atoms/DesktopIcon";
import { StartMenuItem } from "@/components/atoms/StartMenuItem";
import { useWindowManager } from "@/components/context-providers/WindowManagerProvider";
import { isDesktopPlacement } from "@/lib/utils";
import { WindowMetaData } from "@/lib/WindowMetaData";
import { ClientProjectsProps } from "@/lib/shared-types";
import { useCallback, useMemo, useState } from "react";
import { ContextMenu, ContextMenuTrigger } from "../ui/context-menu";

type WindowLauncherIconProps = ClientProjectsProps & {
	windowMetaData: WindowMetaData;
	dropdownComponent?: React.ReactNode;
};

export function WindowLauncherIcon(props: WindowLauncherIconProps) {
	const placement = props.placement ?? "desktop";
	const { addWindow, updateZIndex } = useWindowManager();
	const [isOpen, setIsOpen] = useState(false);

	/** Ensure we keep a stable instance even if parent passes a newly constructed object. */
	const windowMetaData = useMemo(() => props.windowMetaData, [props.windowMetaData]);

	const open = useCallback(() => {
		/** undo minimized window if already "open" */
		if (isOpen) {
			updateZIndex(windowMetaData);
		}
		setIsOpen(true);
		addWindow(windowMetaData);
	}, [addWindow, windowMetaData, isOpen, updateZIndex]);

	if (placement === "start-menu" && !isDesktopPlacement(props)) {
		const { closeStartMenuCb } = props;

		const openAndCloseStartMenu = () => {
			open();
			closeStartMenuCb();
		};

		return (
			<StartMenuItem
				onOpen={openAndCloseStartMenu}
				label={windowMetaData.title}
				tagLine={windowMetaData.tagLine}
				imageAlt={`${windowMetaData.title} Icon`}
				imageTitle={windowMetaData.title}
				imageUrl={windowMetaData.iconUrl ?? ""}
				iconComponent={windowMetaData.iconComponent}
			/>
		);
	}

	if (placement === "desktop" && isDesktopPlacement(props)) {
		return (
			<ContextMenu>
				<div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
					<ContextMenuTrigger>
						<DesktopIcon
							onOpen={open}
							id={windowMetaData.id}
							windowMetaData={windowMetaData}
							label={windowMetaData.fileName ?? windowMetaData.title}
							imageAlt={`${windowMetaData.title} Icon`}
							imageTitle={windowMetaData.title}
							imageUrl={windowMetaData.iconUrl}
							iconsComponent={windowMetaData.iconComponent}
						/>
					</ContextMenuTrigger>
					{props.dropdownComponent}
				</div>
			</ContextMenu>
		);
	}
}
