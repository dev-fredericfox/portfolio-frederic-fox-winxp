"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
type WindowCloseButtonProps = {
	disabled?: boolean;
	onClose: () => void;
};
export default function WindowCloseButton({ disabled = false, onClose }: WindowCloseButtonProps) {
	const [hovered, setHovered] = useState(false);
	const [pressed, setPressed] = useState(false);

	let src = "/xp-icons/close.svg";
	if (pressed && !disabled) {
		src = "/xp-icons/close-active.svg";
	} else if (hovered && !disabled) {
		src = "/xp-icons/close-hover.svg";
	}

	function mouseDownHandler() {
		setPressed(true);
	}

	return (
		<Button
			variant={"windowControl"}
			size={"windowControl"}
			aria-label="Close"
			disabled={disabled}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => {
				setHovered(false);
				setPressed(false);
			}}
			onMouseDown={mouseDownHandler}
			onMouseUp={() => setPressed(false)}
			onClick={onClose}>
			<Image src={src} alt="" width={24} height={24} draggable={false} />
		</Button>
	);
}
