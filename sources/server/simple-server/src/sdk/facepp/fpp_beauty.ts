import e                             from 'express';
import formidable, { Fields, Files } from 'formidable';
import request, { Response }         from 'request';
import { FppConfig }                 from './fppConfig';

function fpp_beauty(req: e.Request, res: e.Response, next: e.NextFunction) {

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

		// console.log("获取，请求中所携带的fields", fields)
		// console.log('获取，请求中所携带的files', files)

		// TIP 看了一下TypeScript的API，可以直接读取属性。
		// var api_key = fields['api_key']                  // FIXME 由服务器端，存储。
		// var api_secret = fields['api_secret']            // FIXME 由服务器端，存储。
		const image_base64 = fields['image_base64'];

		const my_params_json = {
			api_key     : FppConfig.FacePP_api_key,
			api_secret  : FppConfig.FacePP_api_secret,
			image_base64: image_base64,
		};

		console.log('我将要发送的数据为：', my_params_json, '\n 通过FormData形式。');

		request(/*options*/
			{
				headers : {
					'Connection'  : 'close',                         // TIP 这里，估计网上资料的初衷，是为了避免大量【close_wait】的问题。
					'content-type': 'application/json',
				},
				url     : 'https://api-cn.faceplusplus.com/facepp/beta/beautify',
				method  : 'POST',
				json    : true,                                               // TIP 客户端告诉服务端，希望接收的【数据格式：JSON】。
				// body: my_params_json                                            // TIP 设置上传的body（如果为POST请求的话）。
				formData: my_params_json,   // FIXME 上传【FormData】，需要这样做。
			},
			function callback(error: any, response: Response, data: any) {
				if (!error && response.statusCode == 200) {
					console.log('------接口数据------', data);
					// TIP 此时，已经获取到wx_token的JSON对象。

					res.json({
						...data,
						result: 'data:image/jpg;base64,' + data.result,     // FIXME 这里，必须为Face++，添加文件头。（文件头，此处先用PNG格式，尝试一下。带透明色。）（PNG图片带黑边，再用【JPG】试一下？）
					});       // TIP 返回给浏览器。
					/**
					 * { "time_used": 560, "result":"", "request_id": 123 }
					 */

				} else {
					console.log(
						'返回的整体为：', response,
						'\n',
						'显示错误码：', error,
						'  显示状态码：', response.statusCode,
					);
				}
			},
		);

	});


	// res.body(req.body)      // TIP 原样返回，试一下？

}

export {
	fpp_beauty,
};
