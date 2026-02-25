import { WindowMetaData, WindowMetaDataConstructorParams } from "./WindowMetaData";

type SavableWindowMetaDataConstructorParams = {
	fileName?: string;
};
export class SavableWindowMetaData extends WindowMetaData implements SavableWindowMetaDataConstructorParams {
	fileName?: string;
	constructor(params: WindowMetaDataConstructorParams & SavableWindowMetaDataConstructorParams) {
		super(params);
		const { fileName } = params;
		if (fileName) this.fileName = fileName;
	}
}
