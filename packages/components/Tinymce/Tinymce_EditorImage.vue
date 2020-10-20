<template>
	<div class="upload-container">
		<el-button icon='el-icon-upload' size="mini" :style="{background:color,borderColor:color}"
							 @click=" dialogVisible=true" type="primary">
			{{ t('dialog.Upload_Img') }}
		</el-button>
		<el-dialog append-to-body :visible.sync="dialogVisible">
			<el-upload class="editor-slide-upload"
								 :action="uploadHost"
								 :multiple="true"
								 :file-list="fileList"
								 :show-file-list="true"
								 list-type="picture-card"
								 :on-remove="handleRemove"
								 :on-success="handleSuccess"
								 :before-upload="beforeUpload"
								 :data="uploadData"
			>
				<el-button size="small" type="primary">{{ t('dialog.Click_Upload') }}</el-button>
			</el-upload>
			<el-button @click="dialogVisible = false">{{ t('dialog.Cancel') }}</el-button>
			<el-button type="primary" @click="handleSubmit">{{ t('dialog.Confirm') }}</el-button>
		</el-dialog>
	</div>
</template>

<script lang="ts">

	import { Component, Prop }                  from 'vue-property-decorator';
	import { MixinLevelTag, xX_Father_BaseVue } from '../../../sources/admin/mixins/Father_BaseVue';
	import { OssUploadBean, PreUploadBean }     from '../../../sources/admin/mixins/Father_CommonMixin';

	import {
		Button as ElButton,
		Dialog as ElDialog,
		Upload as ElUpload,
	}            from 'element-ui';
	import { t } from '../../cp-util/locale/locale';

	@Component({
		name      : 'EditorImage',
		components: {
			ElButton,
			ElDialog,
			ElUpload,
		},
		filters   : {},
	})
	// export default class HelloWorld extends BaseVueClass {
	export default class EditorImage
		extends xX_Father_BaseVue {    // 混入在此处，进行添加。
		// Prop，在类中的实现
		@Prop({
			type    : String,
			default : '#1890ff',
			required: false,
		}) private color!: string;

		/**
		 * 如果用这种方式，可以参照：
		 * 				1.https://stackoverflow.com/a/52592047/6264260。对【MyFormEasy】的初始化，做特殊处理。（很棒的思路！）
		 */
		@Prop({ /* type: Object, */ required: false }) private preuploadApi_Promise!: Promise<Function>;


		//
		//
		//

		// Data，在类中的实现 （双向绑定除外）
		dialogVisible             = false;
		listObj: any              = {};
		fileList                  = [];
		// oss预上传数据
		uploadHost                = '';
		// 上传携带参数
		uploadData: OssUploadBean = {};

		t = t;

		// Method，在类中的实现
		checkAllSuccess() {
			return Object.keys(this.listObj).every((item: any) => this.listObj[item].hasSuccess);
		}

		handleSubmit() {
			const arr = Object.keys(this.listObj).map((v: any) => this.listObj[v]);
			if (!this.checkAllSuccess()) {
				this.$message(
					this.t('message.Please_Wait_All_Pics_Upload_Success').toString(),/* 请等待所有图片上传成功 或 出现了网络问题，请刷新页面重新上传！*/
				);

				return;
			}
			console.log(arr);
			this.$emit('successCBK', arr);
			this.listObj       = {};
			this.fileList      = [];
			this.dialogVisible = false;
		}

		handleSuccess(response: any, file: any) {
			const uid       = file.uid;
			const objKeyArr = Object.keys(this.listObj);
			for (let i = 0, len = objKeyArr.length; i < len; i++) {
				if (this.listObj[objKeyArr[i]].uid === uid) {
					this.listObj[objKeyArr[i]].url        = response.uri;
					this.listObj[objKeyArr[i]].hasSuccess = true;
					return;
				}
			}
		}

		handleRemove(file: any) {
			const uid       = file.uid;
			const objKeyArr = Object.keys(this.listObj);
			for (let i = 0, len = objKeyArr.length; i < len; i++) {
				if (this.listObj[objKeyArr[i]].uid === uid) {
					delete this.listObj[objKeyArr[i]];
					return;
				}
			}
		}

		async beforeUpload(file: any) {
			console.log('富文本图片上传，beforeUpload');

			if (!this.preuploadApi_Promise) {
				try {
					throw new Error(`
					如果你采用【Inject】方式：
									请从父组件的【Provide 或者 ProvideReactive】，传入【Inject 中的 preuploadApi_Promise】
					如果你采用【Prop】方式：
									请从<TinyMce>传入【Prop 中的 preuploadApi_Promise】
					`);
				} catch (e) {
					// WARN 此处，非常诡异的【Element-UI】会把所有Error抛出都吃掉。所以我们只能手动打印错误日志了。
					console.error(e);
				}
			}

			const preUploadData: PreUploadBean = ((await this.preuploadApi_Promise)()) as PreUploadBean;
			if (preUploadData) {
				const { dir, policy, signature, callback, accessid, host } = preUploadData;
				this.uploadHost                                            = host || '万一没获取到url？';
				this.uploadData.name                                       = signature;
				this.uploadData.key                                        = `${dir}${new Date().getTime()}.jpg`;
				this.uploadData.policy                                     = policy;
				this.uploadData.OSSAccessKeyId                             = accessid;
				this.uploadData.success_action_status                      = 200;
				this.uploadData.callback                                   = callback;
				this.uploadData.signature                                  = signature;

				const self             = this;
				const _URL             = window.URL || window.webkitURL;
				const fileName         = file.uid;
				this.listObj[fileName] = {};

				const img  = new Image();
				img.src    = _URL.createObjectURL(file);
				img.onload = function(this: any) {
					self.listObj[fileName] = {
						hasSuccess: false,
						uid       : file.uid,
						width     : this.width,
						height    : this.height,
					};
				};
				return Promise.resolve(true);
			} else {
				return Promise.reject();
			}
		}

		public created(): void {
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

<style rel="stylesheet/scss" lang="scss" scoped>
	.upload-container {

		.editor-slide-upload {
			margin-bottom : 20px;
		}

	}
</style>
