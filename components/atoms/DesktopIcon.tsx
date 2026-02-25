import { cn, saveAs } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { signika } from "@/app/layout";
import Image from "next/image";
import { WindowMetaData } from "@/lib/WindowMetaData";
import { useWindowManager } from "../context-providers/WindowManagerProvider";
import { useEffect, useRef, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { NOTEPAD_SAVE_KEY } from "../apps/Notepad/NotepadContent";
import { SavedNotes } from "@/lib/shared-types";
import { SavableWindowMetaData } from "@/lib/SavableWindowMetaData";

type DesktopIconProps = {
	id: string;
	windowMetaData: WindowMetaData | null;
	onOpen: () => void;
	label: string;
	imageUrl?: string;
	iconsComponent?: React.ReactNode;
	imageAlt: string;
	imageTitle?: string;
	editingName?: boolean;
};

export function DesktopIcon({ id, windowMetaData, onOpen, label, imageUrl, iconsComponent, imageAlt, imageTitle, editingName }: DesktopIconProps) {
	const { selectedIconId, setSelectedIconId, setSelectedIcon } = useWindowManager();
	const [loaded, setLoaded] = useState(false);
	const [modifiedName, setModifiedName] = useState(label);
	const [, setSavedNotes] = useLocalStorage<SavedNotes>(
		NOTEPAD_SAVE_KEY,
		{},
		{ serializer: JSON.stringify, deserializer: JSON.parse, initializeWithValue: false },
	);
	function handleNameChange() {
		const fileName = windowMetaData instanceof SavableWindowMetaData ? windowMetaData.fileName : null;
		const { success, errorMessage } = saveAs(fileName ?? "undefined", modifiedName, setSavedNotes, { deletePrevious: true });
		console.log("saveAs result", { success, errorMessage });
	}
	const inputRef = useRef<HTMLInputElement | null>(null);
	useEffect(() => {
		if (editingName && inputRef.current) {
			inputRef.current.focus();
			inputRef.current.select();
		}
	}, [editingName]);
	const isSelected = selectedIconId === id;
	return (
		<Button
			variant="technical"
			size="desktop-icon"
			type="button"
			onClick={(e) => {
				e.stopPropagation();
				setSelectedIconId(id);
				setSelectedIcon(windowMetaData);
			}}
			onDoubleClick={(e) => {
				if (editingName) return;
				e.stopPropagation();
				setSelectedIconId(null);
				setSelectedIcon(windowMetaData);
				onOpen();
			}}
			onTouchEnd={(e) => {
				e.stopPropagation();
				setSelectedIconId(null);
				setSelectedIcon(null);
				onOpen();
			}}
			onKeyDown={(e) => {
				if (e.key === "Enter") {
					if (editingName) return;
					setSelectedIcon(windowMetaData);
					onOpen();
				}
			}}
			aria-selected={isSelected}
			data-selected={isSelected ? "true" : "false"}
			className={cn("focus:outline-none group")}>
			{/* Icon wrapper: apply “XP-ish tint” via filter when selected */}
			<span
				className={cn(
					"block",
					// Approximates XP's selected icon rendering: pushes luminance up and shifts hues toward blue.
					"group-data-[selected=true]:filter-[brightness(1.05)_contrast(0.95)_saturate(1.35)_hue-rotate(200deg)]",
				)}>
				{imageUrl ? (
					<div className="relative h-10 w-10 md:h-12 lg:h-12 md:w-24 lg:w-24">
						{!loaded && (
							<div className="absolute inset-0 grid place-items-center">
								<img src="/win-xp-hour-glass.gif" alt="" className="h-8 w-8" />
							</div>
						)}

						<Image
							src={imageUrl}
							alt={imageAlt}
							title={imageTitle}
							fill
							sizes="96px"
							className={["pointer-events-none object-contain transition-opacity duration-150", loaded ? "opacity-100" : "opacity-0"].join(" ")}
							placeholder="empty"
							onLoad={() => setLoaded(true)}
							loading="eager"
						/>
					</div>
				) : (
					iconsComponent
				)}
			</span>

			{/* Caption: XP blue highlight with white text */}
			{!editingName ? (
				<p
					className={cn(
						"text-[16px] text-center mt-1 pointer-events-none w-40 overflow-hidden px-1",
						signika.className,

						// XP desktop captions are always white
						"text-white",

						// XP halo (always on)
						"[text-shadow:1px_0_#000,-1px_0_#000,0_1px_#000,0_-1px_#000]",

						// Only selection adds the blue plate
						"group-data-[selected=true]:bg-[#0a64d0]",
						"group-data-[selected=true]:shadow-[inset_0_0_0_1px_#003c7e]",
						"group-data-[selected=true]:rounded-[2px]",
					)}>
					{label}
				</p>
			) : (
				<input
					ref={inputRef}
					type="text"
					value={modifiedName}
					className={cn(
						"relative z-2",
						"bg-[rgb(252,252,254)]",
						"border border-[rgb(145,155,156)]",
						"px-1 py-0.5",
						"outline-none",
						"w-40",
						"select-invert",
						"text-center",
					)}
					onClick={(e) => e.stopPropagation()}
					onChange={(e) => {
						console.log("new name", e.target.value);
						setModifiedName(e.target.value);
					}}
					onBlur={(e) => {
						setModifiedName(label);
						handleNameChange();
					}}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							e.currentTarget.blur();
						} else if (e.key === "Escape") {
							setModifiedName(label);
							e.currentTarget.blur();
						}
					}}
				/>
			)}
		</Button>
	);
}
