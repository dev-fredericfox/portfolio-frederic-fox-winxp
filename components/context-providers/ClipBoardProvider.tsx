"use client";
import { SavableWindowMetaData } from "@/lib/SavableWindowMetaData";
import { SavedNotes } from "@/lib/shared-types";
import { buildFileNameKey } from "@/lib/utils";
import { WindowMetaData } from "@/lib/WindowMetaData";
import { createContext, use, useState } from "react";

type ClipBoardContextType = {
	clipBoard: WindowMetaData | null;
	setClipBoard: (window: WindowMetaData | null) => void;
	handleSetNotepadClipBoard: (windowMetaData: WindowMetaData | null, savedNotes: SavedNotes) => void;
	handlePasteNotepad: (savedNotes: SavedNotes, setSavedNotes: React.Dispatch<React.SetStateAction<SavedNotes>>) => void;
};

const ClipBoardContext = createContext<ClipBoardContextType | null>(null);

const ClipBoardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [clipBoard, setClipBoard] = useState<WindowMetaData | null>(null);
	function handleSetNotepadClipBoard(windowMetaData: WindowMetaData | null, savedNotes: SavedNotes) {
		if (windowMetaData) {
			const fileName = windowMetaData instanceof SavableWindowMetaData ? windowMetaData.fileName : null;
			const selectedNote = savedNotes[buildFileNameKey(fileName ?? windowMetaData.name)];
			if (selectedNote !== undefined) {
				setClipBoard(windowMetaData);
			}
			// Edge Case Edit Me Note, we can copy that one.
			if (fileName === "Edit Me") {
				setClipBoard(windowMetaData);
			}
		}
	}
	function handlePasteNotepad(savedNotes: SavedNotes, setSavedNotes: React.Dispatch<React.SetStateAction<SavedNotes>>) {
		if (clipBoard) {
			const clipBoardFileName = clipBoard instanceof SavableWindowMetaData ? clipBoard.fileName : null;
			const noteContent = savedNotes[buildFileNameKey(clipBoardFileName ?? clipBoard.name)];
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
			if (clipBoardFileName === "Edit Me") {
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
	return <ClipBoardContext.Provider value={{ clipBoard, setClipBoard, handleSetNotepadClipBoard, handlePasteNotepad }}>{children}</ClipBoardContext.Provider>;
};

export { ClipBoardContext, ClipBoardProvider };

export function useClipBoard() {
	const context = use(ClipBoardContext);
	if (!context) {
		throw new Error("useClipBoard must be used within a ClipBoardProvider");
	}
	return context;
}
