"use client";

import { WindowMetaData } from "@/lib/WindowMetaData";
import AboutMeContent from "./AboutMeContent";
import { ClientProjectsProps } from "@/lib/shared-types";
import { useMemo } from "react";
import { WindowLauncherIcon } from "@/components/molecules/WindowLauncherIcon";
import InertFileDropdown from "@/components/molecules/InertFileDropdown";
import { envs } from "@/lib/envs";

export default function AboutMeIcon(props: ClientProjectsProps) {
	const windowMetaData = useMemo(
		() =>
			new WindowMetaData({
				name: "about-me",
				title: "Frederic Fox",
				tagLine: "About Me",
				iconUrl: `${envs.NEXT_PUBLIC_BASE_PATH}/app-icons/fax_sender_information.png`,
				component: <AboutMeContent />,
				initialWindowHeight: "small",
				initialWindowWidth: "medium",
			}),
		[],
	);

	return <WindowLauncherIcon {...props} windowMetaData={windowMetaData} dropdownComponent={<InertFileDropdown />} />;
}
