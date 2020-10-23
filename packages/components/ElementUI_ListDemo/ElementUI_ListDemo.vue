<!--制作注意：在模板文件里，用${DS}来表示单纯美元符号，用$name来指代变量（注意一个词：迭代）-->
<!--TIP注释的使用：①-重要信息和描述 ②-适合给方法加注释 ③-不要过度使用，不要给HTML标签TIP加注释 ④-  -->
<template>
	<div class="block__element--modifier common-main">

	</div>
</template>

<script lang="ts">

	import { Mixins, Component } from 'vue-property-decorator';
	// FIXME 马上，就调试这个
	// FIXME 马上，就调试这个
	// FIXME 马上，就调试这个
	// FIXME 马上，就调试这个
	// FIXME 马上，就调试这个
	// FIXME 马上，就调试这个
	// FIXME 马上，就调试这个
	// FIXME 马上，就调试这个
	import xX_Father_CommonMixin from '../../../sources/admin/mixins/Father_CommonMixin';

	@Component({
		name      : 'ElementUI_ListDemo',
		components: { /*组件*/

		},
		filters   : {},
	})
	export default class ElementUI_ListDemo
		extends Mixins(xX_Father_CommonMixin) {    // 混入在此处，进行添加。
		// TIP————————————————————————————————————Prop，从外界传入的只读属性—————————————————————————————————

		// TIP————————————————————————————————————Data，在类中的实现（@Model相关的除外）——————————————————————


		// TIP————————————————————————————————————computed，在类中的实现（@Model相关的除外）——————————————————————


		// TIP——————————————————————————————————————Method，在类中的实例——————————————————————————————————————

		// TIP——————————————————————————————————————Vue生命周期，在类中的实现——————————————————————————————————
		created(): void {

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
		}

	}

</script>

<style rel="stylesheet/less" lang="less" scoped>
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
