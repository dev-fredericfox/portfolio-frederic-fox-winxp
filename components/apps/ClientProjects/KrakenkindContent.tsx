import { envs } from "@/lib/envs";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function KrakenkindContent() {
	return (
		<div
			className={cn(
				"bg-white",
				"border border-[#7F9DB9]",
				"p-4",
				"font-[Tahoma,Arial,sans-serif]",
				"text-[13px]",
				"leading-relaxed",
				"text-black",
				"w-full select-text",
			)}>
			{/* Header row: logos + classification */}
			<div className="flex items-start justify-between gap-4">
				<div className="flex items-center gap-3">
					{/* Replace these paths with your actual assets */}
					<Image
						src={`${envs.NEXT_PUBLIC_BASE_PATH}/app-icons/Krakenkind-Cropped.png`}
						alt="Krakenkind Logo"
						className="h-9 w-auto"
						draggable={false}
						width={330 * 2}
						height={100 * 2}
					/>
				</div>

				<div className="text-right">
					<div className="inline-flex flex-col items-end gap-1">
						<div className="text-[11px] tracking-wide">DOC ID: KRAK-OPS-REPORT-006</div>
						<div className="relative"></div>
						<div className="text-[11px]">DISTRIBUTION: PUBLIC</div>
					</div>
				</div>
			</div>
			<hr className="my-3 border-[#7F9DB9]" />
			<div className="w-full text-right mb-4">
				<p>Berlin, Germany 2018 - 2023</p>
			</div>
			{/* Notepad-style text body */}
			<div className="whitespace-pre-wrap">
				{`Krakenkind
===============================

CLIENT
--------
Krakenkind was a brick and mortar and online retailer of international foods and drinks based in Germany, specializing on candies and snacks from around the world.

PROJECTS
--------
1) Internal Pick and Pack System
2) Shopify Frontend
3) Stock and Inventory Management


1) Internal Pick and Pack System
---------------
In order to reduce packing errors and speed up the fulfillment process, I developed an internal web application that guided warehouse workers through the pick and pack process and reduced errors with a barcode scan-based verification system.

Tech:
- Vanilla JavaScript, HTML, CSS
- Shopify API (GraphQl)
- Node.js for backend services


2) Shopify Frontend
-------------------
The public-facing online store was built using Shopify's platform, with a custom theme developed to match Krakenkind's branding and provide an optimal user experience.
The store had a whopping 4.9/5 star rating on Google Reviews with over 300 reviews.


3) Stock and Inventory Management
-------------------
A custom inventory management system that automatically reduced prices on items nearing their best-before date, helping to minimize waste and maximize sales.

Tech:
- Node.js
- Shopify API (GraphQl)
`}
			</div>
		</div>
	);
}
