<template>
  <fragment>
    <!--TODO 虽然一般不建议在v-for中使用v-if（最佳实践是先把数组筛选掉），但此处，数据驱动下，用v-if判断更加方便-->
    <template v-for="(item,index) in formItems" v-if=" !( item.config||{} ).notRenderItem ">
      <!--常规字段-->
      <el-form-item
          v-if="item.myCategory === 'text' || item.myCategory === 'textarea' || item.myCategory === 'number' || item.myCategory === 'password' "
          :key="item.prop_AND_bindValue/* + '_' + uid()*/"
          :label="item.label"
          :prop="item.prop_AND_bindValue">
        <!--TIP :disabled项，专用于  Dialog有时需要禁用输入项的处理。-->
        <!--TIP Html当中，不允许使用  Ts语法。  这有点尴尬-->
        <el-input class="form-input" clearable
                  v-model="ruleForm[item.prop_AND_bindValue]"
                  :placeholder="item.placeholder"
                  :type="item.myCategory"
                  :disabled=" ( (item ).config||{} ).disableItem "
                  onmousewheel="console.log('禁止数字滚动；暂未做  Firefox 适配；');return false;"
        >
          <template v-if="item.prepend " slot="prepend">{{ item.prepend }}</template>
          <template v-if="item.append " slot="append">{{ item.append }}</template>
        </el-input>
      </el-form-item>
      <!--  数字范围输入框  -->
      <el-form-item v-else-if="item.myCategory === 'number_range' "
                    :key="item.prop_AND_bindValue/* + '_' + uid()*/"
                    :label="item.label"
                    :labelWidth="item.labelWidth"
                    :prop="item.prop_AND_bindValue">
        <!--复杂版本-->
        <!--
        <el-input class="numberRangeInput" v-model="ruleForm[item.left.require.name]"
                  :type="item.inputType"/>
        - -
        <el-input class="numberRangeInput" v-model="ruleForm[item.right.require.name]"
                  :type="item.inputType"/>
        -->

        <!--简单版本-->
        <el-input class="numberRangeInput" v-model="ruleForm[item.leftProp]" clearable
                  :type="item.inputType" />
        - -
        <el-input class="numberRangeInput" v-model="ruleForm[item.rightProp]" clearable
                  :type="item.inputType" />

      </el-form-item>
      <!--  正数input框  -->
      <el-form-item v-else-if="item.myCategory === 'positiveNumber' "
                    :key="item.prop_AND_bindValue/* + '_' + uid()*/"
                    :label="item.label"
                    :prop="item.prop_AND_bindValue">
        <Count_Input
            :config="item"
            :renderData="ruleForm"
        />
      </el-form-item>
      <!--  步进器  -->
      <el-form-item v-else-if="item.myCategory === 'step' "
                    :key="item.prop_AND_bindValue/* + '_' + uid()*/"
                    :label="item.label"
                    :prop="item.prop_AND_bindValue">
        <el-input-number v-model="ruleForm[item.prop_AND_bindValue]" :min="0" :max="99999999" label="描述文字"></el-input-number>
      </el-form-item>
      <!--下拉选项-->
      <el-form-item v-else-if="item.myCategory === 'options' "
                    :key="item.prop_AND_bindValue/* + '_' + uid()*/"
                    :label="item.label"
                    :prop="item.prop_AND_bindValue">
        <!--TIP :disabled项，专用于  Dialog有时需要禁用输入项的处理。-->
        <!--TIP Html当中，不允许使用  Ts语法。  这有点尴尬-->
        <el-select class="form-input" clearable
                   v-model="ruleForm[item.prop_AND_bindValue]"
                   :disabled=" ( (item ).config||{} ).disableItem ">
          <!--FIXME Vue的v-for中，遍历数组，会采用  (元素)  (元素，索引)  in  列表  的形式。-->
          <el-option v-for="(value_obj,key_index) in item.selectOptionConf.enumOptions  "
                     :key="key_index"
                     :label="value_obj"
                     :value=" item.selectOptionConf.mustParseInt_toFitBackend ? parseInt( key_index ) : key_index "></el-option>
        </el-select>
      </el-form-item>
      <!--级联选择器-->
      <el-form-item :label="item.label" :prop="item.prop_AND_bindValue"
                    v-if="item.myCategory === 'cascader' "
                    :key="item.prop_AND_bindValue/* + '_' + uid()*/">
        <el-cascader
            class="form-input"
            clearable
            :options="item.selectOptionConf"
            :show-all-levels="true"
            :change-on-select="true"
            v-model="ruleForm[item.prop_AND_bindValue]"
            data-change="handleChange">
        </el-cascader>
      </el-form-item>
      <!--单选框-->
      <el-form-item v-else-if="item.myCategory === 'radio' "
                    :key="item.prop_AND_bindValue/* + '_' + uid()*/"
                    :label="item.label"
                    :prop="item.prop_AND_bindValue">
        <el-radio-group v-model="ruleForm[item.prop_AND_bindValue]">
          <el-radio
              v-for="(value_obj,key_index) in item.selectOptionConf.enumOptions"
              :label="item.selectOptionConf.mustParseInt_toFitBackend ? parseInt( key_index ) : key_index"
              :key="key_index"
          >{{ value_obj }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <!--TIP 时间选择（无日期）-->
      <el-form-item v-else-if="item.myCategory === 'time' "
                    :key="item.prop_AND_bindValue/* + '_' + uid()*/"
                    :label="item.label"
                    :prop="item.prop_AND_bindValue">
        <el-time-picker v-model="ruleForm[item.prop_AND_bindValue]"
                        class="widthauto"
                        :is-range="false"
                        :arrow-control="true"
                        :selectableRange="'00:00:00 - 23:59:59'"
                        :format="item.format" :value-format="item.format"
                        :start-placeholder="t('form.Time_Picker_Start_Time')"
                        :end-placeholder="t('form.Time_Picker_End_Time')"
                        :editable="false" clearable
                        :disabled=" ( (item ).config||{} ).disableItem ">
        </el-time-picker>
      </el-form-item>
      <!--TIP 日期选择（无时间）-->
      <el-form-item v-else-if="item.myCategory === 'single_date' "
                    :key="item.prop_AND_bindValue/* + '_' + uid()*/"
                    :label="item.label"
                    :prop="item.prop_AND_bindValue">
        <el-date-picker v-model="ruleForm[item.prop_AND_bindValue]"
                        class="widthauto"
                        type="date"
                        :is-range="false"
                        :arrow-control="true"
                        :format="item.format" :value-format="item.format"
                        :editable="false" clearable
                        :disabled=" ( (item ).config||{} ).disableItem ">
        </el-date-picker>
      </el-form-item>
      <!--TIP 时间范围选择（无日期）-->
      <el-form-item v-else-if="item.myCategory === 'time_range' "
                    :key="item.prop_AND_bindValue/* + '_' + uid()*/"
                    :label="item.label"
                    :prop="item.prop_AND_bindValue">
        <el-time-picker v-model="ruleForm[item.prop_AND_bindValue]"
                        class="widthauto"
                        :is-range="true"
                        :arrow-control="true"
                        :selectableRange="'00:00:00 - 23:59:59'"
                        :format="item.format" :value-format="item.format"
                        :start-placeholder="t('form.Time_Picker_Start_Time')"
                        :end-placeholder="t('form.Time_Picker_End_Time')"
                        :editable="false" clearable
                        :disabled=" ( (item ).config||{} ).disableItem ">
        </el-time-picker>
      </el-form-item>
      <!--TIP 日期范围选择（无时间）-->
      <el-form-item v-else-if="item.myCategory === 'date_time' "
                    :key="item.prop_AND_bindValue/* + '_' + uid()*/"
                    :label="item.label"
                    :prop="item.prop_AND_bindValue">
        <!--daterange，选择日期+起始范围。-->
        <!--format，显示格式。value-format，双向绑定的数据格式。-->
        <!--editable，用户是否可以键盘输入时间值。clearable，清除按钮。-->

        <!--TIP :disabled项，专用于  Dialog有时需要禁用输入项的处理。-->
        <!--TIP Html当中，不允许使用  Ts语法。  这有点尴尬-->
        <el-date-picker v-model="ruleForm[item.prop_AND_bindValue]"
                        class="widthauto" type="daterange"
                        :format="item.format" :value-format="item.format"
                        :start-placeholder="t('form.Time_Picker_Start_Time')"
                        :end-placeholder="t('form.Time_Picker_End_Time')"
                        :editable="false" clearable
                        :disabled=" ( (item ).config||{} ).disableItem ">
        </el-date-picker>
      </el-form-item>
      <!--TIP 日期时间范围选择/带时间选择(12小时制)（有日期、有时间）-->
      <el-form-item v-else-if="item.myCategory === 'date_time_range' "
                    :key="item.prop_AND_bindValue/* + '_' + uid()*/"
                    :label="item.label"
                    :prop="item.prop_AND_bindValue">
        <el-date-picker v-model="ruleForm[item.prop_AND_bindValue]"
                        class="widthauto" type="datetimerange"
                        format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"
                        :start-placeholder="t('form.Time_Picker_Start_Time')"
                        :end-placeholder="t('form.Time_Picker_End_Time')"
                        :editable="false" clearable
                        :disabled=" ( (item ).config||{} ).disableItem ">
        </el-date-picker>
      </el-form-item>

      <!--TIP 日期时间范围选择/带时间选择(24小时制)/带时间选择快捷按钮  （有日期、有时间）-->
      <el-form-item v-if="item.myCategory === 'date_time_range_btn' "
                    :key="item.prop_AND_bindValue/* + '_' + uid()*/"
                    :label="item.label"
                    :prop="item.prop_AND_bindValue">
        <el-date-picker v-model="ruleForm[item.prop_AND_bindValue]"
                        class="widthauto" type="datetimerange"
                        format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"
                        :start-placeholder="t('form.Time_Picker_Start_Time')"
                        :end-placeholder="t('form.Time_Picker_End_Time')"
                        :editable="false" clearable
                        @change="changeSelectTime"
                        :disabled=" ( (item ).config||{} ).disableItem ">
        </el-date-picker>
      </el-form-item>
      <!--附属于上面类型-->
      <el-form-item v-if="item.myCategory === 'date_time_range_btn' "
                    :key="item.prop_AND_bindValue/* + '_' + uid()*/"
                    lable-width="0"
                    class="date-time-range-btn"
                    :prop="item.prop_AND_bindValue">
                <span class="btn-box">
                    <el-button :class="['btn',selectIndex == index ? 'active':'']" v-for="(val,index) in btnArr" :key="index"
                               @click="changeTime(val,index,item.prop_AND_bindValue)">{{ val }}</el-button>
                    </span>
      </el-form-item>

      <!--单张图片上传-->
      <el-form-item :label="item.label" :prop="item.prop_AND_bindValue" ref="imageUrlRef" v-if="item.myCategory === 'upload_img' "
                    :key="item.prop_AND_bindValue/* + '_' + uid()*/"
      >
        <UploadSingleImg :max-size="item.maxSize"
                         :width="150" :height="150"
                         :disabled=" ( (item ).config||{} ).disableItem "
                         v-model="ruleForm[item.prop_AND_bindValue]"
                         :preupload-api_-promise="preuploadApi_Promise"
                         @uploadSuccess="uploadSingleImageSuccess_Wrapper(item)(/*...arguments*/ arguments[0],arguments[1] )"></UploadSingleImg>
      </el-form-item>

      <!--TIP 【纯文本】多语言输入：单行/多行-->
      <el-form-item :label="item.label" :prop="item.prop_AND_bindValue" v-if="item.myCategory === 'lang_input' || item.myCategory === 'lang_inputTextarea' "
                    :key="item.prop_AND_bindValue/* + '_' + uid()*/"
      >
        <MultiLangSimple
            :ko_KR="hasKR"
            :ja_JP="hasJP"
            :ru_RU="hasRU"
        >
          <!--TODO 其实，此处可以用  【for循环】，快速生成-->
          <template #zh_CN>
            <div v-if="type === 3" class="editor-title">{{ ruleForm[item.prop_AND_bindValue].zh_CN }}</div>
            <el-input v-else v-model="ruleForm[item.prop_AND_bindValue].zh_CN" class="form-input"
                      :type=" item.myCategory === 'lang_input' ? 'text' : 'textarea' "
                      :autosize="{ minRows: 4, maxRows: 20}"
                      clearable></el-input>
          </template>
          <template #en_US>
            <div v-if="type === 3" class="editor-title">{{ ruleForm[item.prop_AND_bindValue].en_US }}</div>
            <el-input v-else v-model="ruleForm[item.prop_AND_bindValue].en_US" class="form-input"
                      :type=" item.myCategory === 'lang_input' ? 'text' : 'textarea' "
                      :autosize="{ minRows: 4, maxRows: 20}"
                      clearable></el-input>
          </template>
          <template #zh_TW>
            <div v-if="type === 3" class="editor-title">{{ ruleForm[item.prop_AND_bindValue].zh_TW }}</div>
            <el-input v-else v-model="ruleForm[item.prop_AND_bindValue].zh_TW" class="form-input"
                      :type=" item.myCategory === 'lang_input' ? 'text' : 'textarea' "
                      :autosize="{ minRows: 4, maxRows: 20}"
                      clearable></el-input>
          </template>
          <template #ko_KR>
            <div v-if="type === 3" class="editor-title">{{ ruleForm[item.prop_AND_bindValue].ko_KR }}</div>
            <el-input v-else v-model="ruleForm[item.prop_AND_bindValue].ko_KR" class="form-input"
                      :type=" item.myCategory === 'lang_input' ? 'text' : 'textarea' "
                      :autosize="{ minRows: 4, maxRows: 20}"
                      clearable></el-input>
          </template>
          <template #ja_JP>
            <div v-if="type === 3" class="editor-title">{{ ruleForm[item.prop_AND_bindValue].ja_JP }}</div>
            <el-input v-else v-model="ruleForm[item.prop_AND_bindValue].ja_JP" class="form-input"
                      :type=" item.myCategory === 'lang_input' ? 'text' : 'textarea' "
                      :autosize="{ minRows: 4, maxRows: 20}"
                      clearable></el-input>
          </template>
          <template #ru_RU>
            <div v-if="type === 3" class="editor-title">{{ ruleForm[item.prop_AND_bindValue].ru_RU }}</div>
            <el-input v-else v-model="ruleForm[item.prop_AND_bindValue].ru_RU" class="form-input"
                      :type=" item.myCategory === 'lang_input' ? 'text' : 'textarea' "
                      :autosize="{ minRows: 4, maxRows: 20}"
                      clearable></el-input>
          </template>
        </MultiLangSimple>
      </el-form-item>


      <!--TIP 【富文本】单一语言输入：tinymce-->
      <el-form-item :label="item.label" :prop="item.prop_AND_bindValue" v-if="item.myCategory === 'lang_single_tinymce' "
                    :key="item.prop_AND_bindValue/* + '_' + uid()*/"
      >
        <tinymce class="textarea_auto_size"
                 v-model="ruleForm[item.prop_AND_bindValue]"
                 :cols="80" :rows="16"
        ></tinymce>
      </el-form-item>

      <!--TIP 【富文本】多语言输入：UEditor-->
      <el-form-item :label="item.label" :prop="item.prop_AND_bindValue" v-if="item.myCategory === 'lang_ueditor' "
                    :key="item.prop_AND_bindValue/* + '_' + uid()*/"
      >
        <MultiLangSimple
            @clickTab="clickTabUeditor"
            :ko_KR="hasKR"
            :ja_JP="hasJP"
            :ru_RU="hasRU"
        >
          <!--TODO 其实，此处可以用  【for循环】，快速生成-->

          <!--简体中文插槽-->
          <template #zh_CN>
            <div v-if="type === 3" class="editor-content" v-html="ruleForm[item.prop_AND_bindValue].zh_CN"></div>
            <vue-ueditor-wrap v-else v-model="ruleForm[item.prop_AND_bindValue].zh_CN"
                              :config="ueditorConfig"></vue-ueditor-wrap>
          </template>
          <!--英文插槽-->
          <template #en_US>
            <div v-if="type === 3" class="editor-content" v-html="ruleForm[item.prop_AND_bindValue].en_US"></div>
            <vue-ueditor-wrap v-else v-model="ruleForm[item.prop_AND_bindValue].en_US"
                              :config="ueditorConfig"></vue-ueditor-wrap>
          </template>
          <!--繁体中文插槽-->
          <template #zh_TW>
            <div v-if="type === 3" class="editor-content" v-html="ruleForm[item.prop_AND_bindValue].zh_TW"></div>
            <vue-ueditor-wrap v-else v-model="ruleForm[item.prop_AND_bindValue].zh_TW"
                              :config="ueditorConfig"></vue-ueditor-wrap>
          </template>
          <!--韩文插槽-->
          <template #ko_KR>
            <div v-if="type === 3" class="editor-content" v-html="ruleForm[item.prop_AND_bindValue].ko_KR"></div>
            <vue-ueditor-wrap v-else v-model="ruleForm[item.prop_AND_bindValue].ko_KR"
                              :config="ueditorConfig"></vue-ueditor-wrap>
          </template>
          <!--日文插槽-->
          <template #ja_JP>
            <div v-if="type === 3" class="editor-content" v-html="ruleForm[item.prop_AND_bindValue].ja_JP"></div>
            <vue-ueditor-wrap v-else v-model="ruleForm[item.prop_AND_bindValue].ja_JP"
                              :config="ueditorConfig"></vue-ueditor-wrap>
          </template>
          <!--俄文插槽-->
          <template #ru_RU>
            <div v-if="type === 3" class="editor-content" v-html="ruleForm[item.prop_AND_bindValue].ru_RU"></div>
            <vue-ueditor-wrap v-else v-model="ruleForm[item.prop_AND_bindValue].ru_RU"
                              :config="ueditorConfig"></vue-ueditor-wrap>
          </template>
        </MultiLangSimple>
      </el-form-item>
    </template>
  </fragment>
</template>

<script lang="ts">

  import { xX_Father_ElFItem }                from '@lib-ts/element-ui/admin-cp/ElFItem';
  // @ts-ignore 不加则会报类型错误
  import xX_UploadSingleImg                   from '@lib-cp/UploadSingleImg';
  // @ts-ignore 不加则会报类型错误
  import xX_Count_Input                       from '@lib-cp/Count_Input';
  // @ts-ignore 不加则会报类型错误
  import xX_Tinymce                           from '@lib-cp/Tinymce';
  import { MixinLevelTag, xX_Father_BaseVue } from '@lib-ts/admin/mixins/Father_BaseVue';
  import { Component, Prop }                  from 'vue-property-decorator';

  const { getCurrentday, getCurrentWeek, getCurrentMonth, getDay, getBeforeOneMonth } = require('@lib-ts/element-ui/admin-cp/temp____lib/util.js');

  import {
    FormItem as ElFormItem,
    Select as ElSelect,
    Option as ElOption,
    Input as ElInput,
    InputNumber as ElInputNumber,
    Cascader as ElCascader,
    Radio as ElRadio,
    RadioGroup as ElRadioGroup,
    TimePicker as ElTimePicker,
    DatePicker as ElDatePicker,
  } from 'element-ui';

  // @ts-ignore
  import { Fragment, Plugin }     from 'vue-fragment';
  import { xX_SString_Helper }    from '@lib-ts/symbol-string/SString_Helper';
  import { t }                    from '@lib-ts/cp-util/locale/locale';
  import { xX_Rt_UEditor_Helper } from '@lib-ts/editor/richtext-editor/Rt_UEditor_Helper';

  // @ts-ignore
  import xX_MultiLangSimple from '@lib-cp/MultiLangSimple';

  // FIXME 此处，暂时没有调通！！！
  // FIXME 此处，暂时没有调通！！！
  // FIXME 此处，暂时没有调通！！！
  // FIXME 此处，暂时没有调通！！！
  // FIXME 此处，暂时没有调通！！！
  // FIXME 此处，暂时没有调通！！！
  // xX_Rt_UEditor_Helper.initUEditor(Vue);

  // import Vue from 'vue';							//
  // Vue.use(Plugin);	// 这种初始化方式。
  console.log('Fragment', Fragment);
  console.log('Fragment123123');
  console.log('Plugin', Plugin);

  // console.log('Fragment默认', TotalFragment);

  @Component({
    name      : 'MyFormEasy',
    components: {
      /*组件*/
      UploadSingleImg: xX_UploadSingleImg,
      MultiLangSimple: xX_MultiLangSimple,
      Count_Input    : xX_Count_Input,
      Tinymce        : xX_Tinymce,
      //
      ElFormItem,
      ElSelect,
      ElOption,
      ElInput,
      ElInputNumber,
      ElCascader,
      ElRadio,
      ElRadioGroup,
      ElTimePicker,
      ElDatePicker,
      //
      Fragment,
    },
    filters   : {},
  })
  export default class xX_MyFormEasy
      extends xX_Father_BaseVue {    // 混入在此处，进行添加。

    // 数据可以和父级通用
    @Prop({ type: Array, required: true }) readonly formItems!: xX_Father_ElFItem.Base[];
    // 数据可以和父级通用
    @Prop({ type: Object, required: true }) readonly ruleForm!: IndexedObj<any>;
    @Prop({ /* type: Object, */ required: false }) private preuploadApi_Promise!: Promise<Function>;

    @Prop({ type: Number, default: 1 }) private type!: number;                                          // 有可能是，对话框的类型  新增/编辑/审核 什么的。

    @Prop({ type: Boolean, default: true }) private hasKR!: boolean;        // 是否开启韩文
    @Prop({ type: Boolean, default: true }) private hasJP!: boolean;        // 是否开启日文
    @Prop({ type: Boolean, default: true }) private hasRU!: boolean;        // 是否开启俄文


    // Data，在类中的实现 （双向绑定除外）
    public selectIndex: any   = null;
    public dateRange: any     = null;
    public btnArr: Array<any> = ['今日', '本周', '本月', '近三日', '近半月', '近一月'];

    ueditorConfig!: object;

    // Method，在类中的实现

    public changeTime(item: string, index: number, key: string) {
      this.selectIndex = index;
      switch (index) {
        case 0:
          this.ruleForm[key] = getCurrentday();
          break;
        case 1:
          this.ruleForm[key] = getCurrentWeek();
          break;
        case 2:
          this.ruleForm[key] = getCurrentMonth();
          break;
        case 3:
          this.ruleForm[key] = getDay(2);
          break;
        case 4:
          this.ruleForm[key] = getDay(14);
          break;
        case 5:
          this.ruleForm[key] = getBeforeOneMonth();
          break;
        default:
          break;
      }
    }

    public changeSelectTime() {
      this.selectIndex = null;
    }

    public uploadSingleImageSuccess_Wrapper(item: xX_Father_ElFItem.Base) {              // 在外面包裹一层，兼容【$emit】、【选项传参】两种形式。
      console.log('执行了吗1', item);
      return (res: any, fileDetail: ElUploadInternalFileDetail_Type) => {
        console.log('执行了吗2', res, fileDetail);
        const extraCb = (item as xX_Father_ElFItem.UploadImg).uploadSingleImageSuccess_ExtraCb;       // 选项中传参的配置
        if (typeof extraCb == 'function') {
          console.log('图片额外回调中，有选项传参');
          extraCb(res, fileDetail);
        } else {
          console.log('图片额外回调中，无选项传参');
        }
        this.uploadSingleImageSuccess(res, fileDetail);
      };
    }

    public uploadSingleImageSuccess(res: any, file: any): void {
      this.$emit('uploadSuccess', res, file);
    }

    public clickTabUeditor() {
      this.$emit('clickTab');
    }

    /**
     * 创建v-for独一无二的id。用法：将强制重建  列表循环内的【子组件】项。
     */
    uid() {
      return xX_SString_Helper.uid();
    }

    t = t;

    // Lifecycle生命周期，在类中的实现
    created(): void {
      const _uEditorConfig: UndefinedAbleType<any> = (this as any).$getUEditorConfig?.();
      if (_uEditorConfig) {
        this.ueditorConfig = _uEditorConfig;
      } else {
        console.error('没有 ueditorConfig 配置！');
      }
    };

    mounted(): void {
      console.log(`【uid()】方法，不适合使用的几种情况：
			1.会在【输入框输入时】，触发【视图重新渲染】，这个时候会丢失焦点。
			`);
    };

    activated(): void {
    };

    updated(): void {
    };

    destroyed(): void {
    };

    MixinsData_1: MixinLevelTag = {} as any;
  }


  console.log('导入了组件库的【MyFormEasy】', xX_MyFormEasy);

</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss">
  .date-time-range-btn .el-form-item__content {
    margin-left : 0 !important;
  }

  .btn-box {
    margin-left : 10px;

    .active {
      background-color : #409EFF;
      color            : #fff;
    }
  }

  .numberRange {
    &Input {
      width : 200px;
    }
  }

</style>

<style lang="stylus" scoped>
  // 略微修改样式，便于【item文字换行】。
  /deep/ .el-form-item__label {
    word-break: break-all;
    white-space: pre-line;
  }

  // 之前遗留的样式文件
  .textarea_auto_size {
    width: 100%;
    height: 40%;
  }

</style>
