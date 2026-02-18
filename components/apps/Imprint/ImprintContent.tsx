import FakeMenuBar from "@/components/molecules/FakeMenuBar";
import { cn } from "@/lib/utils";

export function ImprintContent() {
	return (
		<div className={cn("leading-relaxed", "text-black", "min-h-full grow w-full")}>
			<FakeMenuBar />
			<div className={cn("bg-white", "border border-[#7F9DB9]", "font-[Tahoma,Arial,sans-serif]", "text-[13px]", " h-full grow")}>
				<div className="whitespace-pre-wrap p-4 w-full select-text">
					{`
Imprint

Information in accordance with Section 5 TMG

Frederic Fox
Freiburg, Germany

Contact

Email: ask.frederic.fox@gmail.com

Address: 

Hintere Dorfstr. 6
79588 Efringen-Kirchen
Germany
										
`}
				</div>
			</div>
		</div>
	);
}
