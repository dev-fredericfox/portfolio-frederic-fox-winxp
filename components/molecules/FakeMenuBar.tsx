import { cn } from "@/lib/utils";

type FakeMenuBarProps = {
	items?: string[];
	variant?: "active" | "inactive";
};
const defaultItems = ["File", "Edit", "View", "Help"];
export default function FakeMenuBar({ items = defaultItems, variant = "active" }: FakeMenuBarProps) {
	return (
		<div className="flex flex-row px-1 py-0.5 gap-5 cursor-default">
			{items.map((item, index) => (
				<p className={cn(variant !== "active" ? "text-gray-600" : "")} key={index}>
					{item}
				</p>
			))}
		</div>
	);
}
