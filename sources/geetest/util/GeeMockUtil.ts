/**
 * 模拟工具
 */
import { xX_GeeStableE }            from './GeeStableUtil';
import { xX_ExceptionError_Helper } from '../../exception-error/ExceptionError_Helper';

export class xX_GeeMockUtil {

	/**
	 * 模拟不同【环境Env】
	 */
	public static mockEnv(
		env: xX_GeeStableE,
		_data: GeePreInfo,
	) {
		let data = _data;
		console.error('当前mock环境');
		console.error('当前mock环境');
		console.error('当前mock环境', 1);

		const defaultSign      = 'a123456789999999999999999999999999999999999999999999999999999999999999999999999999999999999999';
		const defaultChallenge = '不知道存不存在这个challenge？？？';

		switch (env) {
			case xX_GeeStableE.NoGeetest_false_1 : {
				data = {
					...data,
					// TIP————————————————以下，要改的值
					success  : 1,
					enable   : false,
					// TIP————————————————以下，是一定有的值
					// TIP————————————————以下，是一定有的值
					ip       : data.ip,
					gt       : data.ip,
					// TIP————————————————以下，是要覆盖的未定义值
					// TIP————————————————以下，是要覆盖的未定义值
					// TIP————————————————以下，是要覆盖的未定义值
					sign     : undefined,    // WARN 后台关闭后，后台没有sign值
					challenge: undefined,
				};
				break;
			}
			case xX_GeeStableE.NoGeetest_false_0 : {
				data = {
					...data,
					// TIP————————————————以下，要改的值
					success  : 0,
					enable   : false,
					// TIP————————————————以下，是一定有的值
					// TIP————————————————以下，是一定有的值
					ip       : data.ip,
					gt       : data.ip,
					// TIP————————————————以下，是要覆盖的未定义值
					// TIP————————————————以下，是要覆盖的未定义值
					// TIP————————————————以下，是要覆盖的未定义值
					sign     : undefined,    // WARN 后台关闭后，后台没有sign值
					challenge: undefined,
				};
				break;
			}
			//
			//
			//
			//
			//
			//
			//
			case xX_GeeStableE.SuccessGeetest_true_1 : {
				data = {
					...data,
					// TIP————————————————以下，要改的值
					success  : 1,
					enable   : true,
					// TIP————————————————以下，是一定有的值
					// TIP————————————————以下，是一定有的值
					ip       : data.ip,
					gt       : data.ip,
					// TIP————————————————以下，true+1，成功情况下，一般都有的值
					// TIP————————————————以下，true+1，成功情况下，一般都有的值
					// TIP————————————————以下，true+1，成功情况下，一般都有的值
					sign     : data.sign || defaultSign,   // 如果没有sign值，才给默认值
					challenge: data.challenge || defaultChallenge,
				};

				/* TIP 这些字段，是不存在的。别粗心搞错了
				data.geetest_challenge = data.geetest_challenge || 'challenge————————————challenge————————————challenge————————————challenge————————————challenge';
				data.geetest_seccode   = data.geetest_seccode || 'seccode————————————seccode————————————seccode————————————seccode————————————seccode';
				data.geetest_validate  = data.geetest_validate || 'validate————————————validate————————————validate————————————validate————————————validate';
				*/
				break;
			}
			case xX_GeeStableE.ErrorGeetest__true_0 : {
				data = {
					...data,
					// TIP————————————————以下，要改的值
					success  : 0,
					enable   : true,
					// TIP————————————————以下，是一定有的值
					// TIP————————————————以下，是一定有的值
					ip       : data.ip,
					gt       : data.ip,
					// TIP————————————————以下，true+0，一般仅仅有sign值
					// TIP————————————————以下，true+0，一般仅仅有sign值
					// TIP————————————————以下，true+0，一般仅仅有sign值
					sign     : data.sign || defaultSign,   // 如果没有sign值，才给默认值
					challenge: undefined,
				};
				break;
			}
			default: {
				throw new Error(xX_ExceptionError_Helper.throwError_andLog('xX_GeeMockUtil.mockEnv，传参错误。'));
			}
		}
	}

}
