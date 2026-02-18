"use client";

import { useEffect, useState } from "react";

function formatTime(date: Date) {
	const hours = date.getHours().toString().padStart(2, "0");
	const minutes = date.getMinutes().toString().padStart(2, "0");
	return `${hours}:${minutes}`;
}

export default function Clock() {
	const [time, setTime] = useState(() => formatTime(new Date()));

	useEffect(() => {
		const tick = () => setTime(formatTime(new Date()));
		tick(); // sync immediately on mount

		const interval = setInterval(tick, 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div
			className="
        w-16 h-full
        flex items-center justify-center
        font-semibold text-white
        text-sm
        select-none
      ">
			{time}
		</div>
	);
}
