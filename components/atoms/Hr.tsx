import { cn } from "@/lib/utils";

type HrProps = {} & React.HTMLAttributes<HTMLHRElement>;

export default function Hr({ className, ...props }: HrProps) {
	return <hr className={cn("border-t border-t-[#aca899] border-b border-b-[#ffffff] my-4", className)} {...props} />;
}
