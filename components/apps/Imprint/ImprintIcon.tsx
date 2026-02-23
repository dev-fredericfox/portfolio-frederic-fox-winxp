"use client";
import { useMemo } from "react";
import { WindowMetaData } from "@/lib/WindowMetaData";
import { WindowLauncherIcon } from "@/components/molecules/WindowLauncherIcon";
import { ClientProjectsProps } from "@/lib/shared-types";
import { InfoIcon } from "lucide-react";
import { ImprintContent } from "./ImprintContent";
import InertFileDropdown from "@/components/molecules/InertFileDropdown";

export default function ImprintIcon(props: ClientProjectsProps) {
	const windowMetaData = useMemo(
		() =>
			new WindowMetaData({
				name: "imprint",
				title: "Imprint",
				iconComponent: <InfoIcon size={28} />,
				component: <ImprintContent />,
				initialWindowHeight: "small",
				initialWindowWidth: "small",
			}),
		[],
	);
	return <WindowLauncherIcon {...props} windowMetaData={windowMetaData} dropdownComponent={<InertFileDropdown />} />;
}
