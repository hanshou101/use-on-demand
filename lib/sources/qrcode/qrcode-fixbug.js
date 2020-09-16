export function xX_fixQrcodeBug(fatherDom) {
    var canvas = fatherDom.querySelector('canvas');
    var img = fatherDom.querySelector('img');
    if (canvas && img) {
        // console.log('转化成果了', canvas, img);
        canvas.style.display = 'none';
        img.style.display = 'block';
        img.src = canvas.toDataURL('image/png');
    }
}
//# sourceMappingURL=qrcode-fixbug.js.map