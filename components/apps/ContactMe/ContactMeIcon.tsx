"use client";
import { useMemo } from "react";
import { WindowMetaData } from "@/lib/WindowMetaData";
import ContactMeContent from "./ContactMeContent";
import { WindowLauncherIcon } from "@/components/molecules/WindowLauncherIcon";
import { ClientProjectsProps } from "@/lib/shared-types";
import InertFileDropdown from "@/components/molecules/InertFileDropdown";
import { envs } from "@/lib/envs";

export default function ContactMeIcon(props: ClientProjectsProps) {
	const windowMetaData = useMemo(
		() =>
			new WindowMetaData({
				name: "contact-me",
				title: "Contact Me",
				iconUrl: `${envs.NEXT_PUBLIC_BASE_PATH}//app-icons/fax.png`,
				component: <ContactMeContent />,
				initialWindowHeight: "small",
				initialWindowWidth: "small",
			}),
		[],
	);
	return <WindowLauncherIcon {...props} windowMetaData={windowMetaData} dropdownComponent={<InertFileDropdown />} />;
}
