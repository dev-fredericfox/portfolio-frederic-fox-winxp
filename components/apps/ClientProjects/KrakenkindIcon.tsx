import { DesktopIcon } from "@/components/atoms/DesktopIcon";
import { useRef, useState } from "react";
import { useWindowManager } from "@/components/context-providers/WindowManagerProvider";
import { WindowMetaData } from "@/lib/WindowMetaData";
import { KrakenkindContent } from "./KrakenkindContent";
import { envs } from "@/lib/envs";

export default function KrakenkindIcon() {
	const { addWindow } = useWindowManager();
	const [, setIsOpen] = useState(false);
	const windowMetaData = new WindowMetaData({
		name: "krakenkind",
		title: "Krankenkind",
		iconUrl: `${envs.NEXT_PUBLIC_BASE_PATH}/app-icons/Krakenkind-Cropped.png`,
		component: <KrakenkindContent />,
	});
	const windowMetaDataRef = useRef<WindowMetaData | null>(windowMetaData);

	function open() {
		setIsOpen(true);
		if (!windowMetaDataRef.current) return;
		addWindow(windowMetaDataRef.current);
	}
	return (
		<div>
			<div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
				<DesktopIcon
					onOpen={open}
					id={windowMetaData.name}
					windowMetaData={windowMetaData}
					label={windowMetaData.title}
					imageAlt={`${windowMetaData.title} Icon`}
					imageTitle={windowMetaData.title}
					imageUrl={windowMetaData?.iconUrl ?? ""}
				/>
			</div>
		</div>
	);
}
