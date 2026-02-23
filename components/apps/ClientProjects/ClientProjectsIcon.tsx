"use client";
import { useMemo } from "react";
import { WindowMetaData } from "@/lib/WindowMetaData";
import { ClientProjectsContent } from "./ClientProjectsContent";
import { WindowLauncherIcon } from "@/components/molecules/WindowLauncherIcon";
import { ClientProjectsProps } from "@/lib/shared-types";
import InertFileDropdown from "@/components/molecules/InertFileDropdown";

export default function ClientProjects(props: ClientProjectsProps) {
	const windowMetaData = useMemo(
		() =>
			new WindowMetaData({
				name: "client-projects",
				title: "Client Projects",
				iconUrl: "/app-icons/folder.png",
				component: <ClientProjectsContent />,
				initialWindowHeight: "small",
				initialWindowWidth: "medium",
			}),
		[],
	);
	return <WindowLauncherIcon {...props} windowMetaData={windowMetaData} dropdownComponent={<InertFileDropdown />} />;
}
