import RealMenuBar from "@/components/molecules/RealMenuBar";
import { WindowMetaData } from "@/lib/WindowMetaData";
import { useRef, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

type NotepadContentProps = {
	fileName: string;
	windowMetaData: WindowMetaData;
};
type FileStorage = {
	[key: string]: string;
};
export const NOTEPAD_SAVE_KEY = "notepad-save";
/** Placeholder function in case we need to modify / sanitize later on. */
const buildFileNameKey = (fileName: string) => fileName;
export default function NotepadContent({ fileName, windowMetaData }: NotepadContentProps) {
	const printDivRef = useRef<HTMLDivElement>(null);
	const [savedContent, setSavedContent] = useLocalStorage<FileStorage>(
		NOTEPAD_SAVE_KEY,
		{
			[buildFileNameKey(fileName)]: "",
		},
		{ serializer: JSON.stringify, deserializer: JSON.parse },
	);
	const [content, setContent] = useState(savedContent);

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
	);
}
