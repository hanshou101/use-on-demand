<template>
  <div>

    <!--提示标题、提示描述-->
    <el-alert type="success" :title="$t('element.multi_lang_plus.Alert_Title')"
              :description="$t('element.multi_lang_plus.Alert_Description')"
              :closable="false" class="alert-container"
    >
    </el-alert>

    <el-tabs v-model="activePaneName" type="border-card">

      <!--简体中文-->
      <el-tab-pane :label="$t('lang.Simple_Chinese')" name="1">
        <!--此处 写单独的rules为了解决blur事件不触发校验的问题-->
        <el-form-item :label="labelName" prop="translate.zh_CN"
        >
          <el-input
            :disabled="disabled"
            v-model="ruleForm.translate.zh_CN" class="form-input" clearable

            :type="  isTextArea? 'textarea' : 'text' "
            :autosize=" isTextArea && { minRows: 4, maxRows: 4} "
          ></el-input>

          <!--自动翻译5种语言-->
          <el-button
            v-if="disabled === false"

            type="danger" @click="handleTranslate" size="mini"
            :loading="translateLoading" icon="el-icon-search">
            {{ this.$t("element.multi_lang_plus.Translate_Button_Text") }}
          </el-button>

        </el-form-item>
        <slot name="content_zh_CN"></slot>
      </el-tab-pane>

      <!--英文-->
      <el-tab-pane :label="$t('lang.English')" name="2">
        <el-form-item :label="labelName" prop="translate.en_US">
          <el-input
            :disabled="disabled"
            v-model="ruleForm.translate.en_US" class="form-input" clearable

            :type="  isTextArea? 'textarea' : 'text' "
            :autosize=" isTextArea && { minRows: 4, maxRows: 4} "
          ></el-input>

          <!--自动翻译5种语言-->
          <el-button
            v-if="disabled === false"

            type="danger" @click="handleTranslate" size="mini"
            :loading="translateLoading" icon="el-icon-search">
            {{ this.$t("element.multi_lang_plus.Translate_Button_Text") }}
          </el-button>

        </el-form-item>
        <slot name="content_en_US"></slot>
      </el-tab-pane>

      <!--繁体中文-->
      <el-tab-pane :label="$t('lang.Traditional_Chinese')" name="3">
        <el-form-item :label="labelName"> <!--prop="translate.zh_TW"-->

          <el-input
            :disabled="disabled"
            v-model="ruleForm.translate.zh_TW" class="form-input" clearable

            :type="  isTextArea? 'textarea' : 'text' "
            :autosize=" isTextArea && { minRows: 4, maxRows: 4} "
          ></el-input>

        </el-form-item>
        <slot name="content_zh_TW"></slot>
      </el-tab-pane>

      <!--韩文-->
      <el-tab-pane :label="$t('lang.Korean')" name="4">

        <el-form-item :label="labelName"> <!--prop="translate.ko_KR"-->

          <el-input
            :disabled="disabled"
            v-model="ruleForm.translate.ko_KR" class="form-input" clearable

            :type="  isTextArea? 'textarea' : 'text' "
            :autosize=" isTextArea && { minRows: 4, maxRows: 4} "
          ></el-input>

        </el-form-item>
        <slot name="content_ko_KR"></slot>
      </el-tab-pane>

      <!--日文-->
      <el-tab-pane :label="$t('lang.Japanese')" name="5">
        <el-form-item :label="labelName"> <!--prop="translate.ja_JP"-->

          <el-input
            :disabled="disabled"
            v-model="ruleForm.translate.ja_JP" class="form-input" clearable

            :type="  isTextArea? 'textarea' : 'text' "
            :autosize=" isTextArea && { minRows: 4, maxRows: 4} "
          ></el-input>

        </el-form-item>
        <slot name="content_ja_JP"></slot>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script lang="ts">


import Father_BaseVue, { MixinLevelTag, MyComponent, MyGetter, MyProp } from "../../../admin/mixins/Father_BaseVue";

@MyComponent({
  name      : "MultiLangPlus",
  components: {
    /*组件*/
  },
  filters   : {}
})
// export default class HelloWorld extends BaseVueClass {
export default class MultiLangPlus extends Father_BaseVue {    // 混入在此处，进行添加。
  @MyGetter("language") public language!: string; // 语言

  // Prop，在类中的实现
  @MyProp({
    type    : [Array, Object],  // Prop混合类型
    required: true
  }) private ruleForm!: any;
  @MyProp({
    type    : [Array, Object],
    required: true
  }) private rules!: any;
  @MyProp({
    type: [Object]
  }) private ruleFormRef!: MyElForm;
  @MyProp({
    type    : String,
    required: true
  }) private labelName!: string;
  // TIP 是否禁止部分属性输入。
  @MyProp({
    type   : Boolean,
    default: false
  }) private disabled!: boolean;
  // TIP 针对某些需要标题多行的情况，手动控制  标题的  多行/单行。
  @MyProp({
    type   : Boolean,
    default: false
  }) private isTextArea!: boolean;
  //
  @MyProp({
    type    : Function,
    required: true
  }) private translateApi!: (data: any) => Promise<any>;


  //
  //
  //

  translateLoading   = false;
  activePaneName     = "1";
  multiLangForm: any = {
    translate: {
      zh_CN: "",
      en_US: "",
      zh_TW: "",
      ko_KR: "",
      ja_JP: ""
    }
  };

  public multiLangRules(): any {
    const checkDesc   = (rule: any, value: string, callback: Function) => {
      // 请输入待翻译字段
      if (value === "") {
        callback(new Error(this.$t("element.multi_lang_plus.Please_Input_The_Field_To_Be_Translate").toString()));
        this.$message({
          type   : "warning",
          message: this.$t("element.multi_lang_plus.Please_Input_The_Field_To_Be_Translate").toString()
        });
      } else {
        callback();
      }
    };
    const checkZHDesc = (rule: any, value: string, callback: Function) => {
      // 请输入中文待翻译字段
      if (value === "") {
        callback(new Error(this.$t("element.multi_lang_plus.Please_Input_Simplified_Chinese").toString()));
        this.$message({
          type   : "warning",
          message: this.$t("element.multi_lang_plus.Please_Input_Simplified_Chinese").toString()
        });
      } else {
        callback();
      }
    };
    const checkENDesc = (rule: any, value: string, callback: Function) => {
      // 请输入英文待翻译字段
      if (value === "") {
        callback(new Error(this.$t("element.multi_lang_plus.Please_Input_English").toString()));
        this.$message({
          type   : "warning",
          message: this.$t("element.multi_lang_plus.Please_Input_English").toString()
        });
      } else {
        callback();
      }
    };
    const checkTWDesc = (rule: any, value: string, callback: Function) => {
      // 请输入繁体中文待翻译字段
      if (value === "") {
        callback(new Error(this.$t("element.multi_lang_plus.Please_Input_Traditional_English").toString()));
        this.$message({
          type   : "warning",
          message: this.$t("element.multi_lang_plus.Please_Input_Traditional_English").toString()
        });
      } else {
        callback();
      }
    };
    const checkKRDesc = (rule: any, value: string, callback: Function) => {
      // 请输入韩语待翻译字段
      // if (value === '') {
      //   callback(new Error(this.$t('element.multi_lang_plus.Please_Input_Korean')))
      //   this.$message({
      //     type: 'warning',
      //     message: this.$t('element.multi_lang_plus.Please_Input_Korean'),
      //   })
      // } else {
      //   callback()
      // }
    };
    const checkJPDesc = (rule: any, value: string, callback: Function) => {
      // 请输入日语待翻译字段
      // if (value === '') {
      //   callback(new Error(this.$t('element.multi_lang_plus.Please_Input_Japanese')))
      //   this.$message({
      //     type: 'error',
      //     message: this.$t('element.multi_lang_plus.Please_Input_Japanese'),
      //   })
      // } else {
      //   callback()
      // }
    };

    return {
      "translate.zh_CN": [
        { required: true, validator: checkZHDesc }
      ],
      "translate.en_US": [
        { required: true, validator: checkENDesc }
      ],
      "translate.zh_TW": [
        { required: true, validator: checkTWDesc }
      ],
      "translate.ko_KR": [
        { required: true, validator: checkKRDesc }
      ],
      "translate.ja_JP": [
        { required: true, validator: checkJPDesc }
      ]
    };
  }

  //
  //
  //
  //

  translate(data: any) {
    return this.translateApi(data);
  }

  // 该方法支持由英语翻译成其他4种
  // 或由简体中文翻译成其他4种
  async handleTranslate() {
    this.translateLoading = true;
    let validateRes       = null;
    let from              = "en";
    let to                = "zh";
    let src               = this.ruleForm.translate.zh_CN;

    // 当前语言为英语
    if (this.language === "en_US") {
      from = "en";
      to   = "zh";
      src  = this.ruleForm.translate.en_US;
      this.ruleFormRef.validateField("translate.en_US", (res) => {
        validateRes = res;
      });
    } else {
      from = "zh";
      to   = "en";
      src  = this.ruleForm.translate.zh_CN;
      this.ruleFormRef.validateField("translate.zh_CN", (res) => {
        validateRes = res;
      });
    }
    if (validateRes != "") {
      this.translateLoading = false;
      return;
    }
    // 简体中文-英语 或者英语->简体中文
    const translate_zh_EN = {
      from: from,
      to  : to,
      src : src
    };

    // 翻译繁体中文
    const translate_TW = {
      from: from,
      to  : "cht",
      src : src
    };
    // 翻译韩文
    const translate_KO = {
      from: from,
      to  : "kor",
      src : src
    };
    // 翻译日文
    const translate_JP = {
      from: from,
      to  : "jp",
      src : src
    };
    try {
      const [transZhOrEnRes, transTwRes, transKoRes, transJpRes] = await Promise.all([
        this.translate(translate_zh_EN),
        this.translate(translate_TW),
        this.translate(translate_KO),
        this.translate(translate_JP)
      ]);
      this.translateLoading                                      = false;
      if (this.language === "en_US") {
        this.ruleForm.translate.zh_CN = (transZhOrEnRes as any).trans_result[0].dst;
      } else {
        this.ruleForm.translate.en_US = (transZhOrEnRes as any).trans_result[0].dst;
      }
      //this.ruleForm.translate.zh_TW = transTwRes.trans_result[ 0 ].dst
      //this.ruleForm.translate.ko_KR = transKoRes.trans_result[ 0 ].dst
      //this.ruleForm.translate.ja_JP = transJpRes.trans_result[ 0 ].dst
      // 翻译成功
      this.$message.success(
        this.$t("element.multi_lang_plus.Translate_Success").toString() /* 翻译成功*/
      );
    } catch (e) {
      // 翻译失败
      console.log(this.$t("element.multi_lang_plus.Translate_Failure").toString(), e);
      this.translateLoading = false;
    }

    // console.log("翻译结果", this.ruleForm)
  }

  //
  //
  //
  //

  public created(): void {
    // 与父类混合表单项和校验规则
    for (const item in this.multiLangForm) {
      // 编辑的时候不能被初始值覆盖
      if (this.ruleForm[item] == "" || this.ruleForm[item] == undefined) {
        this.ruleForm[item] = this.multiLangForm[item];
      }
    }
    const _langRules = this.multiLangRules();
    for (const item in _langRules) {
      this.rules[item] = _langRules[item];
    }
  }

  public mounted(): void {
  }

  public updated(): void {
  }

  public activated(): void {
  }

  public destroyed(): void {
  }

  MixinsData_1: MixinLevelTag = {} as any;

}


</script>

<style scoped lang="stylus" type="text/stylus">

</style>
