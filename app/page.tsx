import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { MinusCircleIcon } from "lucide-react";
import Image from "next/image";
import { libreFranklin } from "./layout";
import Link from "next/link";

export default function Home() {
	return (
		<main className="flex w-full h-screen flex-col select-none">
			{/* Header */}
			<div className="h-20 md:h-28 w-full bg-[#00309C]" />
			<div className="flex flex-col w-full flex-1 bg-[#5A7EDC]">
				{/* Gradient Separator */}
				<div className="h-1 bg-linear-to-r from-transparent via-white to-transparent" />
				{/* Content Area */}
				<div className="grid flex-1 w-full grid-cols-1 lg:grid-cols-[1fr_120px_1fr]">
					<div className="flex flex-col items-center lg:items-end justify-center">
						<p className={cn(libreFranklin.className, "text-white text-3xl md:text-4xl font-bold italic drop-shadow-sm/30")}>Microsoft</p>
						<p className={cn(libreFranklin.className, "text-white text-5xl md:text-6xl font-bold italic drop-shadow-sm/30")}>
							Windows <span className="align-super text-2xl text-orange-400 drop-shadow-sm/30">XP</span>
						</p>
						<p className={cn(libreFranklin.className, "text-white text-sm md:text-lg font-bold mt-5 lg:mt-10")}>To begin exploring my portfolio, click your username</p>
					</div>
					<span className="h-0.5 w-full lg:h-full lg:w-0.5 mx-auto bg-linear-to-r lg:bg-linear-to-b via-white" />
					<div className="flex items-center justify-center md:justify-start md:pr-10">
						{/* Vertical Gradient */}
						<div className="flex flex-row items-center h-34.5 w-full bg-linear-to-r from-white via-white to-transparent rounded-bl-md rounded-tl-md p-px mx-4 md:mx-40 lg:mx-0">
							<div className="flex md:flex-row items-top h-34 w-full bg-linear-to-r from-blue-800 via-blue-700 to-transparent rounded-bl-md rounded-tl-md p-4">
								<Avatar className="rounded-lg border-3 border-amber-400">
									<Link href="/portfolio">
										<AvatarImage className="h-25 w-25" src="/me-square-DO-NOT-GO-LIVE.jpeg" alt="User Avatar" />
										<AvatarFallback className="h-10 w-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">UF</AvatarFallback>
									</Link>
								</Avatar>
								<Link href="/portfolio" className="flex flex-col">
									<h1 className="text-white text-xl md:text-3xl font-semibold ml-4">Frederic Fox</h1>
									<h2 className="text-gray-400 text-sm md:text-xl font-semibold ml-4">Software Developer</h2>
								</Link>
							</div>
						</div>
					</div>
				</div>
				{/* Gradient Separator */}
				<div className="h-1 bg-linear-to-r from-transparent via-[#E6AA2E] to-transparent" />
			</div>
			{/* Footer */}
			<div className="h-20 md:h-28 w-full bg-[#00309C]">
				<div className="mt-6 ml-6 flex flex-row items-center">
					<div className="cursor-pointer">
						<Image className="absolute" src="/shut-down.svg" alt="Shut Down Icon" width={36} height={36} />
						<span className="absolute border-2 rounded-lg w-9 h-9 shadow-lg" />
						<MinusCircleIcon className={cn("h-6 w-6 text-white rotate-90 ml-1.5 mt-1.5")} />
					</div>
					<p className="text-white text-xl font-bold ml-4 cursor-pointer mt-1">Turn Off Computer</p>
				</div>
			</div>
		</main>
	);
}
