<template>
  <el-dropdown trigger="click" placement="left">
    <el-button size="mini" type="primary">
      {{ $t('table.Operation') }}
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
import Father_BaseVue, {MixinLevelTag, MyComponent} from '../mixins/Father_BaseVue';

@MyComponent({
  name      : 'WrapDropdown',
  components: {
    /*组件*/
  },
  filters   : {},
})
// export default class HelloWorld extends BaseVueClass {
export default class Dropdown extends Father_BaseVue {  // 混入在此处，进行添加。

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
