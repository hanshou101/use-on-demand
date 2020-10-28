	 interface PreUploadBean_Type {
		dir?: string;
		policy?: string;
		signature?: string;
		callback?: string;
		accessid?: string;
		host?: string;
	}

	 interface OssUploadBean_Type {
		name?: string;
		key?: string;
		policy?: string;
		OSSAccessKeyId?: string;
		success_action_status?: number;
		callback?: string;
		signature?: string;
	}

	interface ExportExcelOption_Type {
		url: string;
		method: 'post' | 'get';
	}

	interface ExportExcelParam_Type {
		current?: string;
		size?: string;
	}

