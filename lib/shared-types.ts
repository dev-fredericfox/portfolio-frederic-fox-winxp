export type ClientDesktopProjectsProps = {
	selectedId: string | null;
	setSelectedId: (id: string | null) => void;
	placement?: "desktop";
};
export type ClientStartMenuProjectsProps = {
	placement: "start-menu";
	/** Close the start menu callback */
	closeStartMenuCb: () => void;
};

export type ClientProjectsProps = ClientDesktopProjectsProps | ClientStartMenuProjectsProps;
