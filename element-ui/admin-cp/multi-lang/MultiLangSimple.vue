<template>
  <div class="multi-lang-simple-com">
    <el-tabs type="border-card" v-model="selectedCard" @tab-click="clickTab">
      <el-tab-pane
          :label="$t('lang.Simple_Chinese')"
          data-label="简体中文"
          v-if="zh_CN">
        <slot name="zh_CN"></slot>
      </el-tab-pane>
      <el-tab-pane
          :label="$t('lang.English')"
          data-label="英文"
          v-if="en_US">
        <slot name="en_US"></slot>
      </el-tab-pane>
      <el-tab-pane
          :label="$t('lang.Traditional_Chinese')"
          data-label="繁体中文"
          v-if="zh_TW">
        <slot name="zh_TW"></slot>
      </el-tab-pane>
      <el-tab-pane
          :label="$t('lang.Korean')"
          data-label="韩文"
          v-if="ko_KR">
        <slot name="ko_KR"></slot>
      </el-tab-pane>
      <el-tab-pane
          :label="$t('lang.Japanese')"
          data-label="日文"
          v-if="ja_JP">
        <slot name="ja_JP"></slot>
      </el-tab-pane>
      <el-tab-pane
          :label="$t('俄文')"
          data-label="俄文"
          v-if="ru_RU">
        <slot name="ru_RU"></slot>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">


import BaseVue, {MixinLevelTag, MyComponent, MyProp} from '../../../admin/mixins/BaseVue';

  @MyComponent({
    name: "MultiLangSimple"
  })
  export default class MultiLangSimple extends BaseVue {
    MixinsData_1: MixinLevelTag = {};
    /* props */
    @MyProp({type: Boolean, default: true}) readonly zh_CN!: boolean;     // 是否开启简体中文
    @MyProp({type: Boolean, default: true}) readonly en_US!: boolean;     // 是否开启英文
    @MyProp({type: Boolean, default: true}) readonly zh_TW!: boolean;     // 是否开启繁体中文
    @MyProp({type: Boolean, default: true}) readonly ko_KR!: boolean;     // 是否开启韩文
    @MyProp({type: Boolean, default: true}) readonly ja_JP!: boolean;     // 是否开启日文
    @MyProp({type: Boolean, default: true}) readonly ru_RU!: boolean;     // 是否开启俄文

    /* datas */
    // 选项卡选中项
    selectedCard: string = '';
    // 支持的语言
    langs: { [key: string]: any } = {
      zh_CN: 1,
      en_US: 1,
      zh_TW: 1,
      ko_KR: 1,
      ja_JP: 1,
      ru_RU: 1,
    };

    // 设置选项卡选中项
    setActiveCard(cardName: any): void {
      if (!(cardName in this.langs)) {
        return;
      }
      this.selectedCard = cardName;
    };

    public clickTab() {
      this.$emit('clickTab')
    }

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

  }
</script>

<style lang="scss">
  .multi-lang-simple-com {
    .el-tabs--border-card {
      border-radius: 5px;
      box-shadow: none;
      overflow: hidden;
    }
  }
</style>
