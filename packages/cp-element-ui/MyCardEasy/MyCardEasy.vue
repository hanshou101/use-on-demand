<template>
	<fragment>
		<el-card v-for="(cardItem,cardIndex) in baseInfo.array" :key="cardItem.cardTitle + cardIndex"
						 :body-style="{/*在这里_定义body部分的_样式_如最外层padding*/}"
						 shadow="hover"
						 class="box-card container__elCard">
			<!--【el-card】:shadow，设置阴影的显示时机。always ,hover ,never。默认always。-->

			<div slot="header">
				<span>{{ cardItem.cardTitle }}</span>
			</div>
			<div>
				<template v-for="( rowArray , rowIndex ) in cardItem.rows ">
					<div v-if="rowArray.length ===0"
							 :key=" rowArray.length + ',' + rowIndex">
						<!--此处，可以放置一个空行-->&nbsp;
					</div>
					<el-row v-else
									:key=" rowArray.length + ',' + rowIndex"
									:gutter="0"
									type="flex">
						<el-col v-for="( colItem , colIndex ) in rowArray " :key=" colItem.leftLabel + colItem.rightProp + colIndex "
										:span="parseInt(24 / rowArray.length)" :offset="0" :justify="'start'" :align="'middle'">
							<div>{{ colItem.leftLabel }}</div>
							<div class="rightProp">{{ colItem.rightProp }}</div>
						</el-col>
					</el-row>
				</template>
			</div>
		</el-card>
	</fragment>
</template>
<script lang="ts">

	import { xX_MyEl_Cards }                    from '../../../sources/element-ui/admin-cp/MyElementUtils';
	import { MixinLevelTag, xX_Father_BaseVue } from '../../../sources/admin/mixins/Father_BaseVue';
	import { Component, Prop }                  from 'vue-property-decorator';


	import {
		Card as ElCard,
		Row as ElRow,
		Col as ElCol,
	} from 'element-ui';


	// @ts-ignore
	import { Fragment, Plugin } from 'vue-fragment';

	@Component({
		name      : 'MyCardEasy',
		components: {
			ElCard,
			ElRow,
			ElCol,
			Fragment,
		},
		filters   : {},
	})
	// export default class HelloWorld extends BaseVueClass {
	export default class xX_MyCardEasy
		extends xX_Father_BaseVue {    // 混入在此处，进行添加。
		@Prop({ type: [Object], required: true }) readonly baseInfo!: xX_MyEl_Cards;

		// Data，在类中的实现 （双向绑定除外）

		// Method，在类中的实现

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

<style rel="stylesheet/scss" lang="stylus" type="text/stylus">
	// 尝试一些特别的命名法。比如【BEM】
	.container__elCard {
		width: calc(100% - 40px);

		/*.item__text--left {*/
		/*text-align: left;*/
		/*}*/

		/*.item__text--right {*/
		/*text-align: right;*/
		/*}*/

		/deep/ .el-col {
			text-align: left;

			div {
				padding: 15px 5px;
				display: inline-block;
			}

			div:nth-last-child(1) {
				text-align: right;
				border: 1px solid #ff780011;
				padding: 10px;
			}

			div:nth-child(1) {
				text-align: left;
				min-width: 120px;

				font-size: 18px;
				font-weight: bold;

				border: 0px solid #f00;
			}
		}

		.rightProp {
			word-break: break-all; // 过长，则自动分行
		}

	}
</style>
