"use client";

import { WindowMetaData } from "@/lib/WindowMetaData";
import AboutMeContent from "./AboutMeContent";
import { ClientProjectsProps } from "@/lib/shared-types";
import { useMemo } from "react";
import { WindowLauncherIcon } from "@/components/molecules/WindowLauncherIcon";

export default function AboutMeIcon(props: ClientProjectsProps) {
	const windowMetaData = useMemo(
		() =>
			new WindowMetaData({
				name: "about-me",
				title: "Frederic Fox",
				tagLine: "About Me",
				iconUrl: "/app-icons/fax_sender_information.png",
				component: <AboutMeContent />,
				initialWindowHeight: "small",
				initialWindowWidth: "medium",
			}),
		[],
	);

	return <WindowLauncherIcon {...props} windowMetaData={windowMetaData} />;
}
