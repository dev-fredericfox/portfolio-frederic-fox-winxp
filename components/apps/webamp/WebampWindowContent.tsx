"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type WebampType from "webamp";
import { useWindowManager } from "@/components/context-providers/WindowManagerProvider";
import { WindowMetaData } from "@/lib/WindowMetaData";
import { WEBAMP_PLAYLIST } from "./Tracklist";

type Props = {
	windowName: string;
	windowMetaData: WindowMetaData;
};

type WebampInstance = WebampType;

export default function WebampWindowContent({ windowName, windowMetaData }: Props) {
	const { closeWindowByName, getZIndex, updateZIndex } = useWindowManager();

	const containerRef = useRef<HTMLDivElement | null>(null);
	const webampRef = useRef<WebampInstance | null>(null);

	// Store the injected #webamp element in state so effects can react to it.
	const [webampEl, setWebampEl] = useState<HTMLElement | null>(null);
	const [supported, setSupported] = useState(true);

	// Stable callback (safe to put in deps and to add/remove as an event listener)
	const bringToFront = useCallback(() => {
		updateZIndex(windowMetaData);
	}, [updateZIndex, windowMetaData]);

	// Compute zIndex as a primitive value; avoid recreating style objects every render.
	const zIndex = getZIndex(windowMetaData);

	// Memoize the style object (optional, but keeps things tidy)
	const webampStyle = useMemo<Partial<CSSStyleDeclaration>>(
		() => ({ zIndex: String(zIndex) }), // CSSStyleDeclaration values are strings
		[zIndex],
	);

	// Init Webamp: run once per mount (unless windowName/closeWindowByName changes),
	// but DON'T re-run just because bringToFront changes.
	useEffect(() => {
		let cancelled = false;
		async function init() {
			const { default: Webamp } = await import("webamp");
			if (cancelled) return;

			if (!Webamp.browserIsSupported()) {
				setSupported(false);
				return;
			}

			const webamp = new Webamp({
				initialTracks: [...WEBAMP_PLAYLIST],
				availableSkins: [
					{ url: "/webamp/skins/internetArchive.wsz", name: "Internet Archive" },
					{ url: "/webamp/skins/TopazAmp1-2.wsz", name: "Topaz" },
				],
			});

			webamp.onClose(() => {
				closeWindowByName(windowName);
			});

			webampRef.current = webamp;

			if (!containerRef.current) return;

			try {
				await webamp.renderWhenReady(containerRef.current);
				if (cancelled) return;

				// Grab the injected element and put it in state
				const el = document.body.querySelector<HTMLElement>("#webamp");
				console.log("Webamp element injected:", el);
				setWebampEl(el ?? null);
			} catch (error) {
				console.error("Error rendering Webamp:", error);
			}
		}

		init();
		bringToFront();

		return () => {
			cancelled = true;

			// Remove listener from the injected element (if it exists)
			setWebampEl((prev) => {
				prev?.removeEventListener("mousedown", bringToFront);
				return prev;
			});

			try {
				webampRef.current?.close?.();
			} catch {
				// ignore
			}
			webampRef.current = null;
		};
		// Note: bringToFront is intentionally NOT in deps here to avoid re-init loops.
		// It *is* used in cleanup via the stable useCallback.
	}, [windowName, closeWindowByName, bringToFront]);

	// Bind/unbind the listener when the injected element appears/changes.
	useEffect(() => {
		if (!webampEl) return;
		webampEl.addEventListener("mousedown", bringToFront);
		return () => {
			webampEl.removeEventListener("mousedown", bringToFront);
			webampEl.remove();
		};
		// delete webampEl from dom
	}, [webampEl, bringToFront]);

	// Apply zIndex style whenever zIndex or element changes.
	useEffect(() => {
		if (!webampEl) return;
		Object.assign(webampEl.style, webampStyle);
	}, [webampEl, webampStyle]);

	if (!supported) {
		return <p>Webamp is not supported in this browser.</p>;
	}

	return <div ref={containerRef} />;
}
