<template>
  <div class="multilang-tag">
    <el-popover
        v-for="(item,key) in sortedLangList"
        :key="key"
        :title="item.title"
        :placement="key === 0?  'left-start':'bottom-start'"
        :offset="300"
        :visible-arrow="true"
        :open-delay="450"
        trigger="hover">
      <!--  :content="processedData? processedData[item.lang] : ''"  -->
      <div class="content__multiLang--htmlInflate" v-html="processedData ? processedData[item.lang] : '--'"></div>

      <el-tag slot="reference" :type="item.type" v-if="processedData[item.lang]" >
        {{ processedData ? processedData[item.lang] : '--' }}
        <!--为了解决一个非常奇怪的小bug。TypeError: Cannot read property 'zh_CN' of undefined-->
      </el-tag>
    </el-popover>
    <div class="show-more-lang"
         v-show="omit && tagTypeArray.length > omitLength"
          @click="showMoreBtnClick">
      {{showMore ? '隐藏更多语言' : '显示更多语言'}}
    </div>
  </div>
</template>

<script lang="ts">


import Father_BaseVue, { MixinLevelTag, MyComponent, MyGetter, MyProp } from "../../../admin/mixins/Father_BaseVue";

  @MyComponent({
    name:       "MultiLangTag",
    components: {
      /*组件*/
    },
    filters:    {},
  })
  // export default class HelloWorld extends BaseVueClass {
  export default class MultiLangTag extends Father_BaseVue {    // 混入在此处，进行添加。

    // Prop，在类中的实现
    @MyProp({
      type: [Object, String],
      required: true,
    })
    private data!: {};
    // 语言过多时是否折叠
    @MyProp({
      type: Boolean,
      required: false,
      default: false
    })
    private omit!: boolean;
    // 语言超过omitLength则折叠
    @MyProp({
      type: Number,
      required: false,
      default: 2
    })
    private omitLength!: number;
    // // 是否是对象
    // @MyProp({
    //     type: Boolean,
    //     default: true,
    // }) private isObject!: boolean;
    // //是否横排
    // @MyProp({
    //     type: Boolean,
    //     default: false,
    // }) private isHorizontal!: boolean;

    @MyGetter('language') public language!: string; // 语言

    public tagTypeArray = [
      // 中文
      {
        type: "danger",
        lang: "zh_CN",
        title: "简体中文", /* 此处，不需要国际化*/
      },
      // 英文
      {
        type: "primary",
        lang: "en_US",
        title: "English", /* 此处，不需要国际化*/
      },
      // 繁体中文
      {
        type: "warning",
        lang: "zh_TW",
        title: "繁體中文", /* 此处，不需要国际化*/
      },
      // 韩文
      {
        type: "success",
        lang: "ko_KR",
        title: "한국어", /* 此处，不需要国际化*/
      },
      // 日文
      {
        type: "info",
        lang: "ja_JP",
        title: "日本語", /* 此处，不需要国际化*/
      },
      // 俄文
      {
        type:  "primary",
        lang:  "ru_RU",
        title: "русский", /* 此处，不需要国际化*/
      },
    ];
    public showMore: boolean = false;

    // Computed，在类中的实现
    // FIXME 将原本在beforeMount中的【processedData】，移动至computed属性当中。怀疑是<el-table>的列表缓存机制的问题？？？
    get processedData() {        // 放置经过JSON处理后的传入数据。
      // TIP 对传入进来的数据，进行自动识别处理。
      if (this.data) {          // TIP 要考虑，后台没有返回实体数据的情况。
        const new_typedData = typeof this.data === "string" ? JSON.parse(this.data) : this.data;     // 统一转化为JSON对象。
        // console.log(`已更新了数据：${JSON.stringify(new_typedData)}`)
        return new_typedData;
      } else {
        return {};   // 如果没有数据，则返回空对象。
      }
    }

    // 获取排序后的语言列表
    get sortedLangList() {
      const lang = this.language;
      const langList = [...this.tagTypeArray];
      const index = langList.findIndex((item: any) => {
        return item.lang === lang;
      });
      if (index > 0) {
        const item: any = langList[index];
        langList.splice(index, 1);
        langList.unshift(item);
      }
      console.log('omit', this.omit)
      if (this.omit) {
        if (langList.length > this.omitLength) {
          console.log(11)
          if (!this.showMore) {
            console.log(22)
            langList.splice(this.omitLength, langList.length - this.omitLength);
          }
        }
      }
      return langList;
    }

    public showMoreBtnClick(): void{
      this.showMore = !this.showMore;
     /* let $parent: any = this.$parent.$parent;
      if($parent.$options.name === 'ElTable'){
        $parent.doLayout();
        this.$forceUpdate();
      }*/
    }

    public created(): void {
    }

    public beforeMount() {
      // if (this.isObject) {
      //   this.processedData = this.data
      // } else {
      //   this.processedData = JSON.parse(this.data)
      // }
    }

    public mounted(): void {
      console.log('父元素', this.$parent.$parent.$options.name)
    }

    public updated(): void {
    }

    public activated(): void {
    }

    public destroyed(): void {
    }

    MixinsData_1: MixinLevelTag = {} as any

  }

</script>


<style rel="stylesheet/scss" lang="scss" type="text/scss">
  .content__multiLang--htmlInflate {
    max-width: 90vw;
    max-height: 80vh;
    /*overflow: scroll;*/
    overflow: auto;

    word-break: break-all;
  }

  .multilang-tag {
    & > span {
      display: block;

      & + span {
        margin-top: 3px;
      }

      .el-tag {
        display: inline-block;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .show-more-lang {
      display: inline-block;
      cursor: pointer;
      color: #999;
      transition: color .2s;
      &:hover{
        color: #e09eff;
      }
    }
  }
</style>
