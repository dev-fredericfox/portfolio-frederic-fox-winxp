"use client";

import { WindowMetaData } from "@/lib/WindowMetaData";
import { ClientProjectsProps } from "@/lib/shared-types";
import { useEffect, useMemo } from "react";
import { WindowLauncherIcon } from "@/components/molecules/WindowLauncherIcon";
import NotepadContent from "./NotepadContent";

type NotepadIconProps = ClientProjectsProps & {
	fileName?: string;
};
export default function NotepadIcon(props: NotepadIconProps) {
	const fileName = props.fileName ?? "Untitled.txt";
	const windowMetaData = useMemo(
		() =>
			new WindowMetaData({
				name: "notepad",
				title: "Notepad",
				tagLine: "Simple Text Editor",
				iconUrl: "/app-icons/notepad.png",
				component: null,
				initialWindowHeight: "small",
				initialWindowWidth: "smallDynamic",
				fileName: fileName,
			}),
		[fileName],
	);
	useEffect(() => {
		windowMetaData.component = <NotepadContent fileName={fileName} windowMetaData={windowMetaData} />;
	}, [fileName, windowMetaData]);
	return <WindowLauncherIcon {...props} windowMetaData={windowMetaData} />;
}
