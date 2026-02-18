"use client";
import { WindowMetaData } from "@/lib/WindowMetaData";
import { createContext, useState, ReactNode, use, useCallback } from "react";
type WindowManagerProviderProps = {
	children: ReactNode;
};
const TIME_OFFSET = 1768784300000;
type WindowManagerContextType = {
	openWindows: WindowMetaData[];
	setOpenWindows: (windowIds: WindowMetaData[]) => void;
	addWindow: (window: WindowMetaData) => void;
	closeWindow: (window: WindowMetaData | null) => void;
	findById: (id: string) => WindowMetaData | null;
	selectedIconId: string | null;
	setSelectedIconId: (id: string | null) => void;
	getZIndex: (window: WindowMetaData) => number;
	updateZIndex: (window: WindowMetaData) => void;
	resetZIndex: (window: WindowMetaData) => void;
	closeWindowByName: (windowName: string) => void;
	getFocusedWindow: () => WindowMetaData | null;
};

const WindowManagerContext = createContext<WindowManagerContextType | null>(null);

const WindowManagerProvider = ({ children }: WindowManagerProviderProps) => {
	const [openWindows, _setOpenWindows] = useState<WindowMetaData[]>([]);
	const [selectedIconId, _setSelectedIconId] = useState<string | null>(null);
	const [windowZIndices, setWindowZIndices] = useState<{ [key: string]: number }>({});
	function setOpenWindows(windows: WindowMetaData[]) {
		_setOpenWindows(windows);
	}
	const addWindow = useCallback(
		(window: WindowMetaData) => {
			// Add unique windows only
			if (openWindows.find((win) => win.name === window.name)) return;
			const amountOfWindowsOpen = openWindows.length;
			window.setPositionIncremented(amountOfWindowsOpen);
			setWindowZIndices((prev) => ({ ...prev, [window.id]: Date.now() - TIME_OFFSET }));
			_setOpenWindows((prev) => [...prev, window]);
		},
		[openWindows],
	);

	const updateZIndex = useCallback((window: WindowMetaData) => {
		setWindowZIndices((prev) => {
			const newZIndex = Date.now() - TIME_OFFSET;
			return { ...prev, [window.id]: newZIndex };
		});
	}, []);
	const resetZIndex = useCallback((window: WindowMetaData) => {
		setWindowZIndices((prev) => {
			const newZIndex = 0;
			return { ...prev, [window.id]: newZIndex };
		});
	}, []);

	function getZIndex(window: WindowMetaData) {
		const num = windowZIndices[window.id];
		const shortZIndex = Number(String(num).slice(-6));
		return shortZIndex;
	}

	function closeWindow(window: WindowMetaData | null) {
		_setOpenWindows((prev) => prev.filter((win) => win !== window));
	}

	const closeWindowByName = useCallback((windowName: string) => {
		_setOpenWindows((prev) => {
			return prev.filter((win) => win.name !== windowName);
		});
	}, []);

	function findById(id: string) {
		return openWindows.find((win) => win.id === id) || null;
	}

	function setSelectedIconId(id: string | null) {
		_setSelectedIconId(id);
	}

	function getFocusedWindow() {
		let focusedWindow: WindowMetaData | null = null;
		let highestZIndex = -1;
		openWindows.forEach((window) => {
			const zIndex = getZIndex(window);
			if (zIndex > highestZIndex && zIndex !== 0) {
				highestZIndex = zIndex;
				focusedWindow = window;
			}
		});
		return focusedWindow;
	}

	return (
		<WindowManagerContext.Provider
			value={{
				openWindows,
				setOpenWindows,
				addWindow,
				closeWindow,
				closeWindowByName,
				findById,
				selectedIconId,
				setSelectedIconId,
				getZIndex,
				updateZIndex,
				resetZIndex,
				getFocusedWindow,
			}}>
			{children}
		</WindowManagerContext.Provider>
	);
};

export { WindowManagerContext, WindowManagerProvider };

export function useWindowManager() {
	const context = use(WindowManagerContext);
	if (!context) {
		throw new Error("useWindowManager must be used within a WindowManagerProvider");
	}
	return context;
}
