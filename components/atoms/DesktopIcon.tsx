import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { signika } from "@/app/layout";
import Image from "next/image";

type DesktopIconProps = {
	id: string;
	selectedId: string | null;
	setSelectedId: (id: string | null) => void;
	onOpen: () => void;
	label: string;
	imageUrl?: string;
	iconsComponent?: React.ReactNode;
	imageAlt: string;
	imageTitle?: string;
};

export function DesktopIcon({ id, selectedId, setSelectedId, onOpen, label, imageUrl, iconsComponent, imageAlt, imageTitle }: DesktopIconProps) {
	const isSelected = selectedId === id;

	return (
		<Button
			variant="technical"
			size="desktop-icon"
			type="button"
			onClick={(e) => {
				e.stopPropagation();
				setSelectedId(id);
			}}
			onDoubleClick={(e) => {
				e.stopPropagation();
				setSelectedId(null);
				onOpen();
			}}
			onTouchEnd={(e) => {
				e.stopPropagation();
				setSelectedId(null);
				onOpen();
			}}
			onKeyDown={(e) => {
				if (e.key === "Enter") onOpen();
			}}
			aria-selected={isSelected}
			data-selected={isSelected ? "true" : "false"}
			className={cn("focus:outline-none group")}>
			{/* Icon wrapper: apply “XP-ish tint” via filter when selected */}
			<span
				className={cn(
					"block",
					// Approximates XP's selected icon rendering: pushes luminance up and shifts hues toward blue.
					"group-data-[selected=true]:filter-[brightness(1.05)_contrast(0.95)_saturate(1.35)_hue-rotate(200deg)]",
				)}>
				{imageUrl ? (
					<Image
						src={imageUrl}
						alt={imageAlt}
						title={imageTitle}
						width={40}
						height={40}
						className="pointer-events-none h-10 w-10 md:h-12 lg:h-12 md:w-24 lg:w-24 object-contain"
					/>
				) : (
					iconsComponent
				)}
			</span>

			{/* Caption: XP blue highlight with white text */}
			<p
				className={cn(
					"text-[16px] text-center mt-1 pointer-events-none w-40 overflow-hidden px-1",
					signika.className,

					// XP desktop captions are always white
					"text-white",

					// XP halo (always on)
					"[text-shadow:1px_0_#000,-1px_0_#000,0_1px_#000,0_-1px_#000]",

					// Only selection adds the blue plate
					"group-data-[selected=true]:bg-[#0a64d0]",
					"group-data-[selected=true]:shadow-[inset_0_0_0_1px_#003c7e]",
					"group-data-[selected=true]:rounded-[2px]",
				)}>
				{label}
			</p>
		</Button>
	);
}
