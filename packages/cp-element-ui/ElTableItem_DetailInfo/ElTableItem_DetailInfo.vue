<template>
	<div class="elTableItem-detailInfo" ref="elTableItem-detailInfo">
		<table class="table detail-table">
			<tbody>
			<tr v-for="(item,index) in pairs" v-if=" !calc_IfDisableRender(item) "
					:key="index + '_' + uid()">
				<td class="td-field" :style="{ width: calcLabelMaxWidth }">
					<span v-html="item.leftLabel"></span><!--TIP 此处，支持<br/>等html标签-->
				</td>
				<td class="td-value" v-html="getItemText(item)"></td>
			</tr>
			</tbody>
		</table>
	</div>
</template>

<script lang="ts">

	import { Component, Prop }                  from 'vue-property-decorator';
	import { xX_Father_ElTItem }                from '@lib-ts/element-ui/admin-cp/ElTItem';
	import { MixinLevelTag, xX_Father_BaseVue } from '@lib-ts/admin/mixins/Father_BaseVue';
	import { xX_SString_Helper }                from '@lib-ts/symbol-string/SString_Helper';
	import { xX_ExceptionError_Helper }         from '@lib-ts/exception-error/ExceptionError_Helper';

	@Component({
		name      : 'ElTableItem_DetailInfo',
		components: { /*组件*/ },
		filters   : {},
	})
	export default class xX_ElTableItem_DetailInfo extends xX_Father_BaseVue {
		// TIP————————————————————————————————————Prop，从外界传入的只读属性—————————————————————————————————
		@Prop({ type: Object, required: true }) row!: IndexedObj;
		@Prop({ type: Object, required: true }) item!: xX_Father_ElTItem.DetailInfo;
		@Prop({ type: Array, required: true }) pairs!: Array<DetailInfoPair>;


		// TIP————————————————————————————————————Data，在类中的实现（@Model相关的除外）——————————————————————

		// TIP————————————————————————————————————computed，在类中的实现（@Model相关的除外）——————————————————————
		get calcLabelMaxWidth() {
			if (this.item.leftEm != undefined) {
				console.log('采用手动值');
				// 如果手动写死了，则不采用自动计算的值。
				return `calc( (15px * 2) + (1px * 2) + ${this.item.leftEm}em)`;        // 左右padding + 左右border
			} else {
				let maxLength = 0;
				this.pairs.forEach(item => {
					const labelLength = item.leftLabel.length;
					if (labelLength > maxLength) {
						maxLength = labelLength;                            // 寻找最大宽度。
					}
				});
				console.log('采用自动计算值');
				return `calc( (15px * 2) + (1px * 2) + ${maxLength}em)`;        // 左右padding + 左右border
			}
		}

		// TIP——————————————————————————————————————Method，在类中的实例——————————————————————————————————————
		getItemText(item: DetailInfoPair) {
			let text: string | number | undefined | null = '';

			switch (typeof item.rightProp) {
				case 'string': {
					text = this.row[item.rightProp];
					break;
				}
				case 'object': {
					text = item.rightProp.simpleValueFunction(this.row, item.rightProp.prop);
					break;
				}
				default: {
					throw new Error(xX_ExceptionError_Helper.throwError_andLog('getItemText item类型错误'));
				}
			}

			if (!text && text !== 0) {      // text为空值，且不是数字0
				text = '--';
			}
			return text;
		}

		calc_IfDisableRender(item: DetailInfoPair) {
			let propText: string | number | undefined | null = '';
			switch (typeof item.rightProp) {
				case 'string': {
					propText = item.rightProp;
					break;
				}
				case 'object': {
					propText = item.rightProp.prop;
					break;
				}
				default: {
					throw new Error(xX_ExceptionError_Helper.throwError_andLog('calc_IfDisableRender item类型错误'));
				}
			}
			if (typeof item.disableRender == 'undefined') {
				return false;                                                                   // 不禁用
			}
			return item.disableRender(this.row, propText);                                    // 判断是否禁用
		}

		/**
		 * 创建v-for独一无二的id。用法：将强制重建  列表循环内的【子组件】项。
		 */
		uid() {
			return xX_SString_Helper.uid();
		}

		// TIP——————————————————————————————————————Vue生命周期，在类中的实现——————————————————————————————————
		created(): void {
		};

		mounted(): void {
			const elTdEl = ((this.$refs['elTableItem-detailInfo'] as HTMLElement).parentElement || {} as any).parentElement;
			// console.log("我要找的dom", elTdEl);
			// console.log("dom标签名", elTdEl.tagName);
			if (elTdEl.tagName.toLowerCase() == 'td') {       // 始终是大写的！
				console.log('成功为<td>标签，添加了verticalAlign样式属性！');

				elTdEl.style.verticalAlign = 'top';                     // 全部靠顶
				elTdEl.style.verticalAlign = 'middle';                  // 全部居中

			} else {
				throw new Error(xX_ExceptionError_Helper.throwError_andLog('寻找El的祖父级标签，发生错误！未找到目标中的  <td>标签！'));
			}
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

<style rel="stylesheet/scss" lang="scss" scoped>
	// 尝试规范的进行  CSS开发。

	.table {
		th,
		td {
			padding : 3px 15px;
			border  : 1px solid #E4E7ED;
			color   : #6b6b6b;
		}
	}

	.detail-table {
		/*max-width: 1400px;*/
		border : 1px solid #E4E7ED;

		// 左侧标签
		.td-field {
			/*width: 15%;*/
			/*width: 33%;*/

			// TODO 此处，应该放到代码中，动态计算字数
			// width: calc((15px * 2) + (1px * 2) + 5em);

			text-align       : right;
			background-color : #f9fafc;
		}

		// 右侧属性值
		.td-value {
			/*min-width: 50%;*/
			/*width: 67%;*/
			/*width: 25%;*/
		}
	}

</style>
