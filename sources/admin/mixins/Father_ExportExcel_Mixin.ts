import { xX_CVS_Excel_Helper }              from '../../cvs-excel/CVS_Excel_Helper';
import { xX_AdminHelper }                   from '../admin-helper';
import { Component }                        from 'vue-property-decorator';
import { MixinLevelTag, xX_Father_BaseVue } from './Father_BaseVue';
import { t }                                from '../../../packages/cp-util/locale/locale';


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
