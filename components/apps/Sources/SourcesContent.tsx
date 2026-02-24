import FakeMenuBar from "@/components/molecules/FakeMenuBar";
import { cn } from "@/lib/utils";

export function SourcesContent() {
	return (
		<div className={cn("leading-relaxed", "text-black", "min-h-full grow w-full")}>
			<FakeMenuBar />
			<div className={cn("bg-white", "border border-[#7F9DB9]", "font-[Tahoma,Arial,sans-serif]", "text-[13px]", " h-full grow")}>
				<div className="whitespace-pre-wrap p-4 w-full select-text">
					{`
“There is no such thing as a new idea. It is impossible. We simply take a lot of old ideas and put them into a sort of mental kaleidoscope.”
- Mark Twain
					
Windows Icons: https://www.deviantart.com/marchmountain/art/Windows-XP-High-Resolution-Icon-Pack-916042853

Windows XP CSS Inspiration: 
https://github.com/botoxparty/XP.css
https://github.com/nielssp/classic-stylesheets/tree/9ebd2d84664095345097a71e1a137f985d03d4f2

Other inspiration:
https://dev.to/mahmudulahsan/building-a-nostalgic-windows-xp-portfolio-with-nextjs-16-shadcn-3dcn

Webamp: https://webamp.org/  
`}
				</div>
			</div>
		</div>
	);
}
