interface MyMceOptions {
	selector: string;   // 指定的<textarea>容器
	height: number;     // 高度
	body_class: string; // class样式
	object_resizing: boolean;   // TODO ???
	language:string;
	toolbar: string[];          // 用来配置，工具栏按钮的显示。（一个字符串里，包含多个按钮；多个字符串，对应多行的多个按钮）
	fontsize_formats: string;   // 字符串，包含提供给用户选择的多种字体大小
	menubar: string;    // 下拉编辑菜单项
	plugins: string[];    // 提供了哪些额外内容（如字数统计，等）
	end_container_on_empty_block: boolean;      // TODO ？？？
	powerpaste_word_import: string;             // TODO ？？？
	code_dialog_height: number;                 // TODO ？？？
	code_dialog_width: number;                  // TODO ？？？
	advlist_bullet_styles: string;  // TODO ？？？
	advlist_number_styles: string;  // TODO ？？？
	imagetools_cors_hosts: string[];  // TODO ？？？
	default_link_target: string;      // TODO ？？？
	link_title: boolean;            // TODO ？？？

	init_instance_callback: (editor: MyMceEditor) => any; // 大概是一个初始化方法的回调？？？
	setup: (editor: MyMceEditor) => any; // 大概是另一个回调方法？？？

}


// declare global {
interface Window {
	tinymce: {          // TODO 一个全局的富文本编辑库。需要额外在  index.html里用script外链脚本（指向本地static文件夹） 的方式，进行导入。（似乎是因为npm导入的方式，需要另外注册账号的原因。参照  ElementUI-admin）
		// TODO 因此，使用【js】+【.d.ts】的方式，而不采用  npm 的方式。
		get: (id: string) => MyMceEditor;
		init: (option: MyMceOptions) => any;
	};
}

interface MyMceEditor {
	destroy (): void;   // 销毁
	setContent (value: string): void;   // 设置编辑器内容
	getContent (): string;              // 获取编辑器内容
	insertContent (str: string): void;    // 在编辑器已有内容基础上，新添加内容
	on (name: string, callback: Function): void;    // 注册一些事件回调之类的
}

// }
