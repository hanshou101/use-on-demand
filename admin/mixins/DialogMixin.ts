/**
 * 全局CRUD对话框组件抽取
 */

import {ElForm} from 'element-ui/types/form';

import ExportExcel_Mixin                                                from './ExportExcel_Mixin';
import BaseVue, {MixinLevelTag, MyComponent, MyGetter, MyProp, MyWatch} from './BaseVue';
import {OssUploadBean, PreUploadBean}                                   from './CommonMixin';



/**
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 */


/**
 * 抽象类
 */
interface AbsInterface {
  selectOption: {};
  preuploadApi: () => Promise<any>;
}


@MyComponent({
  name      : 'DialogMixin',
  components: {
    /*组件*/
  },
  filters   : {
    elTagFilter(status: string | number) {
      const statusMap = {
        0: 'danger',
        1: 'success',
        2: 'info',
        3: 'primary',
        4: 'warning',
      };
      return (statusMap as any) [status];
    },
  },
})
// export default class HelloWorld extends BaseVueClass {
export default class DialogMixin extends BaseVue.Mixins(ExportExcel_Mixin) implements AbsInterface {    // 混入在此处，进行添加。
  // TIP:  Prop，在类中的实现
  // 控制弹窗显示与隐藏
  @MyProp({
    type    : Boolean,
    default : false,
    required: false,
  }) private show!: boolean;
  // 初始化的数据
  @MyProp({
    default() {
      return {};
    },
    required: false,
  }) initData!: any;
  // 弹窗类型 1-新增；2-编辑；3-查看；4-其他
  @MyProp({
    default : 1,
    required: false,
  }) public dialogType!: number;
  @MyGetter('language') public language!: string; // 语言

  // TIP: data 在类中的实现
  // public selectOption: MySelectOption_AllConfig = selectOption;
  get selectOption(): object {
    throw new Error('selectOption 属性需要重写！！！');
  };

  preuploadApi(): Promise<any> {
    throw new Error('preuploadApi 方法需要重写！！！');
  }

  //public dialogType: number = 1;
  public dialogVisible: boolean = this.show;
  // public uploadImgUrl = userServiceApi.aliyunUrl;
  //public statusFlag: string = '';
  // oss预上传数据
  public uploadHost: string        = '';
  // 上传携带参数
  public uploadData: OssUploadBean = {};
  // 翻译结果
  //public tranlateRes = {};
  // 表单是否正在提交中
  public dataCommitting: boolean = false;
  // 内部数据
  //public _innerData: any = {};

  // TIP: watch 在类中的实现
  @MyWatch('show', {immediate: true})
  public watch_show(newVal: boolean) {
    // console.log('填充完毕0', JSON.stringify(this.MixinsData_2.ruleForm));

    if (newVal !== this.dialogVisible) {
      this.dialogVisible = newVal;
    }
    if (newVal) {
      this._handleInitData(this.initData);
      console.log('展开显示');
      // console.log('填充完毕1', JSON.stringify(this.MixinsData_2.ruleForm));
      this.$nextTick(() => {
        console.log('修复之前对于DialogMixin改造的Bug', this.initData, this.MixinsData_2.ruleForm);
        this.showDialog(this.dialogType, this.initData);    // 此处，再次模拟一下先前的操作。
      });
    }
  }

  // TIP: methods 在类中的实现
  public showDialog(type: number, row?: {} | null): void {
    this.dialogVisible = true;
    this.$emit('update:show', true);
    // console.log('填充完毕2', JSON.stringify(this.MixinsData_2.ruleForm));
    if (row) {
      console.log('showDialog，添加数据', row);
      this.MixinsData_2.ruleForm = {                      // 此处，合并数据，而不是覆盖数据
        ...this.MixinsData_2.ruleForm,
        ...row,
      };
    }
    if (type === 1) {
      this.dialogType = 1;
      // // 增加状态的特殊处理
      if (typeof this.MixinsData_2.addCallback === 'function') {
        this.MixinsData_2.addCallback({});
      }
    } else if (type === 2) {
      this.dialogType = 2;

      console.log('进入编辑状态');

      // 编辑状态的特殊处理
      if (typeof this.MixinsData_2.editCallback === 'function') {
        this.MixinsData_2.editCallback(row);
        console.log('调用了此回调');
      }
    } else if (type === 3) {
      this.dialogType = 3;
      // 查看状态的特殊处理
      if (typeof this.MixinsData_2.editCallback === 'function') {
        this.MixinsData_2.editCallback(row);
      }
    }
    // console.log('填充完毕3', JSON.stringify(this.MixinsData_2.ruleForm));
  }

  public closeDialog(): void {
    this.dialogVisible = false;
    this.$emit('update:show', false);
    this.$emit('closeDialogEvent');
    console.log('手动关闭弹窗', this.dialogVisible);
    if (this.MixinsData_2.closeCallback) {
      this.MixinsData_2.closeCallback();
    }
  }

  public submitForm(formName: string): void {
    (this.$refs[formName] as ElForm).validate((valid: boolean) => {
      if (valid) {
        if (this.dialogType === 1) {
          if (this.dataCommitting) {
            return;
          }
          this._createItem();
          this.dataCommitting = true;
        } else if (this.dialogType === 2) {
          if (this.dataCommitting) {
            return;
          }
          this._updateItem();
          this.dataCommitting = true;
        } else {
          if (this.dataCommitting) {
            return;
          }
          // @ts-ignore
          if (typeof this.onFormValidated === 'function') {
            // 表单校验通过回调
            // @ts-ignore
            this.onFormValidated();
            //this.dataCommitting = true;
          }

        }
        // return true;
      } else {
        console.log('error submit!!');
        // return false;
      }
    });
  }

  // 数据处理
  public _handleInitData(data: any) {
    let dataStr = JSON.stringify(data);
    data        = JSON.parse(dataStr);
    //console.log('弹窗显示了，数据处理', data);
    if (data) {
      // console.log('填充完毕0.5', JSON.stringify(this.MixinsData_2.ruleForm));
      //console.log('showDialog，添加数据', data, this.MixinsData_2);
      this.MixinsData_2.ruleForm = {                      // 此处，合并数据，而不是覆盖数据
        // 把组件内部数据合进来
        ...this.MixinsData_2.ruleForm,
        ...data,
      };
      /*this._innerData = {
        ...data,
      };*/
      console.log('MixinsData_2.ruleForm', this.MixinsData_2.ruleForm);
      // 数据初始化后回调，不区分新增或编辑
      if (typeof this.MixinsData_2.dataInitCallback === 'function') {
        this.MixinsData_2.dataInitCallback(data);
      }
    }
    switch (this.dialogType) {
      case 1:
        // 增加状态的特殊处理
        if (typeof this.MixinsData_2.addCallback === 'function') {
          this.MixinsData_2.addCallback({});
        }
        break;
      case 2:
        // 编辑状态的特殊处理
        if (typeof this.MixinsData_2.editCallback === 'function') {
          this.MixinsData_2.editCallback(data);
        }
        break;
      case 3:
        // 查看状态的特殊处理
        if (typeof this.MixinsData_2.editCallback === 'function') {
          this.MixinsData_2.editCallback(data);
        }
        break;
    }
  }

  public async _createItem(): Promise<any> {
    this.MixinsData_2.createCallback()
        .then((res: any) => {
          this.$notify({
            type   : 'success',
            title  : this.$t('message.Prompt').toString(),
            message: this.$t('message.Create_Success').toString(),
          });
          this.dialogVisible = false;
          this.$emit('update:show', false);
          this.dataCommitting = false;
          this.$emit('refreshList');
          // 处理 一些需要拿到返回值的业务场景
          if (typeof this.MixinsData_2.processCreatedCallback === 'function') {
            this.MixinsData_2.processCreatedCallback(res);
          }
        })
        .catch(() => {
          this.dataCommitting = false;
        });
  }

  public async _updateItem(): Promise<any> {
    this.MixinsData_2.updateCallback()
        .then((res: any) => {
          this.$notify({
            type   : 'success',
            title  : this.$t('message.Prompt').toString(),
            message: this.$t('message.Update_Success').toString(),
          });
          this.dialogVisible = false;
          this.$emit('update:show', true);
          this.dataCommitting = false;
          this.$emit('refreshList');
        })
        .catch(() => {
          this.dataCommitting = false;
        });
  }

  public handleUploadSuccess(response: any): void {
    const {Status, uri} = response;
    if (Status === 'OK') {
      this.MixinsData_2.ruleForm.value = uri;
      this.$forceUpdate();
    }
  }

  public async beforeUpload(): Promise<any> {
    const preUploadData: PreUploadBean = (await this.preuploadApi()) as PreUploadBean;
    if (preUploadData) {
      const {dir, policy, signature, callback, accessid, host} = preUploadData;
      this.uploadHost                                          = host || '未获取到域名';
      this.uploadData.name                                     = signature;
      this.uploadData.key                                      = `${dir}${new Date().getTime()}.jpg`;
      this.uploadData.policy                                   = policy;
      this.uploadData.OSSAccessKeyId                           = accessid;
      this.uploadData.success_action_status                    = 200;
      this.uploadData.callback                                 = callback;
      this.uploadData.signature                                = signature;
    } else {
      return Promise.reject();
    }
  }

  /**
   * 以下方法，都是需要在子类中实现的interface方法。父类中只有空的。
   */

         // TODO 因为方法的调整，从【9.3.3】调整为了【9.7】，所以以下的标准语法，被注释掉了。
         // public ruleForm!: DialogMixinImpl['ruleForm'];
         // public addCallback!: DialogMixinImpl['addCallback'];
         // public editCallback!: DialogMixinImpl['editCallback'];
         // public closeCallback!: DialogMixinImpl['closeCallback'];
         // public createCallback!: DialogMixinImpl['createCallback'];
         // public processCreatedCallback!: DialogMixinImpl['processCreatedCallback'];
         // public updateCallback!: DialogMixinImpl['updateCallback'];

         // public Companion!: MixinsInheritCompanion<MixinFather> & DialogMixinImpl;

  public MixinsData_2: MixinLevelTag & DialogMixinImpl = {} as any;


}


// TODO 此处，如果继承别的接口，想法固然精妙；但是，这种方案有其受限制的地方；父类无法调用子类非抽象变量。
// export interface DialogMixinImpl extends ExportExcelMixinImpl { // 如果还有爷类，父类的接口需要继承爷类的接口。这样会使类型更加简洁。
export interface DialogMixinImpl { // 如果还有爷类，父类的接口需要继承爷类的接口。这样会使类型更加简洁。
  ruleForm: { value?: string; [key: string]: any };
  addCallback: Function;
  editCallback: Function;
  closeCallback: Function;
  dataInitCallback?: Function;
  //
  createCallback: Function;
  processCreatedCallback: Function;
  updateCallback: Function;
}