import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function RunContent() {
	const [inputValue, setInputValue] = useState("");
	function openNewTab(url: string) {
		if (!/^https?:\/\//i.test(url)) {
			url = "http://" + url;
		}
		window.open(url, "_blank");
	}
	return (
		<div className="flex flex-row gap-2 w-full h-full py-2 px-2 justify-between">
			<Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} type="text" variant="winXPOneLine" placeholder="google.com..." />
			<Button onClick={() => openNewTab(inputValue)}>Run</Button>
		</div>
	);
}
