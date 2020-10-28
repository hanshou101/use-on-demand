// 给业务库用
export interface PreUploadBean {
	dir?: string;
	policy?: string;
	signature?: string;
	callback?: string;
	accessid?: string;
	host?: string;
}

// 给业务库用
export interface OssUploadBean {
	name?: string;
	key?: string;
	policy?: string;
	OSSAccessKeyId?: string;
	success_action_status?: number;
	callback?: string;
	signature?: string;
}

declare global {
	// 给自己用
	type PreUploadBean_Type = PreUploadBean;
	// 给自己用
	type OssUploadBean_Type = OssUploadBean;

	interface ExportExcelOption_Type {
		url: string;
		method: 'post' | 'get';
	}

	interface ExportExcelParam_Type {
		current?: string;
		size?: string;
	}
}
