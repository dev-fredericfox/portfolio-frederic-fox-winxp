import { ContextMenuContent, ContextMenuGroup, ContextMenuItem, ContextMenuShortcut } from "../ui/context-menu";

export default function InertFileDropdown() {
	return (
		<ContextMenuContent className="border rounded-none">
			<ContextMenuGroup>
				<ContextMenuItem disabled>
					Copy
					<ContextMenuShortcut>⌘C</ContextMenuShortcut>
				</ContextMenuItem>
				<ContextMenuItem disabled>
					Cut
					<ContextMenuShortcut>⌘X</ContextMenuShortcut>
				</ContextMenuItem>
				<ContextMenuItem disabled>
					Rename
					<ContextMenuShortcut>F2</ContextMenuShortcut>
				</ContextMenuItem>
				<ContextMenuItem disabled>
					Delete
					<ContextMenuShortcut>⌘⌫</ContextMenuShortcut>
				</ContextMenuItem>
			</ContextMenuGroup>
		</ContextMenuContent>
	);
}
