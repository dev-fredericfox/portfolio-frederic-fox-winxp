import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type DesktopIconProps = {
	onOpen: () => void;
	label: string;
	tagLine?: string;
	iconComponent?: React.ReactNode;
	imageUrl?: string;
	imageAlt: string;
	imageTitle?: string;
};

export function StartMenuItem({ onOpen, label, tagLine, iconComponent, imageUrl, imageAlt, imageTitle }: DesktopIconProps) {
	return (
		<Button
			variant="technical"
			size="desktop-icon"
			type="button"
			onClick={() => {
				onOpen();
			}}
			onTouchEnd={() => {
				onOpen();
			}}
			onKeyDown={(e) => {
				if (e.key === "Enter") onOpen();
			}}
			// Center horizontally, align left vertically
			className={cn("focus:outline-none group flex flex-row items-center")}>
			{/* Icon wrapper: apply “XP-ish tint” via filter when selected */}
			<span className={cn("block")}>
				{imageUrl ? (
					<Image src={imageUrl} alt={imageAlt} title={imageTitle} width={36} height={36} className="pointer-events-none h-10 w-10 object-contain" />
				) : (
					<div className={cn("w-10 h-10 flex items-center justify-center")}>{iconComponent}</div>
				)}
			</span>

			{/* Caption: XP blue highlight with white text */}
			<div>
				<p className={cn("text-[16px] text-start pointer-events-none overflow-hidden px-1", "text-black font-bold text-sm")}>{label}</p>
				<p className={cn("text-[16px] text-start pointer-events-none overflow-hidden px-1", "text-black text-xs")}>{tagLine}</p>
			</div>
		</Button>
	);
}
