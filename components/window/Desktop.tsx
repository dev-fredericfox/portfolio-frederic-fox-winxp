"use client";
import ClientProjects from "@/components/apps/ClientProjects/ClientProjectsIcon";
import WebampIcon from "@/components/apps/webamp/WebampIcon";
import DesktopDropZone from "@/components/window/DesktopDropZone";
import { useState } from "react";
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
import { NOTEPAD_SAVE_KEY } from "../apps/Notepad/NotepadContent";

type SavedNotes = Record<string, string>;
export default function Desktop() {
	const [, setIsDropped] = useState(false);
	const { openWindows, findById, selectedIconId, setSelectedIconId } = useWindowManager();
	const [savedNotes] = useLocalStorage<SavedNotes>(NOTEPAD_SAVE_KEY, {}, { serializer: JSON.stringify, deserializer: JSON.parse, initializeWithValue: false });
	function handleDragEnd(event: DragEndEvent) {
		if (event.over && event.over.id === "droppable") {
			setIsDropped(true);
		}
		const currentPosition = event.delta;
		findById(event.active.id as string)?.setDeltaPosition(currentPosition.x, currentPosition.y);
	}
	function handleDragStart(event: DragStartEvent) {}
	return (
		<main className="flex h-screen w-full flex-col select-none overflow-hidden" onClick={() => setSelectedIconId(null)}>
			<Image src="/win-xp-wallpaper.jpeg" alt="Windows XP Wallpaper" width={1920} height={1080} className="absolute -z-10 h-full w-full object-cover" />
			<DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
				<div className="grow h-screen flex flex-col">
					<div className="grow h-full">
							<div className="flex flex-wrap lg:flex-col relative w-full p-8 max-[376px]:gap-0 max-[391px]:gap-1 gap-2 sm:gap-6 md:gap-8 lg:gap-8 shrink h-fit">
							<WebampIcon selectedId={selectedIconId} setSelectedId={setSelectedIconId} placement="desktop" />
							<ClientProjects selectedId={selectedIconId} setSelectedId={setSelectedIconId} placement="desktop" />
							<AboutMeIcon selectedId={selectedIconId} setSelectedId={setSelectedIconId} placement="desktop" />
							<ReadMeIcon selectedId={selectedIconId} setSelectedId={setSelectedIconId} placement="desktop" />
							<ContactMeIcon selectedId={selectedIconId} setSelectedId={setSelectedIconId} placement="desktop" />
							<LegacyCVIcon selectedId={selectedIconId} setSelectedId={setSelectedIconId} />
							<NotepadIcon selectedId={selectedIconId} setSelectedId={setSelectedIconId} placement="desktop" fileName="Edit Me" />
						</div>
						<DesktopDropZone>
							{Object.keys(savedNotes).length > 0 &&
								Object.keys(savedNotes).map((fileName) => (
									<NotepadIcon key={fileName} selectedId={selectedIconId} setSelectedId={setSelectedIconId} placement="desktop" fileName={fileName} />
								))}
							{openWindows.map((window) => (
								<WindowWrapper key={window.name} windowMetaData={window} unstyled={window.overrideWindowComponent === "unstyled"} />
							))}
						</DesktopDropZone>
					</div>

					<Taskbar />
				</div>
			</DndContext>
		</main>
	);
}
