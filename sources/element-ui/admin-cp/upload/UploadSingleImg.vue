<!--制作注意：在模板文件里，用${DS}来表示单纯美元符号，用$name来指代变量（注意一个词：迭代）-->
<!--TIP注释的使用：①-重要信息和描述 ②-适合给方法加注释 ③-不要过度使用，不要给HTML标签TIP加注释 ④-  -->

<template>
	<div class="upload-single-img-com">
		<el-upload
			ref="upload_single_img"
			class="avatar-uploader"
			:class="{'disabled':disabled}"
			:action="uploadHost"
			:show-file-list="false"
			:accept="acceptInner"
			:on-success="_handleUploadSuccess"
			:on-progress="_handleUploadProgress"
			:on-error="_handleUploadError"
			:data="uploadData"
			:auto-upload="false"
			:style="{width: width+'px',height: height+'px'}"
			:disabled="disabled_inner"
			:on-change="_fileOnChange">
			<div class="preview-box" v-if="showPreview" v-show="previewImg">
				<img :src="previewImg"
						 class="preview-img"
						 title="点击更换图片">
				<div class="tool-bar" @click.stop="1+2" v-show="preUploadFaild || uploadFaild">
					<el-button v-show="preUploadFaild" type="primary" size="mini" icon="el-icon-refresh" circle title="重试" @click="_preUpload(currentFile)"></el-button>
					<el-button v-show="uploadFaild" type="primary" size="mini" icon="el-icon-refresh" circle title="重试" @click="upload(true)"></el-button>
					<el-button type="danger" size="mini" icon="el-icon-delete" circle title="删除" @click="clear"></el-button>
				</div>
				<div class="uploading-tip" v-show="uploading">上传中...</div>
			</div>
			<i v-show="!showPreview || !previewImg" class="el-icon-plus avatar-uploader-icon"></i>
		</el-upload>
	</div>
</template>

<script lang="ts">
	// API，建议采用相对路径。


	import { ElUploadInternalFileDetail }             from 'element-ui/types/upload';
	import { ElUpload }                               from 'element-ui/types/element-ui';
	import { MixinLevelTag, xX_Father_BaseVue }       from '../../../admin/mixins/Father_BaseVue';
	import { Component, InjectReactive, Prop, Watch } from 'vue-property-decorator';

	import {
		Upload as ElUpload____Cp,
		Button as ElButton,
	} from 'element-ui';

	/**
	 * 1.参考资料：
	 *        [图片格式_百度百科](https://baike.baidu.com/item/%E5%9B%BE%E7%89%87%E6%A0%BC%E5%BC%8F/381122?fr=aladdin)
	 */
	const AllImageType = [
		'JPG',
		'JPEG',
		'PNG',
		//
		'BMP',
		'GIF',
		'WEBP',
		//
		'JFIF',
		'PJPEG',
		'PJP',
		'TIF',
		'PCX',
		'TGA',
		'EXIF',
		'FPX',
		'SVG',
		'PSD',
		'CDR',
		'PCD',
		'DXF',
		'UFO',
		'EPS',
		'AI',
		'RAW',
		'WMF',
		'AVIF',
	];

	@Component({
		name      : 'UploadSingleImg',
		components: {
			ElButton,
			ElUpload: ElUpload____Cp,
		},
	})
	export default class xX_UploadSingleImg extends xX_Father_BaseVue {    // 混入在此处，进行添加。

		// TIP： Inject，从任意层级父组件，传入数据
		/**
		 * 1.Inject的写法
		 *
		 * 2.Provide的写法：
		 * 				@ProvideReactive(/_* Provide的key *_/ 'preuploadApi') /_* data中的key *_/ two = /_*初始值*_/ 'value';
		 */
		// @InjectReactive(/* 别名 key */) /* data中的key */ preuploadApi!: /* 类型 */ Function  /* 没有初始值 */;
		/**
		 * 如果用这种方式，可以参照：
		 * 				1.https://stackoverflow.com/a/52592047/6264260。对【MyFormEasy】的初始化，做特殊处理。（很棒的思路！）
		 */
		@Prop({ type: Object, required: false }) private preuploadApi_Promise!: Promise<Function>;


		// TIP： Prop，在类中的实现
		@Prop({ type: String, default: '' }) private value!: string;
		// 单个文件最大体积，默认5M
		@Prop({ type: Number, default: 1 * 1024 * 1024 }) private maxSize!: number;
		@Prop({ type: Boolean, default: false }) private disabled!: boolean;
		@Prop({ type: Boolean, default: true }) private showPreview!: boolean;

		// TODO 此处，只是软性限制。可以用【JS逻辑】加上硬性限制！
		@Prop({
			type: Array, default: function() {
				return AllImageType;
			},
		}) private accept!: Array<string>;

		@Prop({ type: Number, default: 180 }) private width!: number;
		@Prop({ type: Number, default: 120 }) private height!: number;


		// TIP： Data，在类中的实现 （双向绑定除外）
		// 预览图片地址
		previewImg: string | Blob = '';
		disabled_inner: boolean   = false;
		acceptInner: string       = this.accept.map(type => {
			return `image/${type.toLocaleLowerCase()}`;
		}).join(',');
		// 上传时的额外参数
		uploadData: any           = {};
		// 上传url
		uploadHost: string        = '';
		// 预上传失败
		preUploadFaild: boolean   = false;
		// 上传失败
		uploadFaild: boolean      = false;
		currentFile: File | any   = null;
		uploading: boolean        = false;
		// 最后一次上传成功后的图片地址
		imgUri: string            = '';


		// TIP： Computed，在类中的实现
		// get fullMessage() {
		//     return `Full,${this.msg}`;
		// }

		// TIP： Watch，在类中的实现
		@Watch('disabled', { immediate: true })
		public watch_disabled(newVal: boolean) {
			this.disabled_inner = newVal;
		}

		@Watch('value', { immediate: true })
		public watch_value(newVal: string) {
			// 为了能够回显
			if (newVal && newVal != this.imgUri) {
				this.previewImg = newVal;
			}
		}

		// TIP： Method，在类中的实现
		// 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
		public _fileOnChange(file: ElUploadInternalFileDetail, fileList: object[]): void {
			// console.log('添加文件了', file, fileList);
			// 文件状态为 ready 则表明是添加文件
			if (file.status === 'ready') {
				// 文件大小超出
				if (file.size > this.maxSize) {
					// 弹出提示
					console.log('文件大小超出');
					const getKB = (size: number) => parseInt(String(size / 1024));
					this.$notify.warning(`图片大小超出最大限制。当前文件大小：${getKB(file.size)}KB。最大限制大小：${getKB(this.maxSize)}KB。`);

					// 向上传递事件
					this.$emit('error', 'MAX_SIZE_LIMIT', this.maxSize);
					// @ts-ignore
					(this.$refs.upload_single_img as ElUpload).uploadFiles.splice(0, 1);        // 删除文件
					return;
				}
				// TIP 文件格式不对
				if (
					!this.accept.find((type) => {
						return file.name.toLocaleLowerCase().includes(
							type.toLocaleLowerCase(),
						);
					})
				) {
					// 弹出提示
					console.log('文件格式不对');
					this.$notify.warning(`图片格式错误。当前文件格式： 【${file.raw.type}】 格式。应该上传的文件格式： 【${this.accept.join('/')}】 。`);

					// 向上传递事件
					this.$emit('error', 'MAX_SIZE_LIMIT', this.maxSize);
					// @ts-ignore
					(this.$refs.upload_single_img as ElUpload).uploadFiles.splice(0, 1);        // 删除文件
					return;
				}

				this.disabled_inner = false;
				this.preUploadFaild = false;
				this.uploadFaild    = false;
				this.uploading      = false;
				this.currentFile    = file;

				this.createPreviewImg(file.raw, (src: any) => {
					this.previewImg = src;
				});
				this._preUpload(file);
			}
		};

		// 预上传
		_preUpload(file: ElUploadInternalFileDetail): void {
			this.disabled_inner = true;
			this.preUploadFaild = false;
			this.uploading      = true;

			const arr    = file.name.split('.');
			const suffix = arr[arr.length - 1];

			if (!this.preuploadApi_Promise) {
				throw new Error(`
				如果你采用【Inject】方式：
								请从父组件的【Provide 或者 ProvideReactive】，传入【Inject 中的 preuploadApi_Promise】
				如果你采用【Prop】方式：
								请从<MyFormEasy>传入【Prop 中的 preuploadApi_Promise】
				`);
			}

			this.preuploadApi_Promise.then(fn => {
				fn().then((res: any) => {
					console.log(res);
					this.uploadHost                       = res.host;
					this.uploadData.name                  = res.signature;
					this.uploadData.key                   = `${res.dir}${new Date().getTime()}.${suffix}`;
					this.uploadData.policy                = res.policy;
					this.uploadData.OSSAccessKeyId        = res.accessid;
					this.uploadData.success_action_status = 200;
					this.uploadData.callback              = res.callback;
					this.uploadData.signature             = res.signature;

					this.upload();
				}).catch(() => {
					this.disabled_inner = false;
					this.preUploadFaild = true;
					this.uploading      = false;
				});
			});
		}

		// 上传图片
		upload(retry?: boolean): void {
			this.$nextTick(() => {
				// 上传重试，hack，element ui默认不支持重新上传
				if (retry) {
					this.currentFile.status = 'ready';
					// @ts-ignore
					(this.$refs.upload_single_img as ElUpload).uploadFiles.push(this.currentFile);
				}
				this.uploading = true;
				(this.$refs.upload_single_img as ElUpload).submit();
			});
		};

		// 删除图片
		clear(): void {
			this.disabled_inner = false;
			this.preUploadFaild = false;
			this.uploadFaild    = false;
			this.currentFile    = null;
			this.previewImg     = '';
			this.imgUri         = '';

			this.$emit('input', '');
		};

		// 创建预览图
		createPreviewImg(file: File, fn: Function): void {
			if (!fn || typeof fn !== 'function') {
				console.error('createPreviewImg函数第二个参数必须是一个函数!');
				return;
			}
			const img = document.createElement('img');

			if (window.URL) {
				const imgSrc = window.URL.createObjectURL(file);
				img.src      = imgSrc;
				fn(img.src);
				img.onload = () => {
					window.URL.revokeObjectURL(imgSrc);
				};

			} else if (window.FileReader) {
				const reader  = new FileReader();
				img.onload    = () => {
					fn(img.src);
				};
				reader.onload = (e: any) => {
					e       = e || window.event;
					img.src = e.target.result;
				};
				reader.readAsDataURL(file);
				// reader = null;
			}
		};

		// 图片上传成功回调
		public _handleUploadSuccess(res: any, file: ElUploadInternalFileDetail): void {
			this.disabled_inner = false;
			this.preUploadFaild = false;
			this.uploadFaild    = false;
			this.uploading      = false;
			this.currentFile    = null;
			this.imgUri         = res.uri;
			console.log('图片上传成功', res.uri);
			this.$emit('input', res.uri);
			this.$emit('uploadSuccess', res, file);
		};

		// 图片上传中回调
		public _handleUploadProgress(event: any, file: any) {
			this.$emit('uploadProgress', event, file);
		};

		// 图片上传失败回调
		public _handleUploadError(err: any): void {
			this.disabled_inner = false;
			this.preUploadFaild = false;
			this.uploading      = false;
			this.uploadFaild    = true;
			this.$emit('uploadError', err);
			// console.log('图片上传失败', err);
		};

		// TIP： Lifecycle生命周期，在类中的实现
		created(): void {
			// this.initFunc();
		};

		mounted(): void {
		};

		activated(): void {
		};

		updated(): void {
		};

		destroyed(): void {
		};

		MixinsData_1: MixinLevelTag = {} as any;

	}

</script>

<style rel="stylesheet/scss" lang="scss">
	.upload-single-img-com {

		.disabled {
			background : #F5F7FA;
			.el-upload {
				cursor : not-allowed;
			}
		}

		.avatar-uploader .el-upload {
			/*width: 180px;*/
			/*height: 120px;*/
			width  : 100%;
			height : 100%;
		}

		.preview-box {
			position : relative;
			height   : 100%;
		}

		.preview-img {
			max-width : 100%;
		}

		.tool-bar {
			position   : absolute;
			top        : 0;
			left       : 0;
			padding    : 5px 5px;
			width      : 100%;
			text-align : right;
		}

		.avatar-uploader-icon {
			/*width: 180px;*/
			/*height: 120px;*/
			/*line-height: 120px;*/
			width    : 100%;
			height   : 100%;
			position : relative;

			&:before {
				position  : absolute;
				top       : 50%;
				left      : 50%;
				transform : translate(-50%, -50%);
			}
		}

		.uploading-tip {
			position         : absolute;
			bottom           : 0;
			left             : 0;
			z-index          : 5;
			width            : 100%;
			padding          : 5px 10px;
			color            : #fff;
			font-size        : 14px;
			text-align       : left;
			background-color : rgba(0, 0, 0, 0.5);
		}
	}
</style>
