<!--制作注意：在模板文件里，用$来表示单纯美元符号，用$name来指代变量（注意一个词：迭代）-->
<!--TIP注释的使用：①-重要信息和描述 ②-适合给方法加注释 ③-不要过度使用，不要给HTML标签TIP加注释 ④-  -->
<template>
	<!--Controller内部的Dialog对话框。当触发@close事件时，this.dialogVisible变为false。而且经由Controller，触发父组件的closeDialogEvent事件-->
	<el-dialog :title="dialogTitle" :visible.sync="dialogVisible" :close-on-click-modal="false" @close="closeDialog"
						 class="common-dialog" width="50%">

		<!--总表单-->
		<el-form :model="MixinsData_2.ruleForm" :rules="rules" ref="ruleFormRef" label-width="120px"
						 class="dialog-container">
			<!--<MyFormEasy :form-items="formItems" :ruleForm="MixinsData_2.ruleForm"></MyFormEasy>-->
			{{ MixinsData_2.ruleForm }}
		</el-form>

		<!--对话框按钮组：确定、取消-->
		<div slot="footer" class="dialog-footer">
			<!--取消按钮。将会把this.dialogVisible值变为false-->
			<el-button @click="dialogVisible = false">{{ '取消' }}</el-button>
			<!--确定按钮。submitForm方法提交ruleFormRef表单。-->
			<el-button
				@click="submitForm('ruleFormRef')"
				type="primary"
				:loading="dataCommitting"
				:disabled="dataCommitting">{{ '确认' }}
			</el-button>
		</div>

	</el-dialog>
</template>

<script lang="ts">
	import { Component, Mixins, Prop }      from 'vue-property-decorator';
	import xX_Father_DialogMixin            from '@lib-ts/admin/mixins/Father_DialogMixin';
	import { xX_Father_ElFItem }            from '@lib-ts/element-ui/admin-cp/ElFItem';
	import { xX_MyEl_FormItem_Rule_Config } from '@lib-ts/element-ui/admin-cp/ElRuleItem';
	import { selectOption }                 from '../../../examples/enum-options/select-options';

	@Component({
		name      : 'SimpleDemo_Dialog',
		components: { /*组件*/
		},
		filters   : {},
	})
	export default class SimpleDemo_Dialog
		extends Mixins(xX_Father_DialogMixin) {
		// TIP————————————————————————————————————Prop，从外界传入的只读属性—————————————————————————————————

		// TIP————————————————————————————————————Data，在类中的实现（@Model相关的除外）——————————————————————


		// 表单检验规则配置
		get rules(): xX_MyEl_FormItem_Rule_Config {
			return { // 示范
				// demo: [new MyEl_RuleItem(this.$t("websiteOperation.articleManager.Select_Category").toString(),)],
			};
		};

		get formItems(): xX_Father_ElFItem.Base[] {                  // 动态生成FormItem表单项
			return [
				new xX_Father_ElFItem.Text({ name: 'id', label: 'ID' }, { disabled: true }),
				new xX_Father_ElFItem.Options({
					name: 'status', label: '状态', selectOptionConf: {
						option      : selectOption.status,
						needParseInt: true,
					},
				}, { disabled: false }),
				new xX_Father_ElFItem.Text({ name: 'remark', label: '备注' }),
			];
		};

		// TIP————————————————————————————————————Computed，在类中的实现——————————————————————————————————————
		// 弹窗标题
		get dialogTitle(): string {
			if (this.dialogType === 1) {
				// return this.$t('dialog.Create').toString();
				return '创建';
			} else {
				// return this.$t('table.Edit').toString();
				return '编辑';
			}
		}

		// TIP————————————————————————————————————Watch，在类中的实现—————————————————————————————————————————
		/*
        @Watch("dialogType", {immediate:true})
        public watch_dialogType(newVal: any, oldVal: any) {               // 新建/编辑 对话框的标题
          this.dialogTitle = newVal === 1 ? this.$t('dialog.Create').toString() : this.$t('table.Edit').toString()
        }
    */

		// TIP————————————————————————————————————Method，在类中的实现————————————————————————————————————————


		// TIP————————————————————————————————————Vue生命周期，在类中的实现——————————————————————————————————
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


		// TIP————————————————————————————————————该方法，会在整个外部控制组件初始化，即放置在Html时，就执行；而showDialog方法，会在之后用户手动触发（伴随ElDialog的显示）。
		initFunc() {
			const self        = this;
			this.MixinsData_1 = { ...this.MixinsData_1 };       // TODO 顶级Mixins的数据初始化
			console.log('this.MixinsData_2 aaa', this.MixinsData_2);
			this.MixinsData_2 = {                             // TODO 二级Mixins的数据初始化
				...this.MixinsData_2,             // TIP 放最前，为其它变量铺路
				ruleForm: {
					// ...this._innerData,
					// aaa: 121
					// ... ...  子组件和它的Mixin，共用的表单属性
					...this.MixinsData_2.ruleForm,  // TIP 放最后，避免被覆盖
				},
				addCallback() {                                       // TIP 新建模式对话框的开启回调：将在showDialog的最后执行，作为附加额外操作。
					self.$nextTick(() => {
						// self.ruleFormRef = self.$refs.ruleFormRef;      // 将对话框的Form引用，传入【MultiLang】
					});
				},
				editCallback(row: any) {                              // TIP 编辑模式对话框的开启回调：将在showDialog的最后执行，作为附加额外操作。
					self.$nextTick(() => {
						// self.ruleFormRef = self.$refs.ruleFormRef;      // 将对话框的Form引用，传入【MultiLang】
					});
				},
				closeCallback() {                                     // TIP 对话框的关闭回调。（此回调，可能已Deprecated）
					console.log('关闭对话框');
				},
				createCallback() {                                    // 点击确定，调用新增接口。（新建模式下）
					// const form =AdminHelper.filterTargetFields(self.MixinsData_2.ruleForm,CreateBean)
					// return ArticleApi.create(form);
				},
				updateCallback() {                                    // 点击确定，调用编辑接口。（编辑模式下）
					// const form =AdminHelper.filterTargetFields(self.MixinsData_2.ruleForm,UpdateBean)
					// return ArticleApi.update(form);
				},
				processCreatedCallback(res: any) {                            // （较少用）如果你要在对话框关闭之前，对【创建接口】返回的数据，进行额外处理或与额外操作。
					return res;                                                 // 注意，若没有额外处理过程，则返回原始数据即可。
				},
			};
		}

	}

</script>

<style rel="stylesheet/less" lang="less" scoped>
	// 尝试规范的进行  CSS开发。
	.common-dialog {

	}
</style>
