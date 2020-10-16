<template>
	<el-dropdown class="wrap-drop-down" trigger="click" placement="left">
		<el-button size="mini" type="primary">
			{{ t('table.Operation') }}
			<!--<i class="el-icon-caret-bottom el-icon&#45;&#45;right"/>-->
		</el-button>
		<el-dropdown-menu slot="dropdown">
			<el-dropdown-item>
				<slot name="dropdown-item"></slot>
			</el-dropdown-item>
		</el-dropdown-menu>
	</el-dropdown>
</template>

<script lang="ts">

	import { MixinLevelTag, xX_Father_BaseVue } from '../../../sources/admin/mixins/Father_BaseVue';
	import { Component }                        from 'vue-property-decorator';

	import {
		Button as ElButton,
		Dropdown as ElDropdown,
		DropdownMenu as ElDropdownMenu,
		DropdownItem as ElDropdownItem,
	}            from 'element-ui';
	import { t } from '../../cp-util/locale/locale';

	@Component({
		name      : 'WrapDropdown',
		components: {
			ElButton,
			ElDropdown,
			ElDropdownMenu,
			ElDropdownItem,
		},
		filters   : {},
	})
// export default class HelloWorld extends BaseVueClass {
	export default class Dropdown extends xX_Father_BaseVue {  // 混入在此处，进行添加。

		t = t;

		activated(): void {
		}

		created(): void {

		}

		destroyed(): void {
		}

		mounted(): void {
		}

		updated(): void {
		}

		MixinsData_1: MixinLevelTag = {} as any;

	}


</script>

<style lang="stylus" scoped>
	.wrap-drop-down {

	}
</style>
