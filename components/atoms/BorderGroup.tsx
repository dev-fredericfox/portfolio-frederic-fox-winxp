type BorderGroupProps = {
	title: string;
	children: React.ReactNode;
};
export default function BorderGroup({ title, children }: BorderGroupProps) {
	return (
		<fieldset className="border border-[#d0d0bf] rounded-sm py-2 px-3">
			<legend className="text-[#0046d5] p-1 bg-transparent">{title}</legend>
			{children}
		</fieldset>
	);
}
