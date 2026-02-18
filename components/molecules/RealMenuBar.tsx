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
					<DialogContent>
						<DialogHeader>
							<DialogTitle>File Name</DialogTitle>
							<DialogDescription>
								<Input
									type="text"
									className="border border-gray-400 rounded px-2 py-1 w-full"
									placeholder="Enter new file name"
									value={newFileName}
									onChange={(e) => setNewFileName(e.target.value)}
								/>
								<div className="mt-4 flex justify-end gap-2">
									<Button onClick={() => setIsSaveAsDialogOpen(false)}>Cancel</Button>
									<Button onClick={saveAsHandler}>Save</Button>
								</div>
							</DialogDescription>
						</DialogHeader>
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
