"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
type WindowCloseButtonProps = {
	disabled?: boolean;
	onMaximize: () => void;
};
export default function WindowMaximizeButton({ disabled = false, onMaximize }: WindowCloseButtonProps) {
	const [hovered, setHovered] = useState(false);
	const [pressed, setPressed] = useState(false);

	let src = "/xp-icons/maximize.svg";
	if (pressed && !disabled) {
		src = "/xp-icons/maximize-active.svg";
	} else if (hovered && !disabled) {
		src = "/xp-icons/maximize-hover.svg";
	}

	function mouseDownHandler() {
		setPressed(true);
	}

	return (
		<Button
			variant={"windowControl"}
			size={"windowControl"}
			aria-label="Maximize"
			disabled={disabled}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => {
				setHovered(false);
				setPressed(false);
			}}
			onMouseDown={mouseDownHandler}
			onMouseUp={() => setPressed(false)}
			onClick={onMaximize}>
			<Image src={src} alt="" width={24} height={24} draggable={false} />
		</Button>
	);
}
