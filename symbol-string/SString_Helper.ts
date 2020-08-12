type PhoneMaskOption = 'start' | 'center' | 'end';

export class SString_Helper {

  /**
   * 创建一个【独一无二】的【随机字符串】
   */
  public static create_RandUnique_Str() {
    const timestamp = '' + new Date().valueOf();
    const randomNum = '' + parseInt(((1 + Math.random()) * 65536));
    return randomNum.concat(timestamp).toString(32);
  }


  /**
   * 格式化手机号
   * 如：
   * formatPhone("12345678910", "start") => ****5678910
   * formatPhone("12345678910", "center") => 123****8910
   * formatPhone("12345678910", "end") => 1234567****
   * @param _phone 手机号
   * @param format 格式，可选值有：start、center、end
   * @param _count 格式化多少个字符，默认4个
   * @returns {string}
   */
  public starMask_Phone(
    _phone: string,
    format: PhoneMaskOption = 'center',
    _count: number          = 4,
  ): string {
    const phone       = _phone + '';
    let count         = _count;
    const len         = phone.length;
    const arr         = phone.split('');
    let start         = 0;
    let end           = 0;
    const replacement = '***********************';
    if (format === 'start') {
      if (typeof count == 'undefined') {
        count = 4;
      }
      arr.splice(0, count, replacement.substr(0, count));
      return arr.join('');
    }
    if (format === 'center') {
      if (typeof count == 'undefined') {
        count = 4;
      }
      start = Math.floor((len - count) / 2);
      end   = count;
      arr.splice(start, end, replacement.substr(0, count));
      return arr.join('');
    }
    if (format === 'end') {
      if (typeof count == 'undefined') {
        count = 4;
      }
      arr.splice(len - count, len, replacement.substr(0, count));
      return arr.join('');
    }
    return phone;
  }


  /**
   * 格式化邮箱
   * 如：
   * formatEmail("123456789@qq.com") => 12*****89@qq.com
   * formatEmail("abc@qq.com") => a*c@qq.com
   * formatEmail("abc123@qq.com") => a*****@qq.com
   * formatEmail("abc12@qq.com") => a***2@qq.com
   * formatEmail("a@qq.com") => *@qq.com
   * @param email 邮箱
   * @param _maxCount 最大截取长度，默认5
   */
  public starMask_Email(email: string, _maxCount: string | number = 5): string {
    let maxCount   = _maxCount;
    const emailReg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!email || !emailReg.test(email)) {
      return email;
    }
    if (typeof maxCount == 'string' || maxCount <= 0) {
      maxCount = 5;
    }
    const emailLeft                        = email.split('@')[0];
    const emailRight                       = email.split('@')[1];
    let leftResult: string | Array<string> = '';
    const emailLeftLen                     = emailLeft.length;
    if (emailLeftLen == 1) {
      leftResult = '*';
    } else {
      /* 如果邮箱名长度小于等于最大截取长度，则只留第一个及最后一个字符。效果：abcd@123.com => a**d@123.com*/
      if (emailLeftLen <= maxCount) {
        let len = emailLeftLen;
        while (len > 0) {
          leftResult += '*';
          len--;
        }
        leftResult = leftResult.split('');

        leftResult[0]                = emailLeft.charAt(0);
        leftResult[emailLeftLen - 1] = emailLeft.charAt(emailLeftLen - 1);
      } else {
        /* 如果邮箱名长度大于最大截取长度，则将邮箱名中间的替换成"*" */
        let startIndex = Math.ceil((emailLeftLen - maxCount) / 2);
        let endIndex   = startIndex + maxCount;
        leftResult     = emailLeft.split('');

        if (endIndex > emailLeftLen) {
          endIndex = emailLeftLen - 1;
        }
        for (; startIndex < endIndex; startIndex++) {
          leftResult[startIndex] = '*';
        }
      }
      leftResult = leftResult.join('');
    }
    return leftResult + '@' + emailRight;
  }


}
