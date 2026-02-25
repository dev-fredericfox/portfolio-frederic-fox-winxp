"use client";
import ClientProjects from "@/components/apps/ClientProjects/ClientProjectsIcon";
import WebampIcon from "@/components/apps/webamp/WebampIcon";
import DesktopDropZone from "@/components/window/DesktopDropZone";
import { JSX, use, useEffect, useMemo, useState } from "react";
import WindowWrapper from "./WindowWrapper";
import { DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { useWindowManager } from "../context-providers/WindowManagerProvider";
import Taskbar from "../organisms/Taskbar";
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
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "../ui/alert-dialog";
import { signika } from "@/app/layout";
import { envs } from "@/lib/envs";
import { Button } from "../ui/button";
import Image from "next/image";
import { saveAs } from "@/lib/utils";
import { SavableWindowMetaData } from "@/lib/SavableWindowMetaData";
import { useClipBoard } from "../context-providers/ClipBoardProvider";

type SavedNotes = Record<string, string>;

type SaveHandler = (currentFileName: string, newFileName: string, setSavedContent: React.Dispatch<React.SetStateAction<SavedNotes>>) => boolean;

type DesktopIconType = {
	name: string;
	icon: ({ saveAsHandler }: { saveAsHandler: SaveHandler }) => JSX.Element;
};

const DESKTOP_ICONS: DesktopIconType[] = [
	{ name: "Webamp", icon: () => <WebampIcon placement="desktop" /> },
	{ name: "Client Projects", icon: () => <ClientProjects placement="desktop" /> },
	{ name: "Frederic Fox", icon: () => <AboutMeIcon placement="desktop" /> },
	{ name: "Read Me", icon: () => <ReadMeIcon placement="desktop" /> },
	{ name: "Contact Me", icon: () => <ContactMeIcon placement="desktop" /> },
	{ name: "Legacy CV", icon: () => <LegacyCVIcon /> },
	{
		name: "Notepad",
		icon: ({ saveAsHandler }) => <NotepadIcon placement="desktop" fileName="Edit Me" rightClickDisabled saveAsHandler={saveAsHandler} />,
	},
];

function convertNotePadSavesToIcons(savedNotes: SavedNotes): { name: string; icon: ({ saveAsHandler }: { saveAsHandler: SaveHandler }) => JSX.Element }[] {
	return Object.keys(savedNotes)
		.map((fileName) => ({
			name: fileName,
			icon: ({ saveAsHandler }: { saveAsHandler: SaveHandler }) => <NotepadIcon placement="desktop" fileName={fileName} saveAsHandler={saveAsHandler} />,
		}))
		.filter(({ name }) => name !== "Edit Me"); // We don't want to show Edit Me as an additionally saved file icon on the desktop
}

export default function Desktop() {
	const router = useRouter();
	const { openWindows, findById, selectedIconId, setSelectedIconId, selectedIcon, setEditingName } = useWindowManager();
	const [, setIsDropped] = useState(false);
	const [sortMode, setSortMode] = useState<"default" | "alpha">("default");
	const { clipBoard, setClipBoard, handleSetNotepadClipBoard, handlePasteNotepad } = useClipBoard();
	const [alertDialogOpen, setAlertDialogOpen] = useState(false);
	const [alertContent, setAlertContent] = useState({ title: "", description: "" });

	const [savedNotes, setSavedNotes] = useLocalStorage<SavedNotes>(
		NOTEPAD_SAVE_KEY,
		{},
		{ serializer: JSON.stringify, deserializer: JSON.parse, initializeWithValue: false },
	);
	const derivedIcons = useMemo(() => {
		const icons = [...DESKTOP_ICONS, ...convertNotePadSavesToIcons(savedNotes)];
		return sortMode === "alpha" ? icons.sort((a, b) => a.name.localeCompare(b.name)) : icons;
	}, [savedNotes, sortMode]);

	useHotkeys(["cmd+c", "ctrl+c"], () => handleSetNotepadClipBoard(selectedIcon, savedNotes), [selectedIconId]);
	useHotkeys(
		["delete", "backspace"],
		() => {
			if (selectedIcon) {
				const selectedIconFileName = selectedIcon instanceof SavableWindowMetaData ? selectedIcon.fileName : null;
				if (selectedIcon.name === "notepad" && selectedIconFileName) {
					const noteKey = buildFileNameKey(selectedIconFileName);
					setSavedNotes((prev) => {
						const updatedNotes = { ...prev };
						delete updatedNotes[noteKey];
						return updatedNotes;
					});
				}
				setSelectedIconId(null);
			}
		},
		[selectedIconId, selectedIcon],
	);
	// Rename
	useHotkeys(["F2"], () => setEditingName(selectedIconId), [selectedIconId, setEditingName]);

	function saveAsHandler(currentFileName: string, newFileName: string, setSavedContent: React.Dispatch<React.SetStateAction<SavedNotes>>) {
		const { success, errorMessage } = saveAs(currentFileName, newFileName, setSavedContent, { deletePrevious: false });
		if (!success) {
			setAlertContent({ title: "Error", description: errorMessage ?? "An error occurred while saving." });
			setAlertDialogOpen(true);
		}
		return success;
	}

	useHotkeys(["cmd+v", "ctrl+v"], () => handlePasteNotepad(savedNotes, setSavedNotes), [clipBoard, derivedIcons]);

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
		<>
			<ContextMenu>
				<ContextMenuTrigger className="w-full h-full">
					<main className={`flex h-screen w-full flex-col select-none overflow-hidden`} onClick={() => setSelectedIconId(null)}>
						<DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
							<div className="grow h-screen flex flex-col">
								<div className="grow h-full">
									<div className="flex flex-wrap lg:flex-col relative max-[376px]:p-6 p-8 max-[376px]:gap-0 max-[391px]:gap-1 gap-2 sm:gap-6 md:gap-8 lg:gap-8 shrink h-fit max-h-screen w-fit">
										{derivedIcons.map(({ icon: Icon }, index) => (
											<Icon key={index} saveAsHandler={saveAsHandler} />
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
					<ContextMenuItem disabled={!clipBoard} onClick={() => handlePasteNotepad(savedNotes, setSavedNotes)}>
						Paste
					</ContextMenuItem>
				</ContextMenuContent>
			</ContextMenu>
			<AlertDialog open={alertDialogOpen} onOpenChange={setAlertDialogOpen}>
				<AlertDialogContent className="m-0 p-0 border-0 rounded-b-none [box-shadow:inset_-1px_-1px_#00138c,inset_1px_1px_#0831d9,inset_-2px_-2px_#001ea0,inset_2px_1px_#166aee,inset_-3px_-2px_#003bda,inset_3px_4px_#0855dd] rounded-tl-lg rounded-tr-lg pl-px pr-px pt-px pb-px antialiased shadow-[inset_-1px_-1px_#0a0a0a,inset_1px_1px_#dfdfdf,var(--border-window-inner)] border-t-[1px_solid_#0831d9] border-l-[1px_solid_#0831d9] border-r-[1px_solid_#001ea0] text-[13px] w-full max-h-[calc(100vh-40px)]">
					<AlertDialogHeader className="font-['Trebuchet_MS'] bg-[linear-gradient(180deg,rgba(9,151,255,1)_0%,rgba(0,83,238,1)_8%,rgba(0,80,238,1)_40%,rgba(0,102,255,1)_88%,rgba(0,102,255,1)_93%,rgba(0,91,255,1)_95%,rgba(0,61,215,1)_96%,rgba(0,61,215,1)_100%)] rounded-tl-lg rounded-tr-lg text-[13px] h-7 w-full px-2">
						<AlertDialogTitle className="text-white font-bold text-sm [text-shadow:1px_1px_#0f1089] mt-1 select-none">{alertContent.title}</AlertDialogTitle>
					</AlertDialogHeader>
					<AlertDialogDescription className="px-8 pt-4">
						<span className="flex flex-row items-center gap-4">
							<Image src={`${envs.NEXT_PUBLIC_BASE_PATH}/xp-icons/Alert.png`} alt="Notepad Save Prompt" width={48} height={48} />
							<span className={`${signika.className} text-base select-none`}>{alertContent.description}</span>
						</span>
					</AlertDialogDescription>
					<AlertDialogFooter className="p-4">
						<AlertDialogAction asChild>
							<Button>Continue</Button>
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}
