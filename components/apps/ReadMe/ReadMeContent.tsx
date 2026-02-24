import FakeMenuBar from "@/components/molecules/FakeMenuBar";
import { cn } from "@/lib/utils";

export function ReadMeContent() {
	return (
		<div className={cn("leading-relaxed", "text-black", "min-h-full grow w-full")}>
			<FakeMenuBar />
			<div className={cn("bg-white", "border border-[#7F9DB9]", "font-[Tahoma,Arial,sans-serif]", "text-[13px]", " h-full grow", "overflow-x-scroll")}>
				<div className="whitespace-pre-wrap p-4 w-full select-text">
					{`Hello there! 

My Name is Frédéric Fox, I am half french, half german and currently working as a freelance fullstack developer based in the south of Germany.

My passion for technology started over 25 years ago. I was just a child when I deleted system32 while trying to clear up space on my Windows 95 PC to install Tomb Raider. Since then, be it swapping my CPU, listening to dial-up or trying to fathom networking in order to play C&C with friends, I have been fascinated by computers and software.

I read my first HTML book with 14 and started building websites, games and assembling computers for friends ever since.

After my first job, My business-partner and I founded an online marketing agency in 2015, which I successfully ran for 5 years. In 2019 we then founded a brick-and-mortar and online retailer of international foods and drinks in Berlin, which I managed until 2023.

After having taken a short break from founding, I am now pursuing a passion project: slowly bootstrapping a small Gaming-Studio.

Please feel free to browse my CV, customers, or listen to some Lo-Fi beats while exploring my desktop.
                                        
`}
				</div>
			</div>
		</div>
	);
}
