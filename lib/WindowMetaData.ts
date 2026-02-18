type WindowSize = "small" | "smallDynamic" | "max" | "medium" | "min" | "large";
type WindowMetaDataConstructorParams = {
	name: string;
	title: string;
	tagLine?: string;
	iconUrl?: string;
	iconComponent?: React.ReactNode;
	fileName?: string;
	component?: React.ReactNode;
	initialWindowWidth?: WindowSize;
	initialWindowHeight?: WindowSize;
	overrideWindowComponent?: React.ReactNode | "unstyled";
};

export class WindowMetaData implements WindowMetaDataConstructorParams {
	readonly id: string = crypto.randomUUID();
	readonly name: string;
	readonly title: string;
	readonly tagLine?: string;
	readonly iconUrl?: string;
	readonly iconComponent?: React.ReactNode;
	fileName?: string;
	focused: boolean = true;
	x: number = 100;
	y: number = 100;
	component?: React.ReactNode;
	readonly initialWindowWidth: WindowSize;
	readonly initialWindowHeight: WindowSize;
	readonly overrideWindowComponent?: React.ReactNode | "unstyled";
	constructor({
		name,
		title,
		tagLine,
		iconUrl,
		iconComponent,
		fileName,
		component,
		initialWindowWidth,
		initialWindowHeight,
		overrideWindowComponent,
	}: WindowMetaDataConstructorParams) {
		this.name = name;
		this.title = title;
		if (tagLine) this.tagLine = tagLine;
		if (iconUrl) this.iconUrl = iconUrl;
		if (iconComponent) this.iconComponent = iconComponent;
		this.component = component;
		if (fileName) this.fileName = fileName;
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
