<!--全局通用对话框-->
<template>
	<div class="count-input">
		<el-input type="tel" v-model="renderData[config.prop_AND_bindValue]" :disabled="config.disabled" />
	</div>
</template>

<script lang="ts">
	import Vue             from 'vue';
	import Component       from 'vue-class-component';
	import { Prop, Watch } from 'vue-property-decorator';
	import { t }           from '../../../../packages/cp-util/locale/locale';

	@Component({
		name   : 'Count_Input',
		filters: {},
	})
	export default class xX_Count_Input extends Vue {    // 混入在此处，进行添加。
		@Prop()
		public config: any;
		@Prop()
		public renderData: any;

		// Data，在类中的实现 （双向绑定除外）
		public ruleForm    = {
			size: 10,
		};
		public ruleFormRef = null;            // 将会传入【MultiLang】组件，拼接成为一整个【Form】整体。
		get curNum() {
			return +this.renderData[this.config.prop_AND_bindValue];
		}

		@Watch('curNum')
		public watchCurNum() {
			const max = this.config.max;
			const min = this.config.min === undefined ? 0 : this.config.min;
			let nextNum;
			if (this.config.type === 'positiveInteger') {
				nextNum = parseInt(`${+this.renderData[this.config.prop_AND_bindValue]}`) || min;
			} else {
				nextNum = parseFloat(`${+this.renderData[this.config.prop_AND_bindValue]}`) || min;
			}
			if (max && nextNum > max) {
				nextNum = max;
			}
			if (nextNum < min) {
				nextNum = min;
			}
			this.renderData[this.config.prop_AND_bindValue] = nextNum;
		}

		get dialogTitle() {
			return this.t('dialog.Select_User_Rights');
		}

		t = t;

		// 生命周期方法
		public created(): void {
		}

		public mounted(): void {
			console.log(11111, this.renderData);
			console.log(222222, this.config);
		}
	}
</script>

<style scoped>
</style>
