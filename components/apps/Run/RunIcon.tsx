"use client";
import { useMemo } from "react";
import { WindowMetaData } from "@/lib/WindowMetaData";
import RunContent from "./RunContent";
import { WindowLauncherIcon } from "@/components/molecules/WindowLauncherIcon";
import { ClientProjectsProps } from "@/lib/shared-types";
import { AppWindow } from "lucide-react";

export default function RunIcon(props: ClientProjectsProps) {
	const windowMetaData = useMemo(
		() =>
			new WindowMetaData({
				name: "run",
				title: "Run",
				iconComponent: <AppWindow size={28} />,
				component: <RunContent />,
				initialWindowHeight: "small",
				initialWindowWidth: "small",
			}),
		[],
	);
	return <WindowLauncherIcon {...props} windowMetaData={windowMetaData} />;
}
