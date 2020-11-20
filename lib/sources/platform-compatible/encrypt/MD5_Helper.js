var xX_MD5_Helper = /** @class */ (function () {
    function xX_MD5_Helper() {
    }
    xX_MD5_Helper.hash = function (str) {
        return this.hex(this.md51(str));
    };
    xX_MD5_Helper.md5cycle = function (x, k) {
        var a = x[0], b = x[1], c = x[2], d = x[3];
        a = this.ff(a, b, c, d, k[0], 7, -680876936);
        d = this.ff(d, a, b, c, k[1], 12, -389564586);
        c = this.ff(c, d, a, b, k[2], 17, 606105819);
        b = this.ff(b, c, d, a, k[3], 22, -1044525330);
        a = this.ff(a, b, c, d, k[4], 7, -176418897);
        d = this.ff(d, a, b, c, k[5], 12, 1200080426);
        c = this.ff(c, d, a, b, k[6], 17, -1473231341);
        b = this.ff(b, c, d, a, k[7], 22, -45705983);
        a = this.ff(a, b, c, d, k[8], 7, 1770035416);
        d = this.ff(d, a, b, c, k[9], 12, -1958414417);
        c = this.ff(c, d, a, b, k[10], 17, -42063);
        b = this.ff(b, c, d, a, k[11], 22, -1990404162);
        a = this.ff(a, b, c, d, k[12], 7, 1804603682);
        d = this.ff(d, a, b, c, k[13], 12, -40341101);
        c = this.ff(c, d, a, b, k[14], 17, -1502002290);
        b = this.ff(b, c, d, a, k[15], 22, 1236535329);
        a = this.gg(a, b, c, d, k[1], 5, -165796510);
        d = this.gg(d, a, b, c, k[6], 9, -1069501632);
        c = this.gg(c, d, a, b, k[11], 14, 643717713);
        b = this.gg(b, c, d, a, k[0], 20, -373897302);
        a = this.gg(a, b, c, d, k[5], 5, -701558691);
        d = this.gg(d, a, b, c, k[10], 9, 38016083);
        c = this.gg(c, d, a, b, k[15], 14, -660478335);
        b = this.gg(b, c, d, a, k[4], 20, -405537848);
        a = this.gg(a, b, c, d, k[9], 5, 568446438);
        d = this.gg(d, a, b, c, k[14], 9, -1019803690);
        c = this.gg(c, d, a, b, k[3], 14, -187363961);
        b = this.gg(b, c, d, a, k[8], 20, 1163531501);
        a = this.gg(a, b, c, d, k[13], 5, -1444681467);
        d = this.gg(d, a, b, c, k[2], 9, -51403784);
        c = this.gg(c, d, a, b, k[7], 14, 1735328473);
        b = this.gg(b, c, d, a, k[12], 20, -1926607734);
        a = this.hh(a, b, c, d, k[5], 4, -378558);
        d = this.hh(d, a, b, c, k[8], 11, -2022574463);
        c = this.hh(c, d, a, b, k[11], 16, 1839030562);
        b = this.hh(b, c, d, a, k[14], 23, -35309556);
        a = this.hh(a, b, c, d, k[1], 4, -1530992060);
        d = this.hh(d, a, b, c, k[4], 11, 1272893353);
        c = this.hh(c, d, a, b, k[7], 16, -155497632);
        b = this.hh(b, c, d, a, k[10], 23, -1094730640);
        a = this.hh(a, b, c, d, k[13], 4, 681279174);
        d = this.hh(d, a, b, c, k[0], 11, -358537222);
        c = this.hh(c, d, a, b, k[3], 16, -722521979);
        b = this.hh(b, c, d, a, k[6], 23, 76029189);
        a = this.hh(a, b, c, d, k[9], 4, -640364487);
        d = this.hh(d, a, b, c, k[12], 11, -421815835);
        c = this.hh(c, d, a, b, k[15], 16, 530742520);
        b = this.hh(b, c, d, a, k[2], 23, -995338651);
        a = this.ii(a, b, c, d, k[0], 6, -198630844);
        d = this.ii(d, a, b, c, k[7], 10, 1126891415);
        c = this.ii(c, d, a, b, k[14], 15, -1416354905);
        b = this.ii(b, c, d, a, k[5], 21, -57434055);
        a = this.ii(a, b, c, d, k[12], 6, 1700485571);
        d = this.ii(d, a, b, c, k[3], 10, -1894986606);
        c = this.ii(c, d, a, b, k[10], 15, -1051523);
        b = this.ii(b, c, d, a, k[1], 21, -2054922799);
        a = this.ii(a, b, c, d, k[8], 6, 1873313359);
        d = this.ii(d, a, b, c, k[15], 10, -30611744);
        c = this.ii(c, d, a, b, k[6], 15, -1560198380);
        b = this.ii(b, c, d, a, k[13], 21, 1309151649);
        a = this.ii(a, b, c, d, k[4], 6, -145523070);
        d = this.ii(d, a, b, c, k[11], 10, -1120210379);
        c = this.ii(c, d, a, b, k[2], 15, 718787259);
        b = this.ii(b, c, d, a, k[9], 21, -343485551);
        x[0] = a + x[0] & 0xFFFFFFFF;
        x[1] = b + x[1] & 0xFFFFFFFF;
        x[2] = c + x[2] & 0xFFFFFFFF;
        x[3] = d + x[3] & 0xFFFFFFFF;
    };
    xX_MD5_Helper.cmn = function (q, a, b, x, s, t) {
        a = (a + q & 0xFFFFFFFF) + (x + t & 0xFFFFFFFF) & 0xFFFFFFFF;
        return ((a << s) | (a >>> 32 - s)) + b & 0xFFFFFFFF;
    };
    xX_MD5_Helper.ff = function (a, b, c, d, x, s, t) {
        return this.cmn((b & c) | (~b & d), a, b, x, s, t);
    };
    xX_MD5_Helper.gg = function (a, b, c, d, x, s, t) {
        return this.cmn((b & d) | (c & ~d), a, b, x, s, t);
    };
    xX_MD5_Helper.hh = function (a, b, c, d, x, s, t) {
        return this.cmn(b ^ c ^ d, a, b, x, s, t);
    };
    xX_MD5_Helper.ii = function (a, b, c, d, x, s, t) {
        return this.cmn(c ^ (b | ~d), a, b, x, s, t);
    };
    xX_MD5_Helper.md51 = function (s) {
        var n = s.length;
        var state = [1732584193, -271733879, -1732584194, 271733878];
        var tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        var o = 0, i = 64;
        for (i; i <= n; i += 64) {
            this.md5cycle(state, this.md5blk(s.substring(i - 64, i)));
        }
        s = s.substring(i - 64);
        i = 0;
        o = s.length;
        for (i; i < o; i++) {
            tail[i >> 2] |= s.charCodeAt(i) << (i % 4 << 3);
        }
        tail[i >> 2] |= 0x80 << (i % 4 << 3);
        if (i > 55) {
            this.md5cycle(state, tail);
            for (i = 0; i < 16; i++) {
                tail[i] = 0;
            }
        }
        tail[14] = n * 8;
        this.md5cycle(state, tail);
        return state;
    };
    xX_MD5_Helper.md5blk = function (s) {
        var md5blks = [];
        var i = 0;
        for (i; i < 64; i += 4) {
            md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24);
        }
        return md5blks;
    };
    xX_MD5_Helper.rhex = function (n) {
        var hexArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
        var s = '';
        s += hexArray[(n >> 4) & 0x0F] + hexArray[(n >> 0) & 0x0F];
        s += hexArray[(n >> 12) & 0x0F] + hexArray[(n >> 8) & 0x0F];
        s += hexArray[(n >> 20) & 0x0F] + hexArray[(n >> 16) & 0x0F];
        s += hexArray[(n >> 28) & 0x0F] + hexArray[(n >> 24) & 0x0F];
        return s;
    };
    xX_MD5_Helper.hex = function (x) {
        var length = x.length;
        var i = 0;
        for (i; i < length; i++) {
            x[i] = this.rhex(x[i]);
        }
        return x.join('');
    };
    return xX_MD5_Helper;
}());
export { xX_MD5_Helper };
//# sourceMappingURL=MD5_Helper.js.map