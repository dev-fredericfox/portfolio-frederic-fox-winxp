"use client";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import Clock from "../molecules/Taskbar/Clock";
import { useWindowManager } from "../context-providers/WindowManagerProvider";
import Image from "next/image";
import { WindowMetaData } from "@/lib/WindowMetaData";
import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { MinusCircleIcon } from "lucide-react";
import AboutMeIcon from "../apps/AboutMe/AboutMeIcon";
import { useState } from "react";
import WebampIcon from "../apps/webamp/WebampIcon";
import Link from "next/link";
import RunIcon from "../apps/Run/RunIcon";
import ImprintIcon from "../apps/Imprint/ImprintIcon";
import { envs } from "@/lib/envs";

const MOBILE_MAX_OPEN_WINDOWS = 1;

export default function Taskbar() {
	const [popoverOpen, setPopoverOpen] = useState(false);
	const { openWindows, updateZIndex, getFocusedWindow } = useWindowManager();

	function focusWindow(windowMetaData: WindowMetaData) {
		updateZIndex(windowMetaData);
	}

	return (
		<Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
			<div className="flex flex-col">
				<div
					className={cn(
						"w-full h-10",
						"bg-[linear-gradient(to_bottom,#245EDC_0%,#3f8cf3_9%,#245EDC_18%,#245EDC_92%,#1941A5_100%)]",
						"bg-no-repeat",
						"bg-center",
						"bg-cover",
						"flex flex-row",
					)}>
					<PopoverTrigger asChild>
						<Button variant="start" size="start" className={`${openWindows.length > MOBILE_MAX_OPEN_WINDOWS ? "w-18" : "w-26"}`}>
							<Image
								src="https://www.rw-designer.com/icon-view/18835.png"
								alt="Windows Logo"
								width={20}
								height={20}
								className="inline-block -ml-2 mr-1 -mt-1"
							/>
							<span className={`${openWindows.length > MOBILE_MAX_OPEN_WINDOWS ? "hidden" : ""}`}>start</span>
						</Button>
					</PopoverTrigger>
					<div className="flex grow ml-3 gap-1 overflow-x-scroll lg:overflow-hidden">
						{openWindows.map((window) => {
							const isFocused = getFocusedWindow()?.id === window.id;
							return (
								<Button key={window.name} variant="taskbar" size="taskbar" data-active={isFocused} onClick={() => focusWindow(window)}>
									<>
										{window.iconUrl ? (
											<Image src={window.iconUrl} alt={`${window.title} icon`} width={16} height={16} className="inline-block mr-2" />
										) : (
											<div className="w-4 h-4 inline-flex items-center text-white justify-center mr-2">{window.iconComponent}</div>
										)}
										{window.title}
									</>
								</Button>
							);
						})}
					</div>
					<div
						className="bg-[linear-gradient(to_bottom,#7bb8f5_0%,#a6d4ff_9%,#79b6f2_18%,#6aa9e8_85%,#4f86c9_100%)]
">
						<Clock />
					</div>
				</div>
				<PopoverContent className="z-2147483640">
					<PopoverHeader
						className={cn(
							"bg-[linear-gradient(to_bottom,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0.25)_4%,rgba(255,255,255,0.05)_10%,rgba(255,255,255,0)_14%),linear-gradient(to_bottom,#245EDC_0%,#3f8cf3_9%,#245EDC_18%,#245EDC_92%,#1941A5_100%)]",
							"w-screen lg:w-110 p-4",
							"rounded-tl-xl rounded-tr-xl flex flex-row items-center",
						)}>
						<PopoverDescription>
							<Avatar className="rounded-lg border-3 border-amber-400 h-16 w-16">
								<AvatarImage src={`${envs.NEXT_PUBLIC_BASE_PATH}/glazed/me-square-glaze-protected-intensity-HIGH-V2.jpeg`} alt="User Avatar" />
								<AvatarFallback className="h-16 w-16 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">UF</AvatarFallback>
							</Avatar>
						</PopoverDescription>
						<PopoverTitle className="text-white font-medium text-shadow-lg text-xl cursor-default select-none ml-2">Frederic Fox</PopoverTitle>
					</PopoverHeader>
					<div className="grid grid-cols-2 h-100 w-110">
						<div className="bg-white border-r border-[#cdddf4] p-2 gap-3 flex flex-col">
							<WebampIcon placement="start-menu" closeStartMenuCb={() => setPopoverOpen(false)} />
							<AboutMeIcon placement="start-menu" closeStartMenuCb={() => setPopoverOpen(false)} />
						</div>
						<div className="bg-[#d7e5f8] border-l border-[#c3d4f3] p-2 gap-3 flex flex-col">
							<RunIcon placement="start-menu" closeStartMenuCb={() => setPopoverOpen(false)} />
							<ImprintIcon placement="start-menu" closeStartMenuCb={() => setPopoverOpen(false)} />
						</div>
					</div>
					<div className="bg-[linear-gradient(to_bottom,#3f8cf3_0%,#245EDC_18%,#245EDC_92%,#1941A5_100%)] h-12 w-screen lg:w-110">
						<Link href="/">
							<div className="flex flex-row items-center w-full h-full grow justify-end pr-4">
								<div className="cursor-pointer">
									<Image className="absolute rounded-lg" src="/shut-down.svg" alt="Shut Down Icon" width={28} height={28} />
									<span className="absolute border-2 rounded-lg w-7 h-7 shadow-lg" />
									<MinusCircleIcon className={cn("h-5 w-5 text-white rotate-90 ml-1 mt-1")} />
								</div>
								<p className="text-white text-xs ml-3 cursor-pointer mt-0.5">Turn Off Computer</p>
							</div>
						</Link>
					</div>
				</PopoverContent>
				<div className="h-8 md:hidden bg-black"></div>
			</div>
		</Popover>
	);
}
