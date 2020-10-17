// Here is a list of the toolbar
// Detail list see https://www.tinymce.com/docs/advanced/editor-control-identifiers/#toolbarcontrols

/**
 * 此处是工具栏按钮的  显示/隐藏
 *      1. 一个字符串，代表一行。（内部可用空格隔开，一个单词代表一个选项按钮）
 *      2. 数组内部，用逗号隔开的字符串元素，表示  工具栏按钮的多行。
 *      3. 你也可以手动添加  很多工具栏按钮。（通过添加  字符串内单词，或者  另开一个字符串的方式。）
 */
const toolbar: string[] = ['bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample', 'hr bullist numlist link image charmap	 preview anchor pagebreak insertdatetime media table emoticons forecolor backcolor fullscreen'];

export default toolbar;
