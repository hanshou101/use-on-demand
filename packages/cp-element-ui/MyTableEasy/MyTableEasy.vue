<script lang="ts">

	import Vue, { VNode } from 'vue';

	import { Component, Prop }                  from 'vue-property-decorator';
	import { xX_SString_Helper }                from '@lib-ts/symbol-string/SString_Helper';
	import { MixinLevelTag, xX_Father_BaseVue } from '@lib-ts/admin/mixins/Father_BaseVue';

	import {
		TableColumn as ElTableColumn,
		Tag as ElTag,
	}                             from 'element-ui';

	// @ts-ignore
	import ElTableItem_DetailInfo from '@lib-cp/ElTableItem_DetailInfo';
	// import WrapDropdown           from '@lib-ts/element-ui/admin-cp/table/WrapDropdown.vue';

	xX_CPlugin_Helper.init_vViewer(Vue);	// 初始化【v-viewer】组件。

	// @ts-ignore
	import { Fragment, Plugin }         from 'vue-fragment';
	import { xX_CPlugin_Helper }        from '@lib-ts/vue/plugin/common-plugin';
	import { t }                        from '@lib-ts/cp-util/locale/locale';
	import { xX_data_elTagColorFilter } from '@lib-ts/element-ui/admin-cp/ElTagItem';

	type NotArray<T> = T extends Array<any> ? never : T;

	interface RenderFn {
		<T/*extends NotArray<T>*/>(tagName: string, datas: NotArray<T>, children?: string | any[]): VNode;   //
		(tagName: string, children?: string | any[]): VNode;                  //
	}

	@Component({
		name      : 'MyTableEasy',
		components: {
			/*组件*/
			ElTableItem_DetailInfo,

			Fragment,
			ElTableColumn,
			ElTag,
			// WrapDropdown,
			// Viewer,		// WARN 因为包含【组件 + 指令】，所以用 Vue.use 直接导入比较简单。
		},
		filters   : {},
	})
// export default class HelloWorld extends BaseVueClass {
	export default class xX_MyTableEasy extends xX_Father_BaseVue {    // 混入在此处，进行添加。
		@Prop({ type: Array, required: true }) readonly tableCols!: [];

		// Data，在类中的实现 （双向绑定除外）
		get resortTableCols() {
			const cloneArr: any[] = [...this.tableCols];
			cloneArr.unshift(cloneArr.pop() as any);
			return cloneArr;   // 最后一个，移至最前面。
		}

		// Method，在类中的实现
		anyToString(item: any) {
			if (typeof item === 'undefined' || item === null || (item + '').length === 0) {
				return '';
			} else {
				return item.toString();
			}
		}

		// 设置枚举状态Tag的值
		getEnum_fromField(options: any, field: string | undefined | null | '') {      // TIP 添加了特殊处理方法，用于处理  field为null的情况
			//console.log('options',options)
			if (field == '' || field == null || typeof field === 'undefined') {
				return '';
			} else {
				return (options || {})[field];
			}
		}

		/**
		 * 创建v-for独一无二的id。用法：将强制重建  列表循环内的【子组件】项。
		 */
		uid() {
			return xX_SString_Helper.uid();
		}

		t = t;

		public elTagFilter(status: string | number) {
			return xX_data_elTagColorFilter[status];
		}

		/*{
				// 列的name，类似于id，一般来说与prop保持一致即可（需唯一）
				name: '',
				// 字段名称，即 <el-table-column> 标签的 prop属性
				prop: '',
				// 设置表格列的label，优先级：labelFunction > i18nKey > label
				label: '',
				// 设置表格列的label，优先级：labelFunction > i18nKey > label
				i18nKey: '',
				/!* 表格类型，目前共有以下5种类型
					text: 普通文本
					index: 显示索引号，即设置<el-table-column>标签的type为index
					selection: 复选框形式，即设置<el-table-column>标签的type为selection
					enumTag: 枚举状态Tag，使用element-ui的<el-tag>标签进行布局，一般来说类似于显示 "状态" 就可以使用
					langTag: 展示多语言文字，类似需要展示多种语言的时候可以使用
					image: 显示图片，比如在表格中显示用户头像
				 *!/
				type: '',
				// 设置 <el-table-column> 标签的 width 属性，默认没有
				width: '',
				// 设置 <el-table-column> 标签的 minWidth 属性，默认没有
				minWidth: '',
				 // element-ui table-column的props
				elementTableColumnAttrs: {},
				 // 设置表格列的label，优先级：labelFunction > i18nKey > label
				labelFunction: function (当前列的信息){},
				// 自定义列的内容，仅在type=text时有效
				valueFunction: function (当前行的数据, 当前列的信息){}
				// 新增无数据undefined时展示值
				noDataVal: {}
			}*/
		public render(h: RenderFn): any {
			// 判断用户是否传递了slot，即用户是否需要自定内容
			const $slots          = (this as any).$scopedSlots;
			const children: any[] = this.resortTableCols.map((item: any) => {
				const type                    = item.type;
				let label                     = item.label;
				const hasSlots                = item.name in $slots;
				// element-ui table-column 的props
				const elementTableColumnAttrs = item.elementTableColumnAttrs || {};
				const options: any            = {
					/**
					 * FIXME 此处，原意是，避免【强缓存】的出现。
					 *        1.但是，后来发现【el-table-column】并不直接渲染，而是转换数据到【el-table-body】里面去。
					 *        2.所以，这里的防缓存，实际上是没有意义的。
					 */
					// key  : /* item.name || */ this.uid(),

					props: {
						...elementTableColumnAttrs,
					},
				};

				const that = this;

				function disableRenderCache(
					forceUse = true,                     // 是否强制开启？（此处，更加小粒度，进行控制）
				) {
					return forceUse
						? {
							/**
							 * 1.此处，每一个【item】的key，还不能完全一样！必须是独立的。
							 * 2.TODO 而且，我们可以在【代码中】检查，凡是有【vue组件】的，必须要拥有一个key；以免漏掉！
							 *
							 * 3.后来发现，其实这里没有【防缓存】也是能在【正常环境】下工作的。出现问题只是因为【谷歌翻译】！
							 */
							// FIXME 因为发现，是【谷歌翻译】引起的，所以暂时关闭【防缓存】。
							// 又再次打开了
							key: that.uid(),    // item.name 并不能起到【防缓存】的效果。（因为每一列的name都是一样的）
						}
						: {};
				}


				/* 列名优先使用label字段，如果传递了labelFunction，则由用户自定义；如果传递了i18nKey，则从i18n中获取 */
				if (item.labelFunction && typeof item.labelFunction === 'function') {
					label = item.labelFunction(item);
				} else if (item.i18nKey) {
					label = this.t(item.i18nKey);
				}
				// 设置label，即列名
				options.props.label = label;
				// 设置列的宽度
				if (item.width) {
					options.props.width = item.width;
				} else if (item.minWidth) {
					options.props.minWidth = item.minWidth;
				} else {
					options.props.minWidth = 110;
				}

				// 设置【内容隐藏时的tooltip】
				if (item.showOverflowTooltip) {
					options.props.showOverflowTooltip = item.showOverflowTooltip;
				}

				//let scopedEl: () => any = null;
				let scopedSlots: any = null;
				// 设置列的内容
				switch (type) {
					case 'text':
						if (!hasSlots) {
							// 如果有传递valueFunction，则使用valueFunction函数返回的值
							if (item.valueFunction && typeof item.valueFunction === 'function') {
								scopedSlots = {
									default: (props: any) => {

										return h('div', {
												...disableRenderCache() as { key: string },    // 防缓存
											},
											[         // 原生组件
												item.valueFunction(props.row, item),
											]);
									},
								};
							} else {
								options.props.prop = item.prop;
							}
						} else {
							const scopedEl: (data: any) => any = $slots[item.name];
							if (scopedEl) {
								scopedSlots = {
									default: (props: any) => {
										return scopedEl({
											row: props.row,
										});
									},
								};
							}
						}
						break;
					case 'selection':
						options.props.type       = 'selection';
						options.props.selectable = item.selectableFunction;           // 传函数，用于给ElementUI  判断当前行，是否可选中。
						break;
					case 'index':
						options.props.type = 'index';
						break;
					// 枚举状态Tag
					case 'enumTag':
						scopedSlots = {
							default: (props: any) => {
								//console.log(11111111111,item)
                let content = this.getEnum_fromField(item.selectOption, this.anyToString(
                    item.valueFunction
                        ? item.valueFunction(props.row, item)
                        : props.row[item.prop],
                ));
								const type = this.getEnumColor(item, props.row);

								// console.log('枚举条目', 'content', content, 'type', type, 'props', props,);

								return h('el-tag', {
									props: {
										type,
									},
									...disableRenderCache() as { key: string },    // 防缓存
								}, [content || '--']);
							},
						};
						break;
					// 国际化五颜六色语言
					case 'langTag': {
						scopedSlots = {
							default: (props: any) => {
								if (!props.row[item.prop] && item.noDataVal) {
									return h('multi-lang-tag', {
										props: {
											data: item.noDataVal,
										},
										...disableRenderCache() as { key: string },    // 防缓存
									});
								} else {
									return h('multi-lang-tag', {
										props: {
											data: props.row[item.prop],
										},
										...disableRenderCache() as { key: string },    // 防缓存
									});
								}
							},
						};
						break;
					}
					// 单张图片
					case 'image': {
						scopedSlots = {
							default: (props: any) => {
								return h('viewer', {
										...disableRenderCache() as { key: string },    // 防缓存
									},
									[h('img',
										{
											staticClass: 'table-column-img',
											attrs      : {
												src: props.row[item.prop],
											},
											...disableRenderCache() as { key: string },
										})]);
							},
						};
						break;
					}
					// 一组图片
					case 'imageList': {
						scopedSlots = {
							default: (props: any) => {
								let list: (string | null)[] = props.row[item.prop] || [];
								if (item.valueFunction && typeof item.valueFunction === 'function') {
									list = item.valueFunction(props.row, item) || [];
								}
								// console.log('list', list);
								return h(
									'div',
									{
										staticClass: 'imgListContainer',
										...disableRenderCache() as { key: string },    // 防缓存
									},
									list.map(str => {                                             // 循环遍历
											return h('viewer',
												{
													...disableRenderCache() as { key: string }, // 防缓存
												},
												[
													h('img', {
														staticClass: 'table-column-img',
														attrs      : {
															src: str,
														},
														...disableRenderCache() as { key: string }, // 防缓存
													})],
											);
										},
									),
								);
							},
						};
						break;
					}
					case 'detailInfo': {
						scopedSlots = {
							default: (props: any) => {
								return h('ElTableItem_DetailInfo', {
									props: {
										row  : props.row,
										pairs: item.pairs,
										item : item,
									},
									...disableRenderCache() as { key: string },    // 防缓存
								});
							},
						};
						break;
					}
					// 无type情况
					default: {
						const scopedEl: (data: any) => any = $slots[item.name];
						if (scopedEl) {
							scopedSlots = {
								default: (props: any) => {
									return scopedEl({
										row: props.row,
									});
								},
							};
						}
					}
				}
				if (scopedSlots) {
					options.scopedSlots = scopedSlots;
				}
				const el = h('el-table-column', options);
				return el;
			});
			return h('fragment', children);
		}

		// 变化Enum的颜色映射（比如，1不再对应success颜色）
		getEnumColor(formItem: any, row: any) {
			if (formItem.colorTrans) {
				// console.log('有colorTrans', '原始色', row[formItem.prop]);
				// console.log('变换后颜色', formItem.colorTrans(row[formItem.prop]));
				const color = xX_data_elTagColorFilter[formItem.colorTrans(row[formItem.prop])];
				// console.log('变换后颜色为', color);
				return color;
			} else {
				console.log('没有colorTrans');
				return xX_data_elTagColorFilter[row[formItem.prop]];
			}
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

<style lang="scss">
	.table-column-img {
		max-height : 130px;
	}

	.imgList {
		&Container {
			overflow       : auto;
			display        : flex;
			flex-direction : row;
			flex-wrap      : nowrap;

			.table-column-img {
				border       : 1px dashed #A0C9EE;
				padding      : 4px;
				margin-right : 8px;
			}
		}
	}
</style>

<style lang="scss" scoped>
	// 略微修改样式，便于【item文字换行】。
	.el-table td div {
		word-break  : break-all;
		white-space : pre-line;
	}

</style>
