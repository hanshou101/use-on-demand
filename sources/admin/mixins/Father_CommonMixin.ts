// import Dropdown                 from '@/_components/general/dropdown/index.vue';
import xX_Father_ExportExcel_Mixin from './Father_ExportExcel_Mixin';
import xX_Father_DialogMixin       from './Father_DialogMixin';
import { Component, Mixins }       from 'vue-property-decorator';
import { MixinLevelTag }           from './Father_BaseVue';
import { t }                       from '../../cp-util/locale/locale';

import { Getter }                   from 'vuex-class';
import { xX_ExceptionError_Helper } from '../../exception-error/ExceptionError_Helper';

export interface PreUploadBean {
	dir?: string;
	policy?: string;
	signature?: string;
	callback?: string;
	accessid?: string;
	host?: string;
}

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
	type PreUploadBean_Type = PreUploadBean;
	type OssUploadBean_Type = OssUploadBean;
}

/**
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 */

/**
 * 全局CRUD组件抽取
 */

@Component({
	name      : 'CommonMixin',
	components: {
		/*组件*/
		// Dropdown,
	},
	filters   : {  // 第一种<el-tag>的样式Filter
		elTagFilter(status: string | number) {
			const statusMap = {
				0: 'danger',
				1: 'success',
				2: 'info',
				3: 'primary',
				4: 'warning',
			};
			return (statusMap as any)[status];
		},
		// 第二种<el-tag>的样式Filter
		elTagFilter2(status: string | number) {
			const statusMap = {
				1: 'danger',
				0: 'success',
			};
			return (statusMap as any)[status];
		},
	},
})
// export default class HelloWorld extends BaseVueClass {
export default class xX_Father_CommonMixin<SelectOptionType> extends Mixins(xX_Father_ExportExcel_Mixin) {    // 混入在此处，进行添加。

	constructor() {
		super();
		// console.log('CommonMixin已经初始化-listQuery', this.listQuery);
		// console.log('this', this.listQuery);
	}

	@Getter('language') public language!: string; // 语言

	// public selectOption: MySelectOption_AllConfig                      = selectOption;
	// get selectOption(): object {
	// 	xX_ExceptionError_Helper.throwError_andLog('selectOption 属性需要重写！！！');
	// }

	//
	public dialogControlVisible: boolean                               = false;
	public listLoading: boolean                                        = true;
	public listQuery: { total: number; current: number; size: number } = {
		size   : 10,
		total  : 0,
		current: 1,
	};
	public listData: Array<any>                                        = [];
	public deleteItems: Array<any>                                     = [];
	// oss预上传数据
	public uploadHost: string                                          = '';
	// 上传携带参数
	public uploadData: OssUploadBean                                   = {};
	public ruleFormRef                                                 = null;
	// 弹窗类型，1-新建，2-编辑，3-其他
	public dialogType: number                                          = 1;
	// TIP 这是一个标记量：mounted钩子仅执行一次，当这一次执行时，首次activated方法不执行_getList；对于之后的activated方法，执行_getList。
	public preventGetList_in_activatedFunc: boolean                    = true;

	// 以下是Method。
	//
	//
	//
	//

	t = t;

	public async _getList(): Promise<any> {
		if (typeof this.MixinsData_2.listCallback === 'function') {
			this.listLoading = true;
			const res        = await this.MixinsData_2.listCallback();
			try {
				this.listLoading = false;
				if (res) {
					if (typeof this.MixinsData_2.needListProcess === 'function') {
						this.listData = this.MixinsData_2.needListProcess(res.records);
					} else {
						this.listData = res.records;
					}
					this.listQuery.current = res.current;
					this.listQuery.size    = res.size;
					this.listQuery.total   = parseInt(res.total);
				}
			} catch (err) {
				console.error(err);
				this.listLoading = false;
			}
		}
	}

	public submitForm(formName: string = 'ruleFormRef'): void {
		if (formName != 'ruleFormRef') {
			console.error('此处，需要特别注意，El-From未采用默认的ref值。（并非错误，只是提醒）');
		}
		this.listQuery.current = 1;

		const elForm = this.$refs[formName] as (MyElForm | undefined);

		if (elForm) {                                         // 找到了【ref】
			elForm.validate((valid: boolean) => {
				if (valid) {
					this._getList();
				} else {
					const str = '表单校验，未通过。请检查表单字段！';
					this.$notify({
						type   : 'warning',                                                          // 不同状态：primary,success,info,warning,error
						title  : '提示',
						message: str,
					});
					console.error(str);
				}
			});
		} else {
			this._getList();                                    // 没有找到【ref】
		}

	}

	// TIP 当前选择项，发生了变化。
	public handleSelectionChange(val: any): void {
		this.deleteItems = val;
	}

	public handleCreate(): void {
		this.dialogControlVisible = true;
		this.$nextTick(() => {
			(this.$refs.dialogRef as xX_Father_DialogMixin<SelectOptionType>).showDialog(1);
		});
	}

	public handleEdit(index: number, row: {}): void {
		this.dialogControlVisible = true;
		this.$nextTick(() => {
			(this.$refs.dialogRef as xX_Father_DialogMixin<SelectOptionType>).showDialog(2, JSON.parse(JSON.stringify(row)));
		});
	}

	public handleDetail(index: number, row: {}): void {
		this.dialogControlVisible = true;
		this.$nextTick(() => {
			(this.$refs.dialogRef as xX_Father_DialogMixin<SelectOptionType>).showDialog(3, JSON.parse(JSON.stringify(row)));
		});
	}

	// 删除单条数据
	// FIXME 这一条，是已经过时的老方法
	// FIXME 这一条，是已经过时的老方法
	// FIXME 这一条，是已经过时的老方法
	// FIXME 这一条，是已经过时的老方法
	// FIXME 这一条，是已经过时的老方法
	public async handleDeleteSingle(index: number, row: any) {
		await this.MixinsData_2.deleteCallback(row.id);
		this.$notify({
			type   : 'success',
			title  : this.t('message.Prompt').toString(),
			message: this.t('message.Delete_Success').toString(), /* 删除成功*/
		});
		this._getList();
	}

	// 批量删除数据
	public handleDelete(): void {
		if (this.deleteItems.length === 0) {
			this.$alert(this.t('message.Delete_Prompt').toString(), this.t('message.Prompt').toString(), {
				confirmButtonText: this.t('message.Confirm').toString(),
				type             : 'warning',
				callback         : (action: string) => {
				},
			});
		} else {
			this.$alert(this.t('message.Delete_Confirm').toString(), this.t('message.Prompt').toString(), {
				confirmButtonText: this.t('message.Confirm').toString(),
				type             : 'warning',
				callback         : (action: string) => {
					if (action === 'confirm') {
						this._deleteItems();
					}
				},
			});
		}
	}

	public async handleChangeStatus(index: number, row: { id?: string, status?: number }): Promise<any> {
		const { id }   = row;
		let { status } = row;
		status         = (status === 1 ? 0 : 1);
		await this.MixinsData_2.changeStatusCallback(id, status);
		this.$notify({
			type   : 'success',
			title  : this.t('message.Prompt').toString(),
			message: this.t('message.Update_Success').toString(), /* 更新成功*/
		});
		this._getList();
	}

	public handlePageChange(currentPage: number): void {
		this.listQuery.current = currentPage;
		this._getList();
	}

	public async _deleteItems(): Promise<any> {
		const ids = this.deleteItems.map((item) => {
			console.log(item);
			return item.id;
		});
		console.log('ids', ids);

		await this.MixinsData_2.deleteCallback(ids);
		this.$notify({
			type   : 'success',
			title  : this.t('message.Prompt').toString(),
			message: this.t('message.Delete_Success').toString(), /* 删除成功*/
		});
		this._getList();
	}

	public async deleteSingle(index: number, data_or_row_or_id: any) {
		if (this.MixinsData_2.deleteSingleCallback == undefined) {
			throw new Error(xX_ExceptionError_Helper.throwError_andLog('deleteSingle中，所需的deleteSingleCallback不存在'));
		}
		const cbFn = this.MixinsData_2.deleteSingleCallback;              // 常量const赋值，确保不是undefined。

		this.$confirm('请问确定要删除当前条目吗？', '确认删除', {
			distinguishCancelAndClose: false,                                             // 默认false。是否将【点击取消】（点击取消按钮）与【点击关闭】（点击关闭按钮或遮罩层、按下 ESC 键）进行区分。
			type                     : 'warning',                                                              // 不同状态：primary,success,info,warning,error
			confirmButtonText        : '确认',
			cancelButtonText         : '取消',
		})
				.then(async () => {                                                                 // 按下【确认按钮】
					const res = await cbFn(index, data_or_row_or_id);
					this.$notify.success('删除成功！');
					this._getList();
				});
	}

	public async beforeUpload(): Promise<any> {
		const preUploadData: PreUploadBean = (await this.MixinsData_2.preuploadApi()) as PreUploadBean;
		if (preUploadData) {
			const { dir, policy, signature, callback, accessid, host } = preUploadData;
			this.uploadHost                                            = host || '域名没获取到';
			this.uploadData.name                                       = signature;
			this.uploadData.key                                        = `${dir}${new Date().getTime()}.jpg`;
			this.uploadData.policy                                     = policy;
			this.uploadData.OSSAccessKeyId                             = accessid;
			this.uploadData.success_action_status                      = 200;
			this.uploadData.callback                                   = callback;
			this.uploadData.signature                                  = signature;
		} else {
			return Promise.reject();
		}
	}

	// public handle_CoinLogo_UploadSuccess (response: any): void {
	//   console.log('进入预期回调');
	//   const {Status, uri} = response;
	//   if (Status === 'OK') {
	//     this.MixinsData_2.coinForm.img = uri;
	//   }
	// }

	// 关闭对话框的毁掉
	public closeDialogEvent(): void {
		this.dialogControlVisible = false;
	}

	// // TIP 点击图片，则弹出对应的图片放大对话框。
	// public async imgEnlarge (imgUrl: string): Promise<any> {
	//   this.MixinsData_2.checkImg = imgUrl;
	//   this.MixinsData_2.centerDialogVisible = true;
	// }


	// 以下是生命周期的方法
	//
	//

	// TIP 生命周期
	public beforeCreate(): void {                // TIP 尝试（三） 尝试手动，为this.$options.name，添加上路由表中的值。
		if (!this.$options.name) {    // TIP 若选项name不存在，则提示。
			console.warn('若您需要此组件，被<keep-alive>化，则需要为其添加组件选项name。');
		}
		// console.log(`选项name为：`, this.$options.name)
		// this.$options.name = this.$route.name
		// console.log(`选项name为：`, this.$options.name)
	}

	// TIP 生命周期
	public mounted(): void {
		// console.log('lang2', this.language);
		this.MixinsData_2.lang = this.language;
		this.submitForm();         // TIP 列表接口处理。     // FIXME 此处，因为考虑到  【mounted】+【activated】的组合，绝大多数情况下，会触发两次 【_getList】。所以，此处为了减少重复的不必要开销，（原本采用：注释掉  【mounted】里面的  【_getList】）后来，使用【preventGetList_in_activatedFunc】变量，进行控制。

	}

	// TIP 生命周期（在<Keep-Alive>重新返回前台之后。）
	public activated(): void {
		if (this.preventGetList_in_activatedFunc) {     // 第一次，【拦截】activated的列表加载。
			this.preventGetList_in_activatedFunc = false;        // 第二次及以后，【不拦截】ctivated的列表加载。
		} else {
			this._getList();         // TIP 列表接口处理。（有些菜单页面，可能在自己的mounted中，又写了自定义逻辑。那样的话，必须在对应菜单页面，写一个组件自己的【activated】生命周期钩子。但目前这个通用的拉取列表，已经能够处理95%的情况。）
		}
	}

	public updated(): void {
	}

	// TIP 生命周期（在<Keep-Alive>进入后台之后。）
	public deactivated(): void {
	}


	public destroyed(): void {
	}


	/**
	 * 以下方法，都是需要在子类中实现的interface方法。父类中只有空的。
	 */

	// public checkImg!: CommonMixinImpl['checkImg'];
	// public centerDialogVisible!: CommonMixinImpl['centerDialogVisible'];
	// public listCallback!: CommonMixinImpl['listCallback'];
	// public needListProcess!: CommonMixinImpl['needListProcess'];
	// public changeStatusCallback!: CommonMixinImpl['changeStatusCallback'];
	// public deleteCallback!: CommonMixinImpl['deleteCallback'];
	// public coinForm!: CommonMixinImpl['coinForm'];
	// public lang!: CommonMixinImpl['lang'];

	public MixinsData_2: MixinLevelTag & CommonMixinImpl & ExtendImpl<SelectOptionType> = {} as any;

}

interface CommonMixinImpl {
	// checkImg: string;
	// centerDialogVisible: boolean;
	coinForm?: { img?: string, [key: string]: string | undefined | number };
	lang: string;
	listCallback: Function;
	needListProcess: Function;
	changeStatusCallback: Function;
	deleteCallback: Function;
	deleteSingleCallback?: (index: number, data_or_row_or_id: any) => Promise<any>;

}

interface ExtendImpl<SelectOptionType> {
	// TIP 用于指定【下拉选项】
	selectOption: SelectOptionType;

	// TIP 上传预热接口
	preuploadApi(): Promise<any>;
}
