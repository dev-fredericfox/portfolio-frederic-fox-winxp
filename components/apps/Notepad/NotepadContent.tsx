import RealMenuBar from "@/components/molecules/RealMenuBar";
import { WindowMetaData } from "@/lib/WindowMetaData";
import { useCallback, useRef, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog";
import { Button } from "@/components/ui/button";
import { useWindowManager } from "@/components/context-providers/WindowManagerProvider";
import { SavableWindowMetaData } from "@/lib/SavableWindowMetaData";
import { SavedNotes } from "@/lib/shared-types";
import Image from "next/image";
import { signika } from "@/app/layout";
import { envs } from "@/lib/envs";
type NotepadContentProps = {
	fileName: string;
	windowMetaData: WindowMetaData;
};
type FileStorage = {
	[key: string]: string;
};
export const NOTEPAD_SAVE_KEY = "notepad-save";

//onCloseHook: saveBeforeClosingPrompt,

/** Placeholder function in case we need to modify / sanitize later on. */
export const buildFileNameKey = (fileName: string) => fileName;
export default function NotepadContent({ fileName, windowMetaData }: NotepadContentProps) {
	const printDivRef = useRef<HTMLDivElement>(null);
	const [savedNotes, setSavedNotes] = useLocalStorage<SavedNotes>(
		NOTEPAD_SAVE_KEY,
		{},
		{ serializer: JSON.stringify, deserializer: JSON.parse, initializeWithValue: false },
	);
	const [discardDialogOpen, setDiscardDialogOpen] = useState(false);
	const { closeWindow } = useWindowManager();
	const [savedContent, setSavedContent] = useLocalStorage<FileStorage>(
		NOTEPAD_SAVE_KEY,
		{
			[buildFileNameKey(fileName)]: "",
		},
		{ serializer: JSON.stringify, deserializer: JSON.parse },
	);
	const [content, setContent] = useState(savedContent);

	const saveBeforeClosingPrompt = useCallback(() => {
		// Check against local storage to see if there are unsaved changes
		const noteKey = buildFileNameKey(fileName);
		const savedContent = savedNotes[noteKey] || "";
		// compare savedContent with current content
		if (savedContent === content[noteKey]) {
			// No unsaved changes, just close
			closeWindow(windowMetaData);
			return;
		}
		setDiscardDialogOpen(true);
	}, [setDiscardDialogOpen, savedNotes, fileName, content, closeWindow, windowMetaData]);
	if (windowMetaData instanceof SavableWindowMetaData) {
		windowMetaData.onCloseHook = saveBeforeClosingPrompt;
	}

	function saveAndClose() {
		save();
		closeWindow(windowMetaData);
	}
	function closeWithoutSaving() {
		closeWindow(windowMetaData);
	}
	function cancelClosing() {
		setDiscardDialogOpen(false);
	}

	function save() {
		setSavedContent({ ...savedContent, [buildFileNameKey(fileName)]: content[buildFileNameKey(fileName)] });
	}
	function saveAs(newFileName: string) {
		const oldFileNameKey = buildFileNameKey(fileName);
		const newFileNameKey = buildFileNameKey(newFileName);
		setSavedContent((prev) => {
			const { [oldFileNameKey]: oldContent, ...rest } = prev;
			return {
				...rest,
				[newFileNameKey]: oldContent,
			};
		});
	}

	return (
		<>
			<div className="flex flex-col w-full h-full">
				<RealMenuBar onSave={save} onSaveAs={saveAs} printTarget={printDivRef} windowMetaData={windowMetaData} />
				<div className="grow" ref={printDivRef}>
					<textarea
						className="w-full h-full bg-white outline-none resize-none min-h-40"
						placeholder="Start typing..."
						value={content[buildFileNameKey(fileName)]}
						onChange={(e) => setContent({ ...content, [buildFileNameKey(fileName)]: e.target.value })}></textarea>
				</div>
			</div>
			<Dialog open={discardDialogOpen} onOpenChange={setDiscardDialogOpen}>
				<DialogContent
					showCloseButton={false}
					className="m-0 p-0 border-0 rounded-b-none [box-shadow:inset_-1px_-1px_#00138c,inset_1px_1px_#0831d9,inset_-2px_-2px_#001ea0,inset_2px_1px_#166aee,inset_-3px_-2px_#003bda,inset_3px_4px_#0855dd] rounded-tl-lg rounded-tr-lg pl-px pr-px pt-px pb-px antialiased shadow-[inset_-1px_-1px_#0a0a0a,inset_1px_1px_#dfdfdf,var(--border-window-inner)] border-t-[1px_solid_#0831d9] border-l-[1px_solid_#0831d9] border-r-[1px_solid_#001ea0] text-[13px] w-full max-h-[calc(100vh-40px)]">
					<DialogHeader className="font-['Trebuchet_MS'] bg-[linear-gradient(180deg,rgba(9,151,255,1)_0%,rgba(0,83,238,1)_8%,rgba(0,80,238,1)_40%,rgba(0,102,255,1)_88%,rgba(0,102,255,1)_93%,rgba(0,91,255,1)_95%,rgba(0,61,215,1)_96%,rgba(0,61,215,1)_100%)] rounded-tl-lg rounded-tr-lg text-[13px] h-7 w-full px-2">
						<DialogTitle className="text-white font-bold text-sm [text-shadow:1px_1px_#0f1089] mt-1 select-none">Save changes?</DialogTitle>
					</DialogHeader>
					<DialogDescription className="p-2 pl-6">
						<span className="flex flex-row items-center gap-4">
							<Image src={`${envs.NEXT_PUBLIC_BASE_PATH}/xp-icons/Alert.png`} alt="Notepad Save Prompt" width={48} height={48} />
							<span className={`${signika.className} text-base select-none`}>Want to save your changes?</span>
						</span>
						<span className="mt-4 flex justify-end gap-2">
							<Button onClick={saveAndClose} size="sm" variant="system">
								Yes
							</Button>
							<Button onClick={closeWithoutSaving} size="sm" variant="system">
								No
							</Button>
							<Button onClick={cancelClosing} size="sm" variant="system">
								Cancel
							</Button>
						</span>
					</DialogDescription>
				</DialogContent>
			</Dialog>
		</>
	);
}
