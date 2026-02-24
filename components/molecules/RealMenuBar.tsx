import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { RefObject, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useWindowManager } from "../context-providers/WindowManagerProvider";
import { WindowMetaData } from "@/lib/WindowMetaData";

type RealMenuBarProps = {
	items?: string[];
	onSave?: () => void;
	onSaveAs?: (newFileName: string) => void;
	printTarget?: RefObject<HTMLDivElement | null>;
	windowMetaData: WindowMetaData;
};
const defaultItems = ["Edit", "View", "Help"];
export default function RealMenuBar({ items = defaultItems, onSave, onSaveAs, printTarget, windowMetaData }: RealMenuBarProps) {
	const [isSaveAsDialogOpen, setIsSaveAsDialogOpen] = useState(false);
	const { closeWindow } = useWindowManager();
	const [newFileName, setNewFileName] = useState("");

	function saveAsHandler() {
		onSaveAs?.(newFileName);
		setNewFileName("");
		setIsSaveAsDialogOpen(false);
	}
	function printHandler() {
		if (printTarget?.current) {
			printTarget.current.classList.add("section-to-print");
		}
		window.print();
		if (printTarget?.current) {
			printTarget.current.classList.remove("section-to-print");
		}
	}
	function closeWindowHandler() {
		closeWindow(windowMetaData);
	}
	return (
		<>
			<div className="flex flex-row px-1 py-0.5 gap-5 cursor-default">
				<Dialog open={isSaveAsDialogOpen} onOpenChange={setIsSaveAsDialogOpen}>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<p>File</p>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="z-2147483640 bg-[#ece9d8] rounded-none ml-26">
							<DropdownMenuGroup className="border-b border-b-gray-300">
								<DropdownMenuItem className="cursor-not-allowed text-gray-500">New</DropdownMenuItem>
								<DropdownMenuItem className="cursor-not-allowed text-gray-500">Open...</DropdownMenuItem>
								<DropdownMenuItem onClick={onSave}>Save</DropdownMenuItem>
								<DropdownMenuItem>
									<DialogTrigger>Save as...</DialogTrigger>
								</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuGroup className="border-b border-b-gray-300">
								<DropdownMenuSeparator />
								<DropdownMenuItem className="cursor-not-allowed text-gray-500">Share File</DropdownMenuItem>
								<DropdownMenuItem onClick={printHandler}>Print</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuGroup>
								<DropdownMenuSeparator />
								<DropdownMenuItem onClick={closeWindowHandler}>Exit</DropdownMenuItem>
							</DropdownMenuGroup>
						</DropdownMenuContent>
					</DropdownMenu>
					<DialogContent
						showCloseButton={false}
						className="m-0 p-0 border-0 rounded-b-none [box-shadow:inset_-1px_-1px_#00138c,inset_1px_1px_#0831d9,inset_-2px_-2px_#001ea0,inset_2px_1px_#166aee,inset_-3px_-2px_#003bda,inset_3px_4px_#0855dd] rounded-tl-lg rounded-tr-lg pl-px pr-px pt-px pb-px antialiased shadow-[inset_-1px_-1px_#0a0a0a,inset_1px_1px_#dfdfdf,var(--border-window-inner)] border-t-[1px_solid_#0831d9] border-l-[1px_solid_#0831d9] border-r-[1px_solid_#001ea0] text-[13px] w-full max-h-[calc(100vh-40px)]">
						<DialogHeader className="font-['Trebuchet_MS'] bg-[linear-gradient(180deg,rgba(9,151,255,1)_0%,rgba(0,83,238,1)_8%,rgba(0,80,238,1)_40%,rgba(0,102,255,1)_88%,rgba(0,102,255,1)_93%,rgba(0,91,255,1)_95%,rgba(0,61,215,1)_96%,rgba(0,61,215,1)_100%)] rounded-tl-lg rounded-tr-lg text-[13px] h-7 w-full px-2">
							<DialogTitle className="text-white font-bold text-sm [text-shadow:1px_1px_#0f1089] mt-1 select-none">Save as</DialogTitle>
						</DialogHeader>

						<div className="p-2 pl-6">
							<p className="font-['Trebuchet_MS'] select-none text-md font-bold mb-2">File Name</p>
							<Input
								type="text"
								className="border border-gray-400 rounded px-2 py-1 w-full"
								placeholder="Enter new file name"
								value={newFileName}
								onChange={(e) => setNewFileName(e.target.value)}
							/>
							<span className="mt-4 flex justify-end gap-2">
								<Button onClick={() => setIsSaveAsDialogOpen(false)} size="sm" variant="system">
									Cancel
								</Button>
								<Button onClick={saveAsHandler} size="sm" variant="system">
									Save
								</Button>
							</span>
						</div>
					</DialogContent>
				</Dialog>

				{items.map((item, index) => (
					<p className={cn("text-gray-600")} key={index}>
						{item}
					</p>
				))}
			</div>
		</>
	);
}
