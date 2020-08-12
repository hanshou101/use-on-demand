export class Fix_WxRedirec_Util {
  public static check_isRedirctByWx() {
    const hash    = location.hash;
    const wxQuery = location.search;

    console.log('进行判断', hash, wxQuery);

    if (
      wxQuery.includes('from=singlemessage')
      || wxQuery.includes('isappinstalled')
    ) {
      alert('欢迎从微信分享进入产品页，请确认进入重定向');
      const newUrl = `${location.protocol}//${location.host}/${hash}`;
      console.log(newUrl);
      location.href = newUrl;
    }
  }
}
