<template>
	<el-row :gutter="20">
		<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="5" v-for="(item,index) in statisticalData" :key="index">
			<div class="statistical-item">
				<slot name="title">
					<p class="title">{{ item.name }}</p>
				</slot>
				<slot name="content">
					<!--                <count-to :end="item.value" count-class="num"></count-to>-->
					<p class="num">{{ getThousandthData(item.value) }}</p>
				</slot>
			</div>
		</el-col>
	</el-row>
</template>
<script lang="ts">


	import { xX_SMath_Helper }                  from '@lib-ts/symbol-math/SMath_Helper';
	import { MixinLevelTag, xX_Father_BaseVue } from '@lib-ts/admin/mixins/Father_BaseVue';
	import { Component, Prop }                  from 'vue-property-decorator';

	@Component({
		name      : 'StatisticalCard',
		components: {},
		filters   : {},
	})
	export default class xX_StatisticalCard
		extends xX_Father_BaseVue {    // 混入在此处，进行添加。

		// 数据可以和父级通用
		@Prop({ type: Array, required: true }) readonly statisticalData!: Array<{
			name: any,
			value: any
		}>;
		// Data，在类中的实现 （双向绑定除外）

		// Method，在类中的实现
		getThousandthData(val: number) {
			return xX_SMath_Helper.parseToThousandth(val);
		}

		// Lifecycle生命周期，在类中的实现
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

		MixinsData_1: MixinLevelTag = {} as any;
	}

</script>
<style rel="stylesheet/scss" lang="scss">
	// 尝试一些特别的命名法。比如【BEM】

	.statistical-item {
		border        : 1px solid #eee;
		border-radius : 10px;
		box-sizing    : border-box;
		padding       : 30px 0 30px 30px;
		margin        : 10px 0;

		.title {
			font-size : 14px;
			color     : #999;
		}

	}

	.num {
		font-size  : 34px;
		color      : rgba(5, 9, 17, 0.58);
		margin-top : 10px;
	}
</style>

