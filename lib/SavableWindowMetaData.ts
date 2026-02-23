import { WindowMetaData, WindowMetaDataConstructorParams } from "./WindowMetaData";

type SavableWindowMetaDataConstructorParams = {
	onCloseHook?: () => void;
};
export class SavableWindowMetaData extends WindowMetaData implements SavableWindowMetaDataConstructorParams {
	onCloseHook?: () => void;

	constructor(params: WindowMetaDataConstructorParams & SavableWindowMetaDataConstructorParams) {
		super(params);
		if (params.onCloseHook) this.onCloseHook = params.onCloseHook;
	}
}
