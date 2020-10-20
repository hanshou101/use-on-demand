<!--制作注意：在模板文件里，用${DS}来表示单纯美元符号，用$name来指代变量（注意一个词：迭代）-->
<!--TIP注释的使用：①-重要信息和描述 ②-适合给方法加注释 ③-不要过度使用，不要给HTML标签TIP加注释 ④-  -->
<template>
	<div class="block__element--modifier common-main">
		<!--总表单-->
		<el-form :model="ruleForm" :rules="rules" ref="ruleFormRef"
						 label-width="100px" class="search-container">
			<MyFormEasy :form-items="formItems" :ruleForm="ruleForm"></MyFormEasy>
			<div class="operation-container"><!--操作按钮组：搜索、新建、删除-->
				<el-button icon="el-icon-search" @click="submitForm('ruleFormRef')">{{ '搜索' }}</el-button><!--搜索-->
				<el-button type="primary" icon="el-icon-edit" @click="openDialog(1,{})">{{ '新建' }}</el-button><!--新建-->
				<el-button type="danger" icon="el-icon-delete" @click="handleDelete">{{ '删除' }}</el-button><!--删除-->
			</div>
		</el-form>

		<!--总表格-->
		<el-table :data="listData" @selection-change="handleSelectionChange" v-loading="listLoading"
							tooltip-effect="dark"
							ref="multipleTable"
							class="element-table-list" style="width: 100%;">
			<MyTableEasy :table-cols="tableCols">
				<template #operate="scope">
					<WrapDropdown>
						<!--编辑-->
						<el-button @click="openDialog( 2 , scope.row)" slot="dropdown-item" size="mini" type="primary" icon="el-icon-edit">{{ '编辑' }}</el-button>
						<!--启用-->
						<el-button v-if="scope.row.status===0" @click="handleChangeStatus(scope.$index, scope.row)" slot="dropdown-item" size="mini" icon="el-icon-edit">{{ '启用' }}</el-button>
						<!--禁用-->
						<el-button v-if="scope.row.status===1" @click="handleChangeStatus(scope.$index, scope.row)" slot="dropdown-item" size="mini" type="danger" icon="el-icon-edit">{{ '禁用' }}</el-button>
						<!--删除单个-->
						<el-button @click="deleteSingle( scope.$index, scope.row.id )" slot="dropdown-item" type="danger" size="mini" icon="el-icon-delete">{{ '删除' }}</el-button><!--删除-->
					</WrapDropdown>
				</template>
			</MyTableEasy>
		</el-table>

		<!--分页器。当选中页码更改时，会立即触发_getList刷新。-->
		<el-pagination :current-page.sync="listQuery.current" :page-size="listQuery.size" :total="listQuery.total" @current-change="handlePageChange"
									 layout="total,prev, pager, next"
									 background
									 class="pagination-container" />

		<!--Dialog总控制器。当触发【新建】、【更改】操作时，会触发父组件的_getList刷新。-->

		<!--TODO 解开这里，即可召唤神龙实现你的愿望。-->
		<Article_Create_Dialog
			ref="dialogRef"
			v-if="dialogVisible"
			:show.sync="dialogVisible"
			:init-data="dialogData"
			:dialog-type="dialogType"
			@refreshList="_getList">
		</Article_Create_Dialog>
	</div>
</template>

<script lang="ts">

	import { Mixins }                       from 'vue-property-decorator';
	import Component                        from 'vue-class-component';
	import { xX_Father_ElTItem }            from '../../sources/element-ui/admin-cp/ElTItem';
	import { xX_Father_ElFItem }            from '../../sources/element-ui/admin-cp/ElFItem';
	import xX_Father_CommonMixin            from '../../sources/admin/mixins/Father_CommonMixin';
	import { xX_MyEl_FormItem_Rule_Config } from '../../sources/element-ui/admin-cp/MyElementUtils';
	//
	import MyTableEasy                      from '../../packages/cp-element-ui/MyTableEasy/MyTableEasy.vue';
	import MyFormEasy                       from '../../packages/cp-element-ui/MyFormEasy/MyFormEasy.vue';
	import WrapDropdown                     from '../../packages/cp-element-ui/WrapDropdown/WrapDropdown.vue';

	import Vue from 'vue';

	import {
		Form as ElForm,
		Button as ElButton,
		Table as ElTable,
		Pagination as ElPagination,
		Loading,
	}                                   from 'element-ui';
	import { t }                        from '../../packages/cp-util/locale/locale';
	import { xX_MyElementUtils_Helper } from '../../sources/element-ui/admin-cp/MyElementUtils_Helper';
	import { selectOption }             from '../enum-options/select-options';
	import { UserList_Mock_Data }       from '../mock-data/MockData';
	import Article_Create_Dialog        from './components/Article_Create_Dialog.vue';

	Vue.use(Loading.directive);

	const AuditOptions = {
		0: '待审核',
		1: '通过',
		2: '拒绝',
	};

	@Component({
		name      : 'ElementUI_ListDemo',
		components: { /*组件*/
			ElForm,
			ElButton,
			ElTable,
			ElPagination,
			MyFormEasy,
			MyTableEasy,
			WrapDropdown,
			//
			Article_Create_Dialog,
		},
		filters   : {},
	})
	export default class ElementUI_ListDemo
		extends Mixins(xX_Father_CommonMixin) {    // 混入在此处，进行添加。
		// TIP————————————————————————————————————Prop，从外界传入的只读属性—————————————————————————————————

		// TIP————————————————————————————————————Data，在类中的实现（@Model相关的除外）——————————————————————
		ruleForm = {};

		// 控制对话弹窗显示
		public dialogVisible = false;
		// 对话弹窗数据
		public dialogData    = {} as any;
		// 对话弹窗类型（1-新建 2-编辑）
		public dialogType    = 1;

		// TIP————————————————————————————————————computed，在类中的实现（@Model相关的除外）——————————————————————
		get rules(): xX_MyEl_FormItem_Rule_Config {
			return { // 示范
				// demo: [new MyEl_RuleItem(this.$t("websiteOperation.articleManager.Select_Category").toString(),)],
			};
		}//
		get formItems(): xX_Father_ElFItem.Base[] {
			return [
				new xX_Father_ElFItem.Text({ name: 'id', label: '用户ID' }),

				//
				//
				//

				// new xX_Father_ElFItem.Text({ name: 'userName', label: '用户名' }),
				new xX_Father_ElFItem.Text({ name: 'realName', label: '真实姓名' }),
				// new xX_Father_ElFItem.Text({ name: 'mobile', label: '手机号' }),
				// new xX_Father_ElFItem.Text({ name: 'email', label: '邮箱' }),
				// new xX_Father_ElFItem.Options<any>({
				// 	name: 'status', label: '审核状态', selectOptionConf: {
				// 		option      : AuditOptions,
				// 		needParseInt: true,
				// 	},
				// }),
				new xX_Father_ElFItem.DateRange({ name: 'dateRange', label: '时间范围' }),

				//
				//
				//
				//

				new xX_Father_ElFItem.Text({ name: 'userId', label: '用户ID' }),
				new xX_Father_ElFItem.Text({ name: 'userName', label: '用户名' }),
				// new ElFItem.Text({name: 'realName', label: '真实姓名'}),
				new xX_Father_ElFItem.Text({ name: 'mobile', label: '手机号' }),
				new xX_Father_ElFItem.Text({ name: 'email', label: '邮箱' }),

				new xX_Father_ElFItem.Options({
					name: 'status', label: '状态', selectOptionConf: {
						option      : selectOption.status,
						needParseInt: true,
					},
				}),
				new xX_Father_ElFItem.Options({
					name: 'type', label: '用户类型', selectOptionConf: {
						option      : selectOption.userTypeOptions,
						needParseInt: true,
					},
				}),

			];
		}//
		get tableCols(): xX_Father_ElTItem.Base[] {

			const that = this;

			return [
				new xX_Father_ElTItem.Text({ name: 'id', label: '用户ID' }),

				//
				//
				//

				new xX_Father_ElTItem.Text({ name: 'userName', label: '用户名' }),
				new xX_Father_ElTItem.Text({ name: 'mobile', label: '手机号' }),
				new xX_Father_ElTItem.Text({ name: 'email', label: '邮箱' }),
				new xX_Father_ElTItem.Text({ name: 'realName', label: '真实姓名' }),
				new xX_Father_ElTItem.Text({ name: 'idCard', label: '证件号码' }),
				new xX_Father_ElTItem.Text({ name: 'authTime', label: '审核时间' }, { minWidth: 160 }),
				new xX_Father_ElTItem.EnumTag<any>({ name: 'authStatus', label: '实名认证状态', selectOption: AuditOptions }),


				new xX_Father_ElTItem.DetailInfo({
					name: '', label: '基本信息', pairs: [
						{ rightProp: 'id', leftLabel: '用户ID' },
						{ rightProp: 'userName', leftLabel: '用户名' },
						{
							rightProp   : {
								prop: 'type',
								simpleValueFunction(row, field) {
									const type = row[field];
									const text = (selectOption.userTypeOptions as any)[type];
									return xX_MyElementUtils_Helper.get_ElTag_HtmlText(type, text);
								},
							}, leftLabel: '用户类型',
						},
						{
							rightProp   : {
								prop: 'registerType',
								simpleValueFunction(row, field) {
									const registerType = row[field];
									const text         = (selectOption.registerTypeOption as any)[registerType];
									return xX_MyElementUtils_Helper.get_ElTag_HtmlText(registerType, text);
								},
							}, leftLabel: '注册类型',
						},
						{ rightProp: 'inviteCode', leftLabel: '邀请码' },
						{ rightProp: 'created', leftLabel: '注册时间' },
					],
				}),
				new xX_Father_ElTItem.DetailInfo({
					name: '', label: '联络方式', pairs: [
						{ rightProp: 'mobile', leftLabel: '手机号' },
						{ rightProp: 'email', leftLabel: '邮箱' },
						{ rightProp: 'qq', leftLabel: 'QQ' },
					],
				}),
				new xX_Father_ElTItem.DetailInfo({
					name: '', label: '状态信息', pairs: [
						{
							rightProp   : {
								prop: 'status',
								simpleValueFunction(row, field) {
									const status = row[field];
									const text   = (selectOption.status as any)[status];
									return xX_MyElementUtils_Helper.get_ElTag_HtmlText(status, text);
								},
							}, leftLabel: '用户状态',
						},
						{
							rightProp   : {
								prop: 'kycLevel',
								simpleValueFunction(row, field) {
									const kycLevel = row[field];
									const text     = (selectOption.status as any)[kycLevel];
									return xX_MyElementUtils_Helper.get_ElTag_HtmlText(kycLevel, text);
								},
							}, leftLabel: '是否绑定银行卡',
						},
						{
							rightProp   : {
								prop: 'paypassSetting',
								simpleValueFunction(row, field) {
									const paypassSetting = row[field];
									const text           = (selectOption.yes_or_no as any)[paypassSetting];
									return xX_MyElementUtils_Helper.get_ElTag_HtmlText(paypassSetting, text);
								},
							}, leftLabel: '交易密码设置状态',
						},
					],
				}),

				new xX_Father_ElTItem.Custom({ name: 'operate', label: '操作' }, {
					i18nKey: 'table.Operation', minWidth: 120, elementTableColumnAttrs: {
						fixed: 'right',
						align: 'center',
					},
				}),

			];
		}


		// TIP——————————————————————————————————————Method，在类中的实例——————————————————————————————————————
		// 打开对话弹窗
		public openDialog(type: number, row: any) {
			this.dialogType    = type;
			this.dialogData    = row;
			this.dialogVisible = true;
		}

		t = t;

		// TIP——————————————————————————————————————Vue生命周期，在类中的实现——————————————————————————————————
		created(): void {
			this.initFunc();
		};

		mounted(): void {

		};

		activated(): void {
		};

		updated(): void {
		};

		destroyed(): void {
		};

		// TIP————————————————————————————————————————初始化Mixin的上下级关系————————————————————————————
		initFunc() {
			this.MixinsData_1 = { ...this.MixinsData_1 };       // TODO 顶级Mixins的数据初始化
			this.MixinsData_2 = {                             // TODO 二级Mixins的数据初始化
				...this.MixinsData_2,
				lang           : '',                       // 后台管理系统，当前界面语种
				listCallback   : () => {                                            // 菜单第一时间，自动拉取的列表接口
					console.log('执行搜索接口');
					// return ArticleApi.list(this.ruleForm, this.listQuery.current, this.listQuery.size);
					return {
						records: UserList_Mock_Data.data,
						current: 1,
						size   : 10,
						total  : 100,
					};
				},
				needListProcess: (res: any) => {                            // 如果，在列表接口之后，需要对返回的数据进行【预处理】
					return res;                                                       // 注意，若没有预处理过程，则返回原始数据即可。
				},
				changeStatusCallback(id: string, status: string) {          // 更新单个菜单条目的状态（如禁用、启用）的接口
					// return ArticleApi.changeStatus({id, status,});
				},
				deleteCallback(ids: any) {                                  // 删除菜单条目的接口
					// return ArticleApi.delete(ids);
				},
				// deleteSingleCallback (index, data_or_row_or_id) {
				//   return ecoplanetApi.posAmountConfig_api.delete(data_or_row_or_id);
				// }
			};
		}

	}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	// 尝试规范的进行  CSS开发。
	.common-main {
		padding : 10px;

		.no-ml .el-form-item__content {
			margin-left : 0 !important;
		}

		.search-container {
			display         : flex;
			justify-content : flex-start;
			flex-wrap       : wrap;

			.form-input {
				width : 210px;
			}

			.form-input-large {
				width : 400px;
			}

			.operation-container {
				margin-left : 50px;
			}
		}

		.pagination-container {
			text-align : right;
		}

		.search-form-statistic {
			margin-top    : 20px;
			margin-left   : 10px;
			margin-bottom : 20px;
		}
	}
</style>
