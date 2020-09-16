var _THREE = require('three'); // 85版本、95版本
var xX_textures = {
    window: function () {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        if (ctx) {
            canvas.width = 32;
            canvas.height = 32;
            var colors = {
                border: '#3c3443',
                top: '#9d94a7',
                bottom: '#796e8c',
            };
            ctx.fillStyle = colors.border;
            ctx.fillRect(0, 0, 32, 32);
            ctx.fillStyle = colors.top;
            ctx.fillRect(2, 2, 13, 13);
            ctx.fillStyle = colors.top;
            ctx.fillRect(17, 2, 13, 13);
            ctx.fillStyle = colors.bottom;
            ctx.fillRect(2, 17, 13, 13);
            ctx.fillStyle = colors.bottom;
            ctx.fillRect(17, 17, 13, 13);
            var canvasTexture = new _THREE.Texture(canvas);
            canvasTexture.wrapS = _THREE.RepeatWrapping;
            canvasTexture.wrapT = _THREE.RepeatWrapping;
            canvasTexture.needsUpdate = true;
            return canvasTexture;
        }
        else {
            return null;
        }
    },
};
export default xX_textures;
//# sourceMappingURL=textures.js.map