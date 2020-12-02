import e                             from 'express';
import formidable, { Fields, Files } from 'formidable';
import request, { Response }         from 'request';
import { FppConfig }                 from './fppConfig';


function fpp_faceMerge(req: e.Request, res: e.Response, next: e.NextFunction) {

	// TIP 此处，加上该接口的超时时间。（比如5分钟。）
	// 设置所有HTTP请求的超时时间
	req.setTimeout(5 * 60 * 1000, () => {
		console.log('请求超时');
	});
	// 设置所有HTTP请求的服务器响应超时时间
	res.setTimeout(5 * 60 * 1000, () => {
		console.log('返回超时');
	});


	// 首先，访问自身的接口。获取Token值。
	console.log('获取原始originalUrl？', req.originalUrl);            // TIP 这个，就是你所需要的。原始子URL。


	// TIP 解析【POST-FormData】
	// TIP 既可以获得【参数列表】，也可以获得【上传文件】。
	const formUtil = new formidable.IncomingForm();
	formUtil.parse(req, function(err: any, fields: Fields, files: Files) {

		// res.body(req.body)      // TIP 原样返回，试一下？
		// console.log("获取，请求中所携带的fields", fields)
		// console.log('获取，请求中所携带的files', files)
		// TIP 看了一下TypeScript的API，可以直接读取属性。
		// var api_key = fields['api_key']                  // FIXME 由服务器端，存储。
		// var api_secret = fields['api_secret']            // FIXME 由服务器端，存储。

		const template_base64    = fields['template_base64'];
		const template_rectangle = fields['template_rectangle'];
		const merge_base64       = fields['merge_base64'];
		// const merge_rectangle = fields['merge_rectangle'] || null   // default:null
		const merge_rate         = fields['merge_rate'] || 50;               // default:50

		// 参数拼接。
		const my_params_json = {
			api_key   : FppConfig.FacePP_api_key,                // 调用key
			api_secret: FppConfig.FacePP_api_secret,          // 调用secret

			template_base64: template_base64,           // 【模板图】：base64编码字符串 TIP 必选
			// template_rectangle: template_rectangle,     // 【模板图】：人脸框位置 TIP 必选    FIXME 经过真实测试，这个参数，也是非必选的！。
			merge_base64   : merge_base64,                 // 【融合图】：base64编码字符串 TIP 必选

			// merge_rectangle: merge_rectangle,           // 【融合图】：人脸框位置 FIXME 可选

			merge_rate: merge_rate,                     // 【融合比例】：0到100 数字越大，越像【融合图】；反之越像【模板图】 TODO 建议选
		};

		console.log('我将要发送的数据为：', my_params_json, '\n 通过FormData形式。');

		// 发送请求
		request(/*options*/
			{
				// 一般头部
				headers : {
					'Connection'  : 'close',                         // TIP 这里，估计网上资料的初衷，是为了避免大量【close_wait】的问题。
					'content-type': 'application/json',
				},
				// 申请地址
				url     : 'https://api-cn.faceplusplus.com/imagepp/v1/mergeface',
				method  : 'POST',
				// 希望服务器返回JSON返回
				json    : true,                                               // TIP 客户端告诉服务端，希望接收的【数据格式：JSON】。
				// body: my_params_json                                            // TIP 设置上传的body（如果为POST请求的话）。
				// 表单数据
				formData: my_params_json,   // FIXME 上传【FormData】，需要这样做。
			},
			// 返回结果
			function callback(error: any, response: Response, data: any) {
				// 如果http-code为200
				if (!error && response.statusCode == 200) {
					// { "time_used": 560, "result":"", "request_id": 123 }
					console.log('------接口数据------', data);
					res.json({          // TIP 返回给浏览器。
						...data,
						result: 'data:image/jpg;base64,' + data.result,     // FIXME 这里，必须为Face++，添加文件头。（文件头，此处先用PNG格式，尝试一下。带透明色。）（PNG图片带黑边，再用【JPG】试一下？）
					});
				} else {
					// 如果返回错误
					console.log('返回的整体为：', response, '\n',
						'显示错误码：', error, '\n',
						'显示状态码：', response.statusCode);
				}
			},
		);
	});
}

export {
	fpp_faceMerge,
};
