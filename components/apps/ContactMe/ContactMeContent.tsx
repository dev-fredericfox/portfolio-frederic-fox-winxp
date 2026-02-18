import Hr from "@/components/atoms/Hr";
import { cn } from "@/lib/utils";
import { MailIcon } from "lucide-react";
import Image from "next/image";

export default function ContactMeContent() {
	return (
		<div className="p-4 w-full">
			<div className="flex flex-row gap-4">
				<Image src="/app-icons/fax.png" alt="Contact Me Icon" width={64} height={64} className="mb-4" />
				<div>
					<h1 className="text-2xl font-bold mb-0">Contact Information</h1>
					<h2 className="text-xl font-semibold mb-2">Get in touch with me</h2>
				</div>
			</div>
			<div className="flex flex-col gap-2 mt-6">
				<div className="flex flex-row">
					<MailIcon className="inline-block ml-px mr-2 mt-1" size={16} />
					<input
						type="text"
						readOnly
						autoFocus
						onFocus={(e) => e.target.select()}
						className={cn("relative z-2", "bg-[rgb(252,252,254)]", "border border-[rgb(145,155,156)]", "px-1 py-0.5", "outline-none", "w-60", "select-invert")}
						value="ask.frederic.fox@gmail.com"
					/>
				</div>
				<div className="flex flex-row gap-2 items-center">
					<p className="font-bold w-4 text-center text-xs">LI</p>
					<a href="https://www.linkedin.com/in/foxfrederic" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline user-select-text">
						https://www.linkedin.com/in/foxfrederic
					</a>
				</div>
				<div className="flex flex-row gap-2 items-center">
					<p className="font-bold w-4 text-center text-xs">GH</p>
					<a href="https://github.com/dev-fredericfox" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline user-select-text">
						https://github.com/dev-fredericfox
					</a>
				</div>
				<Hr />
				<div className={cn("relative z-2", "bg-[rgb(252,252,254)]", "border border-[rgb(145,155,156)]", "p-3.5", "outline-none")}>
					<p>Feel free to reach out via email or connect with me on LinkedIn and GitHub for any inquiries or collaboration opportunities.</p>
				</div>
			</div>
		</div>
	);
}
