<!--制作注意：在模板文件里，用$来表示单纯美元符号，用$name来指代变量（注意一个词：迭代）-->
<!--TIP注释的使用：①-重要信息和描述 ②-适合给方法加注释 ③-不要过度使用，不要给HTML标签TIP加注释 ④-  -->
<template>
  <!--Controller内部的Dialog对话框。当触发@close事件时，this.dialogVisible变为false。而且经由Controller，触发父组件的closeDialogEvent事件-->
  <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" :close-on-click-modal="false" @close="closeDialog"
             class="common-dialog" width="50%">

    <!--总表单-->
    <el-form :model="MixinsData_2.ruleForm" :rules="rules" ref="ruleFormRef" label-width="120px"
             class="dialog-container">
      <el-form-item label="所属文章类型" prop="classId">
        <!--<el-input v-model="ruleForm.classId" class="form-input"></el-input>-->
        <el-cascader
            class="form-input"
            :options="categories"
            :show-all-levels="false"
            :change-on-select="true"
            v-model="MixinsData_2.ruleForm.classId"
            data-change="handleChange">
        </el-cascader>
      </el-form-item>
      <MyFormEasy :form-items="formItems" :ruleForm="MixinsData_2.ruleForm"
                  :preupload-api_-promise="testPromise"></MyFormEasy>

      <!--
      <tinymce v-model="MixinsData_2.ruleForm.content345" ref="input_color_content"
               cols=80 rows=16 class="textarea_auto_size"></tinymce>
      -->

      <!--{{ MixinsData_2.ruleForm}}-->

      <!--
          <el-form-item label="文章内容" prop="content">
            <tinymce v-model="MixinsData_2.ruleForm.content" ref="input_color_content"
                     cols=80 rows=16 class="textarea_auto_size"></tinymce>
          </el-form-item>
      -->

    </el-form>

    <!--对话框按钮组：确定、取消-->
    <div slot="footer" class="dialog-footer">
      <!--取消按钮。将会把this.dialogVisible值变为false-->
      <el-button @click="dialogVisible = false">{{ '取消' }}</el-button>
      <!--确定按钮。submitForm方法提交ruleFormRef表单。-->
      <el-button
          @click="submitForm('ruleFormRef')"
          type="primary"
          :loading="dataCommitting"
          :disabled="dataCommitting">{{ '确认' }}
      </el-button>
    </div>

  </el-dialog>
</template>

<script lang="ts">
  import { Component, Mixins, Prop } from 'vue-property-decorator';
  import xX_Father_DialogMixin       from '../../../sources/admin/mixins/Father_DialogMixin';
  import { xX_Father_ElFItem }       from '../../../sources/element-ui/admin-cp/ElFItem';
  import { xX_AdminHelper }          from '../../../sources/admin/admin-helper';
  import { selectOption }            from '../../enum-options/select-options';

  import MyFormEasy from '../../../packages/cp-element-ui/MyFormEasy';

  import {
    Dialog as ElDialog,
    Form as ElForm,
    FormItem as ElFormItem,
    Cascader as ElCascader,
    Button as ElButton,
  }                                       from 'element-ui';
  import Tinymce                          from '../../../packages/components/Tinymce';
  import { xX_MyEl_FormItem_Rule_Config } from '../../../sources/element-ui/admin-cp/ElRuleItem';

  const CreateBean = {
    'author'      : 'string',
    'classId'     : 0,
    'alias'       : '',
    // 'className': 'string',
    'content'     : 'string',
    // 'created': '2020-03-26T10:28:36.907Z',
    // 'id': 0,
    'img'         : 'string',
    'introduction': 'string',
    // 'lastUpdateTime': '2020-03-26T10:28:36.907Z',
    // 'number': 0,
    // 'parentName': 'string',
    'sort'        : 0,
    'status'      : 0,
    'title'       : 'string',
  };

  const UpdateBean = {
    'author'      : 'string',
    'classId'     : 0,
    'alias'       : '',
    // 'className': 'string',
    'content'     : 'string',
    // 'created': '2020-03-26T11:27:23.100Z',
    'id'          : 0,
    'img'         : 'string',
    'introduction': 'string',
    // 'lastUpdateTime': '2020-03-26T11:27:23.100Z',
    // 'number': 0,
    // 'parentName': 'string',
    'sort'        : 0,
    'status'      : 0,
    'title'       : 'string',
  };

  @Component({
    name      : 'Article_Create_Dialog',
    components: {
      ElDialog,
      ElForm,
      ElFormItem,
      ElCascader,
      ElButton,
      Tinymce,
      MyFormEasy,
    },
    filters   : {},
  })
  export default class Article_Create_Dialog
      extends Mixins(xX_Father_DialogMixin) {
    // TIP————————————————————————————————————Prop，从外界传入的只读属性—————————————————————————————————

    // TIP————————————————————————————————————Data，在类中的实现（@Model相关的除外）——————————————————————
    categories   = []; // 文章分类
    articleAlias = {}; // 文章别名

    testPromise = Promise.resolve(() => {
      console.log('结果1');
      return Promise.resolve(() => {
        console.log('结果2');
        return {
          test: '测试内容Promise',
        };
      });
    });

    // 表单检验规则配置
    get rules(): xX_MyEl_FormItem_Rule_Config {
      return { // 示范
        // demo: [new MyEl_RuleItem(this.$t("websiteOperation.articleManager.Select_Category").toString(),)],
      };
    };

    get formItems(): xX_Father_ElFItem.Base[] {                  // 动态生成FormItem表单项
      return [
        new xX_Father_ElFItem.Text({ name: 'title', label: '标题' }),
        new xX_Father_ElFItem.Text({ name: 'author', label: '作者' }),
        new xX_Father_ElFItem.Text({ name: 'introduction', label: '文章介绍' }),
        new xX_Father_ElFItem.Options({
          name: 'alias', label: '文章别名', selectOptionConf: {
            option      : this.articleAlias,
            needParseInt: false,
          },
        }),
        //
        new xX_Father_ElFItem.UploadImg({ name: 'img', label: '文章配图' }),
        new xX_Father_ElFItem.Text({ name: 'sort', label: '排序' }),

        new xX_Father_ElFItem.Options({
          name: 'status', label: '状态值', selectOptionConf: {
            option      : selectOption.articleStatus_Options,
            needParseInt: false,
          },
        }),
        new xX_Father_ElFItem.Single_RichText_Tinymce({ name: 'content', label: '文章内容' }, {}),
      ];
    };

    // TIP————————————————————————————————————Computed，在类中的实现——————————————————————————————————————
    // 弹窗标题
    get dialogTitle(): string {
      if (this.dialogType === 1) {
        // return this.$t('dialog.Create').toString();
        return '新建';
      } else {
        // return this.$t('table.Edit').toString();
        return '编辑';
      }
    }

    // TIP————————————————————————————————————Watch，在类中的实现—————————————————————————————————————————
    /*
          @Watch("dialogType", {immediate:true})
          public watch_dialogType(newVal: any, oldVal: any) {               // 新建/编辑 对话框的标题
            this.dialogTitle = newVal === 1 ? this.$t('dialog.Create').toString() : this.$t('table.Edit').toString()
          }
      */

    // TIP————————————————————————————————————Method，在类中的实现————————————————————————————————————————
    getCategoryAll(classId?: string) {
      // articleType_api.getAll()
      //                .then((data: any) => {
      //                  console.log('safsdf', data);
      //                  if (data) {
      //                    data.forEach((item: any) => {
      //                      item.label = item.name;
      //                      item.value = item.id;
      //                    });
      //                  }
      //
      //                  // 根据当前文章分类找到属于它的所有父级分类id
      //                  if (this.MixinsData_2.ruleForm.id) {
      //                    let parents = ArticleType_Helper.findParentsCategoryById(data, classId || this.MixinsData_2.ruleForm.classId);
      //
      //                    console.log('parents', parents);
      //
      //                    let parentIds = parents.reduce((res, item) => {
      //                      if (item.id) {
      //                        res.push(item.id);
      //                      }
      //                      return res;
      //                    }, []);
      //                    parentIds.push(classId || this.MixinsData_2.ruleForm.classId);
      //
      //
      //                    /*   console.ext_realLog("parents", parents);
      //                       console.ext_realLog("parentIds", parentIds);*/
      //                    this.MixinsData_2.ruleForm.classId = parentIds;
      //                  }
      //
      //                  this.categories = data || [];
      //                  this.$forceUpdate();
      //                  return data;
      //                })
      //                .catch(e => {
      //                  console.error(e);
      //                });
    }

    getAllArticleAlias() {
      // articleType_api.getAllArticleAlias()
      //                .then(data => {
      //                  this.articleAlias = data || {};
      //                });
    }

    // TIP————————————————————————————————————Vue生命周期，在类中的实现——————————————————————————————————
    created(): void {
      this.initFunc();
    };

    mounted(): void {
      // this.$notify.warning('test')
      this.getCategoryAll();
      this.getAllArticleAlias();
    };

    activated(): void {
    };

    updated(): void {
    };

    destroyed(): void {
    };


    // TIP————————————————————————————————————该方法，会在整个外部控制组件初始化，即放置在Html时，就执行；而showDialog方法，会在之后用户手动触发（伴随ElDialog的显示）。
    initFunc() {
      const self        = this;
      this.MixinsData_1 = { ...this.MixinsData_1 };       // TODO 顶级Mixins的数据初始化
      console.log('this.MixinsData_2 aaa', this.MixinsData_2);
      this.MixinsData_2 = {                             // TODO 二级Mixins的数据初始化
        ...this.MixinsData_2,             // TIP 放最前，为其它变量铺路
        ruleForm: {
          // ...this._innerData,
          // aaa: 121
          // ... ...  子组件和它的Mixin，共用的表单属性
          ...this.MixinsData_2.ruleForm,  // TIP 放最后，避免被覆盖
        },
        addCallback() {                                       // TIP 新建模式对话框的开启回调：将在showDialog的最后执行，作为附加额外操作。
          self.$nextTick(() => {
            // self.ruleFormRef = self.$refs.ruleFormRef;      // 将对话框的Form引用，传入【MultiLang】
          });
        },
        editCallback(row: any) {                              // TIP 编辑模式对话框的开启回调：将在showDialog的最后执行，作为附加额外操作。
          self.$nextTick(() => {
            // self.ruleFormRef = self.$refs.ruleFormRef;      // 将对话框的Form引用，传入【MultiLang】

            const classId = row.classId;
            const data    = {
              ...row,
            };
            data.classId  = [];
            self.getCategoryAll(classId);

            self.MixinsData_2.ruleForm = data;
            return false;
          });
        },
        closeCallback() {                                     // TIP 对话框的关闭回调。（此回调，可能已Deprecated）
          console.log('关闭对话框');
        },
        createCallback() {                                    // 点击确定，调用新增接口。（新建模式下）
          const data = {
            ...self.MixinsData_2.ruleForm,
          };
          if (data.classId.length > 0) {
            data.classId = data.classId[data.classId.length - 1];
          }
          const form = xX_AdminHelper.filterTargetFields(data, CreateBean);
          // return articleList_api.create(form);
        },
        updateCallback() {                                    // 点击确定，调用编辑接口。（编辑模式下）
          const data = {
            ...self.MixinsData_2.ruleForm,
          };
          if (data.classId.length > 0) {
            data.classId = data.classId[data.classId.length - 1];
          }
          console.log('data', data);
          const form = xX_AdminHelper.filterTargetFields(data, UpdateBean);
          // return articleList_api.update(form);
        },
        processCreatedCallback(res: any) {                            // （较少用）如果你要在对话框关闭之前，对【创建接口】返回的数据，进行额外处理或与额外操作。
          return res;                                                 // 注意，若没有额外处理过程，则返回原始数据即可。
        },
      };
    }

  }

</script>

<style rel="stylesheet/stylus" lang="stylus" scoped>
  // 尝试规范的进行  CSS开发。

  /*通用弹窗 start*/
  .common-dialog,
  .dialog-container {
    // 某些情况下，不限制宽度
    &.no-limit-width {
      .el-dialog {
        max-width: unset;
      }
    }

    .el-dialog {
      min-width: 640px;
      max-width: 1200px;
      margin-bottom: 30px;


    }

    .form-input-short {
      max-width: 300px;
    }

    .avatar-uploader,
      // .form-input,     // FIXME 此处，不能给【.form-input】添加  display:block。原因：Element-UI有一个【append】属性，需要  display为inline-table
    .multi-lang-simple-com {
      display: block;
      /*max-width: 500px;*/
    }

    .avatar-uploader .el-upload {
      display: block;
    }
  }
</style>
