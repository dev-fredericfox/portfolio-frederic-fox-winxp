import FakeMenuBar from "@/components/molecules/FakeMenuBar";
import BrickwiseIcon from "./BrickwiseIcon";
import EFIIcon from "./EFIIcon";
import KrakenkindIcon from "./KrakenkindIcon";
import KundNIcon from "./KundNIcon";
import VfBIcon from "./VfBIcon";
import YumIcon from "./YumIcon";
import Hr from "@/components/atoms/Hr";

export function ClientProjectsContent() {
	return (
		<div className="w-full">
			<FakeMenuBar variant="inactive" />
			<Hr className="mt-1 mb-0" />
			<div className="bg-white h-full">
				<div className="flex flex-row flex-wrap items-start max-[376px]:gap-0 max-[391px]:gap-1 gap-2 sm:gap-6 md:gap-8 lg:gap-8 p-6 ">
					<EFIIcon />
					<VfBIcon />
					<KundNIcon />
					<YumIcon />
					<BrickwiseIcon />
					<KrakenkindIcon />
				</div>
			</div>
		</div>
	);
}
