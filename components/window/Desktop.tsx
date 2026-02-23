"use client";
import ClientProjects from "@/components/apps/ClientProjects/ClientProjectsIcon";
import WebampIcon from "@/components/apps/webamp/WebampIcon";
import DesktopDropZone from "@/components/window/DesktopDropZone";
import { JSX, useMemo, useState } from "react";
import WindowWrapper from "./WindowWrapper";
import { DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { useWindowManager } from "../context-providers/WindowManagerProvider";
import Taskbar from "../organisms/Taskbar";
import Image from "next/image";
import AboutMeIcon from "../apps/AboutMe/AboutMeIcon";
import ReadMeIcon from "../apps/ReadMe/ReadMeIcon";
import ContactMeIcon from "../apps/ContactMe/ContactMeIcon";
import LegacyCVIcon from "../apps/LegacyCV/LegacyCVIcon";
import NotepadIcon from "../apps/Notepad/NotepadIcon";
import { useLocalStorage } from "usehooks-ts";
import { buildFileNameKey, NOTEPAD_SAVE_KEY } from "../apps/Notepad/NotepadContent";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuGroup,
	ContextMenuItem,
	ContextMenuSeparator,
	ContextMenuSub,
	ContextMenuSubContent,
	ContextMenuSubTrigger,
	ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useRouter } from "next/navigation";
import { useHotkeys } from "react-hotkeys-hook";
import { WindowMetaData } from "@/lib/WindowMetaData";
import { envs } from "@/lib/envs";

type SavedNotes = Record<string, string>;

const DESKTOP_ICONS = [
	{ name: "Webamp", icon: () => <WebampIcon placement="desktop" /> },
	{ name: "Client Projects", icon: () => <ClientProjects placement="desktop" /> },
	{ name: "Frederic Fox", icon: () => <AboutMeIcon placement="desktop" /> },
	{ name: "Read Me", icon: () => <ReadMeIcon placement="desktop" /> },
	{ name: "Contact Me", icon: () => <ContactMeIcon placement="desktop" /> },
	{ name: "Legacy CV", icon: () => <LegacyCVIcon /> },
	{
		name: "Notepad",
		icon: () => <NotepadIcon placement="desktop" fileName="Edit Me" rightClickDisabled />,
	},
];

function convertNotePadSavesToIcons(savedNotes: SavedNotes): { name: string; icon: () => JSX.Element }[] {
	return Object.keys(savedNotes).map((fileName) => ({
		name: fileName,
		icon: () => <NotepadIcon placement="desktop" fileName={fileName} />,
	}));
	// .filter(({ name }) => name !== "Edit Me"); // We don't want to show Edit Me as an icon on the desktop
}

export default function Desktop() {
	const router = useRouter();
	const { openWindows, findById, selectedIconId, setSelectedIconId, selectedIcon } = useWindowManager();
	const [, setIsDropped] = useState(false);
	const [sortMode, setSortMode] = useState<"default" | "alpha">("default");
	const [clipBoard, setClipBoard] = useState<WindowMetaData | null>(null);

	const [savedNotes, setSavedNotes] = useLocalStorage<SavedNotes>(
		NOTEPAD_SAVE_KEY,
		{},
		{ serializer: JSON.stringify, deserializer: JSON.parse, initializeWithValue: false },
	);
	const derivedIcons = useMemo(() => {
		const icons = [...DESKTOP_ICONS, ...convertNotePadSavesToIcons(savedNotes)];
		return sortMode === "alpha" ? icons.sort((a, b) => a.name.localeCompare(b.name)) : icons;
	}, [savedNotes, sortMode]);

	function handleSetNotepadClipBoard() {
		if (selectedIcon) {
			const selectedNote = savedNotes[buildFileNameKey(selectedIcon.fileName ?? selectedIcon.name)];
			if (selectedNote !== undefined) {
				setClipBoard(selectedIcon);
			}
			// Edge Case Edit Me Note, we can copy that one.
			if (selectedIcon?.fileName === "Edit Me") {
				setClipBoard(selectedIcon);
				console.log("Edit Me note copied to clipboard");
			}
		}
	}
	useHotkeys(["cmd+c", "ctrl+c"], () => handleSetNotepadClipBoard(), [selectedIconId]);
	function handlePasteNotepad() {
		if (clipBoard) {
			const noteContent = savedNotes[buildFileNameKey(clipBoard.fileName ?? clipBoard.name)];
			if (noteContent !== undefined) {
				const baseFileName = `Copy of ${clipBoard.name}`;
				let newFileName = baseFileName;
				let counter = 1;

				while (savedNotes[buildFileNameKey(newFileName)] !== undefined) {
					newFileName = `Copy (${counter}) of ${clipBoard.name}`;
					counter++;
				}

				const newNoteKey = buildFileNameKey(newFileName);
				setSavedNotes((prev) => ({ ...prev, [newNoteKey]: noteContent }));
			}
			// Edge Case Edit Me, we need to generate a new note with the content of Edit Me
			if (clipBoard.fileName === "Edit Me") {
				const baseFileName = `Copy of Edit Me`;
				let newFileName = baseFileName;
				let counter = 1;

				while (savedNotes[buildFileNameKey(newFileName)] !== undefined) {
					newFileName = `Copy (${counter}) of Edit Me`;
					counter++;
				}

				const newNoteKey = buildFileNameKey(newFileName);
				setSavedNotes((prev) => ({ ...prev, [newNoteKey]: "" }));
			}
		}
	}
	useHotkeys(["cmd+v", "ctrl+v"], () => handlePasteNotepad(), [clipBoard, derivedIcons]);

	function handleDragEnd(event: DragEndEvent) {
		if (event.over && event.over.id === "droppable") {
			setIsDropped(true);
		}
		const currentPosition = event.delta;
		findById(event.active.id as string)?.setDeltaPosition(currentPosition.x, currentPosition.y);
	}
	function handleDragStart(event: DragStartEvent) {}
	function refresh() {
		router.refresh();
		// Clear clipboard
		setClipBoard(null);
		// Clear notes
		setSavedNotes({});
	}

	function sortIconsAlphabetically() {
		setSortMode("alpha");
	}
	function sortIconsByDefault() {
		setSortMode("default");
	}

	function newNotepad() {
		// Check if "New Note" already exists, if so, append a number to it
		const baseFileName = "New Note";

		setSavedNotes((prev) => {
			let newFileName = baseFileName;
			let counter = 1;
			// IMPORTANT: check against prev, not savedNotes
			while (prev[buildFileNameKey(newFileName)] !== undefined) {
				newFileName = `${baseFileName} (${counter})`;
				counter++;
			}
			const newNoteKey = buildFileNameKey(newFileName);
			return { ...prev, [newNoteKey]: "" };
		});
	}

	return (
		<ContextMenu>
			<ContextMenuTrigger className="w-full h-full">
				<main className="flex h-screen w-full flex-col select-none overflow-hidden" onClick={() => setSelectedIconId(null)}>
					<Image
						src={`${envs.NEXT_PUBLIC_BASE_PATH}/win-xp-wallpaper.jpeg`}
						alt="Windows XP Wallpaper"
						width={1920}
						height={1080}
						className="absolute -z-10 h-full w-full object-cover"
					/>
					<DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
						<div className="grow h-screen flex flex-col">
							<div className="grow h-full">
								<div className="flex flex-wrap lg:flex-col relative p-8 max-[376px]:gap-0 max-[391px]:gap-1 gap-2 sm:gap-6 md:gap-8 lg:gap-8 shrink h-fit max-h-screen w-fit">
									{derivedIcons.map(({ icon: Icon }, index) => (
										<Icon key={index} />
									))}
								</div>
								<DesktopDropZone>
									{openWindows.map((window) => (
										<WindowWrapper key={window.name} windowMetaData={window} unstyled={window.overrideWindowComponent === "unstyled"} />
									))}
								</DesktopDropZone>
							</div>

							<Taskbar />
						</div>
					</DndContext>
				</main>
			</ContextMenuTrigger>
			<ContextMenuContent className="border rounded-none">
				<ContextMenuSub>
					<ContextMenuSubTrigger>Sort</ContextMenuSubTrigger>
					<ContextMenuSubContent className="border rounded-none">
						<ContextMenuGroup>
							<ContextMenuItem onClick={sortIconsAlphabetically}>Alphabetically</ContextMenuItem>
							<ContextMenuItem onClick={sortIconsByDefault}>By Default</ContextMenuItem>
						</ContextMenuGroup>
					</ContextMenuSubContent>
				</ContextMenuSub>
				<ContextMenuItem onClick={refresh}>Clear and Refresh</ContextMenuItem>
				<ContextMenuSeparator />
				<ContextMenuSub>
					<ContextMenuSubTrigger>New</ContextMenuSubTrigger>
					<ContextMenuSubContent className="border rounded-none">
						<ContextMenuGroup>
							<ContextMenuItem onClick={newNotepad}>Notepad</ContextMenuItem>
						</ContextMenuGroup>
					</ContextMenuSubContent>
				</ContextMenuSub>
				<ContextMenuItem disabled={!clipBoard} onClick={handlePasteNotepad}>
					Paste
				</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	);
}
