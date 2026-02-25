import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ClientDesktopProjectsProps, ClientProjectsProps, SavedNotes } from "./shared-types";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// Type guard to check placement
export function isDesktopPlacement(props: ClientProjectsProps): props is ClientDesktopProjectsProps {
	return props.placement === "desktop";
}

export const buildFileNameKey = (fileName: string | undefined) => fileName ?? "Edit Me";
type SaveAsOptions = {
	deletePrevious?: boolean;
};
export function saveAs(
	currentFileName: string,
	newFileName: string,
	setterFn_: React.Dispatch<React.SetStateAction<SavedNotes>>,
	{ deletePrevious }: SaveAsOptions,
): { success: boolean; errorMessage?: string } {
	const oldFileNameKey = buildFileNameKey(currentFileName);
	const newFileNameKey = buildFileNameKey(newFileName);

	let nameAlreadyExists = false;

	setterFn_((prev) => {
		if (newFileNameKey in prev) {
			nameAlreadyExists = true;
			return prev; // no-op
		}

		const oldContent = prev[oldFileNameKey];
		if (oldContent === undefined) {
			// Optional safety: nothing to save
			return prev;
		}

		if (deletePrevious) {
			const { [oldFileNameKey]: _, ...rest } = prev;
			return {
				...rest,
				[newFileNameKey]: oldContent,
			};
		}

		return {
			...prev,
			[newFileNameKey]: oldContent,
		};
	});

	if (nameAlreadyExists) {
		return {
			success: false,
			errorMessage: `A note named "${newFileName}" already exists.`,
		};
	}

	return { success: true };
}
