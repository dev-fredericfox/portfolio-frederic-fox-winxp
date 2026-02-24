"use client";
import { useMemo } from "react";
import { WindowMetaData } from "@/lib/WindowMetaData";
import { WindowLauncherIcon } from "@/components/molecules/WindowLauncherIcon";
import { ClientProjectsProps } from "@/lib/shared-types";
import { HeartHandshake } from "lucide-react";
import { SourcesContent } from "./SourcesContent";
import InertFileDropdown from "@/components/molecules/InertFileDropdown";

export default function SourcesIcon(props: ClientProjectsProps) {
	const windowMetaData = useMemo(
		() =>
			new WindowMetaData({
				name: "sources",
				title: "Sources",
				iconComponent: <HeartHandshake size={28} />,
				component: <SourcesContent />,
				initialWindowHeight: "small",
				initialWindowWidth: "small",
			}),
		[],
	);
	return <WindowLauncherIcon {...props} windowMetaData={windowMetaData} dropdownComponent={<InertFileDropdown />} />;
}
