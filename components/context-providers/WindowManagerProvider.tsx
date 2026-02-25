"use client";
import { WindowMetaData } from "@/lib/WindowMetaData";
import { createContext, useState, ReactNode, use, useCallback, useRef } from "react";
type WindowManagerProviderProps = {
	children: ReactNode;
};
const TIME_OFFSET = 1768784300000;
type WindowManagerContextType = {
	addWindow: (window: WindowMetaData) => void;
	closeWindow: (window: WindowMetaData | null) => void;
	closeWindowByName: (windowName: string) => void;
	editingName: string | null;
	findById: (id: string) => WindowMetaData | null;
	getFocusedWindow: () => WindowMetaData | null;
	getOnCloseHook: (id: string) => (() => void) | undefined;
	getZIndex: (window: WindowMetaData) => number;
	openWindows: WindowMetaData[];
	registerOnCloseHook: (id: string, hook?: () => void) => void;
	resetZIndex: (window: WindowMetaData) => void;
	selectedIcon: WindowMetaData | null;
	selectedIconId: string | null;
	setEditingName: (editingName: string | null) => void;
	setOpenWindows: (windowIds: WindowMetaData[]) => void;
	setSelectedIcon: (icon: WindowMetaData | null) => void;
	setSelectedIconId: (id: string | null) => void;
	updateZIndex: (window: WindowMetaData) => void;
};

/**
 * The entire timestamp is too long for CSS, so we slice it to get the last 6 digits. This should be sufficient for our use case, as it will still provide a unique and incrementing z-index for windows opened within a reasonable timeframe.
 */
const Z_INDEX_LENGTH = 6;

const WindowManagerContext = createContext<WindowManagerContextType | null>(null);

const WindowManagerProvider = ({ children }: WindowManagerProviderProps) => {
	const [openWindows, _setOpenWindows] = useState<WindowMetaData[]>([]);
	const [selectedIconId, _setSelectedIconId] = useState<string | null>(null);
	const [selectedIcon, _setSelectedIcon] = useState<WindowMetaData | null>(null);
	const [windowZIndices, setWindowZIndices] = useState<{ [key: string]: number }>({});
	const [editingName, setEditingName] = useState<string | null>(null);
	const closeHooks = useRef(new Map<string, () => void>());
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
		const shortZIndex = Number(String(num).slice(-Z_INDEX_LENGTH));
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
		setEditingName(null);
	}

	function setSelectedIcon(icon: WindowMetaData | null) {
		_setSelectedIcon(icon);
		setEditingName(null);
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

	function registerOnCloseHook(id: string, hook?: () => void) {
		if (!hook) closeHooks.current.delete(id);
		else closeHooks.current.set(id, hook);
	}

	function getOnCloseHook(id: string) {
		return closeHooks.current.get(id);
	}

	return (
		<WindowManagerContext.Provider
			value={{
				addWindow,
				closeWindow,
				closeWindowByName,
				editingName,
				findById,
				getFocusedWindow,
				getOnCloseHook,
				getZIndex,
				openWindows,
				registerOnCloseHook,
				resetZIndex,
				selectedIcon,
				selectedIconId,
				setEditingName,
				setOpenWindows,
				setSelectedIcon,
				setSelectedIconId,
				updateZIndex,
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
