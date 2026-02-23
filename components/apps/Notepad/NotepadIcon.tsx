"use client";
import { ClientProjectsProps, SavedNotes } from "@/lib/shared-types";
import { useEffect, useMemo } from "react";
import { WindowLauncherIcon } from "@/components/molecules/WindowLauncherIcon";
import NotepadContent, { buildFileNameKey, NOTEPAD_SAVE_KEY } from "./NotepadContent";
import { ContextMenuContent, ContextMenuGroup, ContextMenuItem, ContextMenuShortcut } from "@/components/ui/context-menu";
import { useLocalStorage } from "usehooks-ts";
import InertFileDropdown from "@/components/molecules/InertFileDropdown";
import { SavableWindowMetaData } from "@/lib/SavableWindowMetaData";
import { envs } from "@/lib/envs";

type NotepadIconProps = ClientProjectsProps & {
	fileName?: string;
	rightClickDisabled?: boolean;
};

export default function NotepadIcon(props: NotepadIconProps) {
	const [, setSavedNotes] = useLocalStorage<SavedNotes>(
		NOTEPAD_SAVE_KEY,
		{},
		{ serializer: JSON.stringify, deserializer: JSON.parse, initializeWithValue: false },
	);
	const fileName = props.fileName ?? "Untitled.txt";

	const windowMetaData = useMemo(
		() =>
			new SavableWindowMetaData({
				name: "notepad",
				title: "Notepad",
				tagLine: "Simple Text Editor",
				iconUrl: `${envs.NEXT_PUBLIC_BASE_PATH}/app-icons/notepad.png`,
				component: null,
				initialWindowHeight: "small",
				initialWindowWidth: "smallDynamic",
				fileName: fileName,
			}),
		[fileName],
	);
	useEffect(() => {
		windowMetaData.component = <NotepadContent fileName={fileName} windowMetaData={windowMetaData} />;
	}, [fileName, windowMetaData]);

	function deleteNote() {
		const noteKey = buildFileNameKey(fileName);
		setSavedNotes((prev) => {
			const updatedNotes = { ...prev };
			delete updatedNotes[noteKey];
			return updatedNotes;
		});
	}

	return (
		<>
			<WindowLauncherIcon
				{...props}
				windowMetaData={windowMetaData}
				dropdownComponent={
					props.rightClickDisabled ? (
						<InertFileDropdown />
					) : (
						<ContextMenuContent className="border rounded-none">
							<ContextMenuGroup>
								<ContextMenuItem>
									Copy
									<ContextMenuShortcut>⌘C</ContextMenuShortcut>
								</ContextMenuItem>
								<ContextMenuItem>
									Cut
									<ContextMenuShortcut>⌘X</ContextMenuShortcut>
								</ContextMenuItem>
								<ContextMenuItem>
									Rename
									<ContextMenuShortcut>F2</ContextMenuShortcut>
								</ContextMenuItem>
								<ContextMenuItem onClick={deleteNote}>
									Delete
									<ContextMenuShortcut>⌘⌫</ContextMenuShortcut>
								</ContextMenuItem>
							</ContextMenuGroup>
						</ContextMenuContent>
					)
				}
			/>
		</>
	);
}
