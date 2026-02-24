import React, { useState, MouseEvent } from "react";
import { useDraggable } from "@dnd-kit/core";
import { WindowMetaData } from "@/lib/WindowMetaData";
import WindowCloseButton from "./WindowCloseButton";
import WindowMaximizeButton from "./WindowMaximizeButton";
import WindowMinimizeButton from "./WindowMinimizeButton";
import { useWindowManager } from "../context-providers/WindowManagerProvider";
import Image from "next/image";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { SavableWindowMetaData } from "@/lib/SavableWindowMetaData";
type DraggableProps = {
	children?: React.ReactNode;
	windowMetaData: WindowMetaData;
	unstyled?: boolean;
};

const windowVariants = cva(
	[
		"absolute top-0 left-0 [box-shadow:inset_-1px_-1px_#00138c,inset_1px_1px_#0831d9,inset_-2px_-2px_#001ea0,inset_2px_1px_#166aee,inset_-3px_-2px_#003bda,inset_3px_4px_#0855dd] rounded-tl-lg rounded-tr-lg pl-px pr-px pt-px pb-px antialiased shadow-[inset_-1px_-1px_#0a0a0a,inset_1px_1px_#dfdfdf,var(--border-window-inner)] border-t-[1px_solid_#0831d9] border-l-[1px_solid_#0831d9] border-r-[1px_solid_#001ea0] text-[13px] w-full max-h-[calc(100vh-40px)]",
	].join(","),
	{
		variants: {
			sizeWidth: {
				small: "lg:min-w-120 lg:max-w-120",
				smallDynamic: "lg:w-auto lg:min-w-120",
				medium: "lg:min-w-160 lg:max-w-160",
				large: "lg:w-[1000px]",
				max: "w-full",
				min: "hidden",
			},
			sizeHeight: {
				small: "lg:min-h-40",
				smallDynamic: "lg:min-h-30 lg:h-auto",
				medium: "lg:min-h-60 lg:max-h-[80vh]",
				large: "lg:min-h-100",
				max: "h-[calc(100vh-72px)] md:h-[calc(100vh-40px)]",
				min: "hidden",
			},
		},
		defaultVariants: {
			sizeWidth: "medium",
			sizeHeight: "medium",
		},
	},
);

const innerWindowVariants = cva("w-full bg-[#ece9d8] mb-px mx-px flex max-h-[calc(100vh-70px)]", {
	variants: {
		sizeHeight: {
			small: "lg:min-h-40",
			smallDynamic: "lg:h-auto",
			medium: "lg:h-200",
			large: "lg:h-100",
			max: "h-full min-h-[calc(100vh-70px)] h-[calc(100vh-70px)]",
			min: "hidden",
		},
	},
	defaultVariants: {
		sizeHeight: "medium",
	},
});
const WindowWrapperFwdRef = React.forwardRef<HTMLDivElement, DraggableProps>(({ windowMetaData, children }, ref) => {
	return <WindowWrapper windowMetaData={windowMetaData}>{children}</WindowWrapper>;
});
WindowWrapperFwdRef.displayName = "WindowWrapperFwdRef";
export default function WindowWrapper({ windowMetaData, children, unstyled }: DraggableProps) {
	const { id, initialWindowHeight, initialWindowWidth, iconUrl, title, fileName } = windowMetaData;
	const [currentWindowHeight, setCurrentWindowHeight] = useState(initialWindowHeight);
	const [currentWindowWidth, setCurrentWindowWidth] = useState(initialWindowWidth);
	const [isMax, setIsMax] = useState(false);
	const [isMinimized, setIsMinimized] = useState(false);
	const { closeWindow, getZIndex, updateZIndex, getFocusedWindow, resetZIndex } = useWindowManager();
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id,
	});
	const isPhoneScreen = typeof window !== "undefined" && window.innerWidth <= 768;
	const x = windowMetaData.x + (transform?.x ?? 0);
	const y = windowMetaData.y + (transform?.y ?? 0);

	function closeWindowHandler() {
		// Cast to see if its a SavableWindowMetaData, if it has the onCloseHook, we call it with the close function, otherwise we just close the window
		if (windowMetaData instanceof SavableWindowMetaData && windowMetaData.onCloseHook) {
			windowMetaData.onCloseHook();
		} else {
			closeWindow(windowMetaData);
		}
	}
	function maximizeWindow() {
		if (isMax) {
			setIsMax(false);
			setCurrentWindowHeight(initialWindowHeight);
			setCurrentWindowWidth(initialWindowWidth);
		} else {
			setIsMax(true);
			setCurrentWindowHeight("max");
			setCurrentWindowWidth("max");
		}
	}
	function minimizeWindow() {
		resetZIndex(windowMetaData);
		setCurrentWindowHeight("min");
		setCurrentWindowWidth("min");
		setIsMinimized(true);
	}
	function focusWindow(e: MouseEvent<HTMLElement>) {
		if ((e.target as HTMLElement).closest('[data-action="minimize"]')) {
			return;
		}
		updateZIndex(windowMetaData);
	}

	if (getFocusedWindow() === windowMetaData && isMinimized) {
		setIsMinimized(false);
		if (isMax) {
			setCurrentWindowHeight("max");
			setCurrentWindowWidth("max");
		} else {
			setCurrentWindowHeight(initialWindowHeight);
			setCurrentWindowWidth(initialWindowWidth);
		}
	}

	if (unstyled) {
		return children ?? windowMetaData.component;
	}
	const style = {
		transform: isPhoneScreen || isMax ? "none" : `translate3d(${x}px, ${y}px, 0)`,
		zIndex: getZIndex(windowMetaData),
	};
	return (
		<div
			className={cn(windowVariants({ sizeWidth: currentWindowWidth, sizeHeight: currentWindowHeight }), isMinimized && "hidden")}
			ref={setNodeRef}
			style={style}
			onClick={focusWindow}
			onPointerDownCapture={focusWindow}
			onMouseDownCapture={focusWindow}>
			<div className="font-['Trebuchet_MS'] bg-[linear-gradient(180deg,rgba(9,151,255,1)_0%,rgba(0,83,238,1)_8%,rgba(0,80,238,1)_40%,rgba(0,102,255,1)_88%,rgba(0,102,255,1)_93%,rgba(0,91,255,1)_95%,rgba(0,61,215,1)_96%,rgba(0,61,215,1)_100%)] rounded-tl-lg rounded-tr-lg text-[13px] h-7 flex items-center justify-between w-full">
				{/* Drag-Handle */}
				<div className="flex flex-row pr-6 py-0.75 pl-2 grow gap-2" {...listeners} {...attributes}>
					{iconUrl ? (
						<Image src={iconUrl} alt={`${title} Icon`} width={16} height={16} className="pointer-events-none" />
					) : (
						<div className="w-4 h-4 flex items-center text-white justify-center">{windowMetaData.iconComponent}</div>
					)}
					<p className="text-white font-bold [text-shadow:1px_1px_#0f1089]">
						<NameTitle name={fileName} title={title} />
					</p>
				</div>
				<div className="flex justify-end gap-0.5 pr-1">
					<WindowMinimizeButton onMinimize={minimizeWindow} />
					<WindowMaximizeButton onMaximize={maximizeWindow} />
					<WindowCloseButton onClose={closeWindowHandler} />
				</div>
			</div>
			<div className="pr-0.5 overflow-hidden grow mb-0.5">
				<div className={cn(innerWindowVariants({ sizeHeight: currentWindowHeight }))}>{children ?? windowMetaData.component}</div>
			</div>
		</div>
	);
}

function NameTitle({ name, title }: { name?: string; title: string }) {
	if (name && title) {
		return (
			<>
				{title} | {name}
			</>
		);
	}
	if (name) {
		return <>{name}</>;
	}
	return <>{title}</>;
}
