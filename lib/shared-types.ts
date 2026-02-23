export type ClientDesktopProjectsProps = {
	placement?: "desktop";
};
export type ClientStartMenuProjectsProps = {
	placement: "start-menu";
	/** Close the start menu callback */
	closeStartMenuCb: () => void;
};

export type ClientProjectsProps = ClientDesktopProjectsProps | ClientStartMenuProjectsProps;

export type SavedNotes = Record<string, string>;
