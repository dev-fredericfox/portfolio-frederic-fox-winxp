"use client";
import { useState, MouseEvent } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
type WindowCloseButtonProps = {
	disabled?: boolean;
	onMinimize: (e: MouseEvent<HTMLButtonElement>) => void;
};
export default function WindowMinimizeButton({ disabled = false, onMinimize }: WindowCloseButtonProps) {
	const [hovered, setHovered] = useState(false);
	const [pressed, setPressed] = useState(false);

	let src = "/xp-icons/minimize.svg";
	if (pressed && !disabled) {
		src = "/xp-icons/minimize-active.svg";
	} else if (hovered && !disabled) {
		src = "/xp-icons/minimize-hover.svg";
	}

	function mouseDownHandler() {
		setPressed(true);
	}

	return (
		<Button
			variant={"windowControl"}
			size={"windowControl"}
			aria-label="Minimize"
			disabled={disabled}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => {
				setHovered(false);
				setPressed(false);
			}}
			onMouseDown={mouseDownHandler}
			onMouseUp={() => setPressed(false)}
			onClick={onMinimize}
			data-action="minimize"
			className="hidden lg:block">
			<Image src={src} alt="" width={24} height={24} draggable={false} />
		</Button>
	);
}
