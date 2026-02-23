"use client";
import { useMemo } from "react";
import { WindowMetaData } from "@/lib/WindowMetaData";
import { ReadMeContent } from "./ReadMeContent";
import { WindowLauncherIcon } from "@/components/molecules/WindowLauncherIcon";
import { ClientProjectsProps } from "@/lib/shared-types";
import InertFileDropdown from "@/components/molecules/InertFileDropdown";
import { envs } from "@/lib/envs";

export default function ReadMeIcon(props: ClientProjectsProps) {
	const windowMetaData = useMemo(
		() =>
			new WindowMetaData({
				name: "read-me",
				title: "Read Me",
				iconUrl: `${envs.NEXT_PUBLIC_BASE_PATH}/app-icons/generic_text_document.png`,
				component: <ReadMeContent />,
				initialWindowHeight: "small",
				initialWindowWidth: "small",
			}),
		[],
	);
	return <WindowLauncherIcon {...props} windowMetaData={windowMetaData} dropdownComponent={<InertFileDropdown />} />;
}
