import React from "react";
import { useDroppable } from "@dnd-kit/core";
type DesktopWindowContainerProps = {
	children: React.ReactNode;
};
export default function DesktopDropZone({ children }: DesktopWindowContainerProps) {
	const { setNodeRef } = useDroppable({
		id: "droppable",
	});
	const style = {};

	return (
	<div ref={setNodeRef} style={style} className="min-h-full">
			{children}
		</div>
	);
}
