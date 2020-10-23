import { xX_CVS_Excel_Helper }              from '../../cvs-excel/CVS_Excel_Helper';
import { xX_AdminHelper }                   from '../admin-helper';
import { Component }                        from 'vue-property-decorator';
import { MixinLevelTag, xX_Father_BaseVue } from './Father_BaseVue';
import { t }                                from '../../cp-util/locale/locale';


@Component({
	name      : 'ExportExcelMixin',
	components: {
		/*组件*/
	},
	filters   : {},
})
// export default class HelloWorld extends BaseVueClass {
export default class xX_Father_ExportExcel_Mixin extends xX_Father_BaseVue {    // 混入在此处，进行添加。

	constructor() {
		super();
		//  console.log('ExportExcelMixin初始化了', this);
	}

	t = t;

	// // TIP 偶尔要用到的【对话框导出】功能。
	// // TIP 导出excel（很方便的方法。）
	// public exportExcel(formName_orParamsObj: string | {},
	// 									 baseOption: ExportExcelOption_Type,
	// 									 fileName: string,
	// ): void {
	//
	// 	// TIP 抽取出，上传导出的方法。
	// 	const exportClosure = (your_params: ExportExcelParam_Type) => {
	// 		// TIP 此处，要记住，在【request.js】里面，有个配套的处理过程。（比如，专门对于【二进制流application/octet-stream】的处理。）
	// 		this.MixinsData_1.exportExcelApi(baseOption, your_params).then((res: any) => {
	// 			console.log('接口返回', res);
	// 			let extractFilename = res.headers['content-disposition'] || res.headers['Content-disposition'];
	// 			extractFilename     = extractFilename.substr(extractFilename.lastIndexOf('=') + 1);
	// 			const filename      = fileName ? fileName + '.xlsx' : extractFilename;   // TIP 此处，若是自定义文件名，则加上【.csv】文件类型后缀名。
	// 			if (res.data) {     // IF分支，如果Response有Body存在。 TIP 后台仅仅在，有数据的情况下会返回Body；如果没有数据，则后台直接return，此时就没有Body，axios的解析，也就没有res.data。
	// 				console.log('【导出】返回数据为：', res);
	// 				xX_CVS_Excel_Helper.downloadExcel(res.request.responseURL, filename);
	// 			} else {            // ELSE分支，如果Response没有Body。（意味着，没有查询到数据。）
	// 				console.warn('【无导出数据】因为后台没有查找到数据，所以直接return。所以没有body，所以也就没有res.data');
	// 				this.$message({
	// 					type     : 'warning',                                                              // 不同状态：primary,success,info,warning,error
	// 					showClose: true,                                                              // 是否显示关闭按钮
	// 					message  : this.t('message.Not_Found_Required_Data_Set').toString(),
	// 					duration : 3000,                                                               // 设置为0时，将不会自动关闭。默认为3000，消息消失前时间。
	// 					center   : false,                                                                // 默认为否：否时，为向左靠齐。是：将文字水平居中。
	// 				});
	// 			}
	// 		});
	// 	};
	//
	// 	console.log('export方法，传入的为：', typeof formName_orParamsObj);
	//
	// 	// TIP 途径之① 传入了表单的Ref名字。
	// 	if (typeof formName_orParamsObj === 'string') {
	// 		(this.$refs[formName_orParamsObj] as MyElForm).validate((valid: boolean) => {
	// 			if (valid) {
	// 				const { ruleForm, current, size }   = (this.$refs[formName_orParamsObj] as MyElForm).$parent as any;
	// 				const params: ExportExcelParam_Type = {};
	// 				xX_AdminHelper.formDateRange(params, ruleForm);
	// 				params.current = current;
	// 				params.size    = size;
	// 				console.log('filename', fileName);
	// 				exportClosure(params);
	// 			} else {
	// 				console.error('Export Function : form error submit!!');
	// 			}
	// 		});
	// 	} else if (typeof formName_orParamsObj === 'object') {
	// 		// TIP 途径之② 传入了表单的Ref名字。
	// 		exportClosure(formName_orParamsObj);
	// 	}
	//
	// }

	public activated(): void {
	}

	public created(): void {
	}

	public destroyed(): void {
	}

	public mounted(): void {
	}

	public updated(): void {
	}

	public MixinsData_1: MixinLevelTag & ExportExcelMixinImpl = {} as any;


}

export interface ExportExcelMixinImpl {
	exportExcelApi: (
		baseOption: ExportExcelOption_Type, form: ExportExcelParam_Type, current?: number, size?: number,
	) => Promise<any>;
}
