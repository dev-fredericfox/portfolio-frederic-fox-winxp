"use client";

import { useEffect, useMemo } from "react";
import { WindowMetaData } from "@/lib/WindowMetaData";
import WebampWindowContent from "./WebampWindowContent";
import { ClientProjectsProps } from "@/lib/shared-types";
import { WindowLauncherIcon } from "@/components/molecules/WindowLauncherIcon";

export default function WebampIcon(props: ClientProjectsProps) {
	const windowMetaData = useMemo(
		() =>
			new WindowMetaData({
				name: "webamp-window",
				title: "Webamp",
				tagLine: "Classic Winamp in React",
				iconUrl: "/webamp/winamp2-32x32.png",
				initialWindowHeight: "medium",
				initialWindowWidth: "medium",
				overrideWindowComponent: "unstyled",
			}),
		[],
	);

	// Attach content after instantiation so we can pass the same metadata instance in.
	useEffect(() => {
		windowMetaData.component = <WebampWindowContent windowName={windowMetaData.name} windowMetaData={windowMetaData} />;
	}, [windowMetaData]);

	return <WindowLauncherIcon {...props} windowMetaData={windowMetaData} />;
}
