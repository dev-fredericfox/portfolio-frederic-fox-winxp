type WindowSize = "small" | "smallDynamic" | "max" | "medium" | "min" | "large";
export type WindowMetaDataConstructorParams = {
	component?: React.ReactNode;
	fileName?: string;
	iconComponent?: React.ReactNode;
	iconUrl?: string;
	initialWindowHeight?: WindowSize;
	initialWindowWidth?: WindowSize;
	name: string;
	overrideWindowComponent?: React.ReactNode | "unstyled";
	tagLine?: string;
	title: string;
};

export class WindowMetaData implements WindowMetaDataConstructorParams {
	readonly iconComponent?: React.ReactNode;
	readonly iconUrl?: string;
	readonly id: string = crypto.randomUUID();
	readonly initialWindowHeight: WindowSize;
	readonly initialWindowWidth: WindowSize;
	readonly name: string;
	readonly overrideWindowComponent?: React.ReactNode | "unstyled";
	readonly tagLine?: string;
	readonly title: string;
	component?: React.ReactNode;
	focused: boolean = true;
	x: number = 100;
	y: number = 100;
	constructor({
		component,
		fileName,
		iconComponent,
		iconUrl,
		initialWindowHeight,
		initialWindowWidth,
		name,
		overrideWindowComponent,
		tagLine,
		title,
	}: WindowMetaDataConstructorParams) {
		this.name = name;
		this.title = title;
		if (tagLine) this.tagLine = tagLine;
		if (iconUrl) this.iconUrl = iconUrl;
		if (iconComponent) this.iconComponent = iconComponent;
		this.component = component;
		this.initialWindowWidth = initialWindowWidth ?? "medium";
		this.initialWindowHeight = initialWindowHeight ?? "medium";
		if (overrideWindowComponent) this.overrideWindowComponent = overrideWindowComponent;
	}

	focus() {
		this.focused = true;
	}

	blur() {
		this.focused = false;
	}
	setPosition(x: number, y: number) {
		this.x = x;
		this.y = y;
	}
	setDeltaPosition(deltaX: number, deltaY: number) {
		this.x += deltaX;
		this.y += deltaY;
	}

	setPositionIncremented(positionInStack: number) {
		this.x += positionInStack * 40;
		this.y += positionInStack * 40;
	}
}
