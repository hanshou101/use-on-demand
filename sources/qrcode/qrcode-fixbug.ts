export function xX_fixQrcodeBug(fatherDom: HTMLElement) {
  const canvas = fatherDom.querySelector('canvas');
  const img = fatherDom.querySelector('img');
  if (canvas && img) {
    // console.log('转化成果了', canvas, img);
    canvas.style.display = 'none';
    img.style.display = 'block';
    img.src = canvas.toDataURL('image/png');
  }
}
