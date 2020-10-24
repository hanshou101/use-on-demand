export class xX_ExceptionError_Helper {
	public static throwError_andLog(err: string) {
		console.error(err);
		throw new Error(err);
		// @ts-ignore
		return err;
	}
}
