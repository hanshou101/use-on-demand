var THREE = require('three'); // 85版本、95版本
var xX_MyThree_Util = /** @class */ (function () {
    function xX_MyThree_Util() {
    }
    /**
     * TIP 创建自定义形状。（模子轮廓坐标分布 + 内孔坐标分布）
     * 参考资料：  43 Three.js自定义二维图形THREE.ShapeGeometry - 现在学习也不晚 - CSDN博客 - https://blog.csdn.net/qq_30100043/article/details/78808725#commentBox
     */
    xX_MyThree_Util.makeShape = function (shapeCoords) {
        // if (/*window.THREE &&*/ arguments.length) {
        //   let array = arguments[0];
        var manyHolesCoords_Arr = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            manyHolesCoords_Arr[_i - 1] = arguments[_i];
        }
        // TIP 根据多个coords点，生成模子。
        var array = shapeCoords;
        var shape = new THREE.Shape();
        shape.moveTo(array[0][0], array[0][1]);
        for (var i = 1; i < array.length; i++) {
            shape.lineTo(array[i][0], array[i][1]);
        }
        // if (arguments.length > 1) {
        //   for (let i = 1; i < arguments.length; i++) {
        manyHolesCoords_Arr.forEach(function (oneHole_coords) {
            // let pathCoords = arguments[i];
            // TIP 为小孔创建新路径。
            var path = new THREE.Path();
            path.moveTo(oneHole_coords[0][0], oneHole_coords[0][1]);
            // 根据多个coords点，生成小孔
            for (var i = 1; i < oneHole_coords.length; i++) {
                path.lineTo(oneHole_coords[i][0], oneHole_coords[i][1]);
            }
            // 添加一个小孔。
            shape.holes.push(path);
        });
        // }
        // }
        return shape;
        // } else {
        //   throw new Error(xX_ExceptionError_Helper.throwError_andLog('Something wrong!'));
        // }
    };
    /**
     *  模子 + 数量 ————> 拉伸几何形
     *  TIP 网上资料不是很多：大致上，是将一个二维图形拉伸成三维图形。
     *
     *  参考资料： three.js中几何对象 - CircleGeometry 、 CubeGeometry、CylinderGeometry 和 ExtrudeGeometry- 【SegmentFault 思否】 - https://segmentfault.com/a/1190000012682069
     *            在线做实验 - https://threejs.org/docs/#api/en/geometries/ExtrudeBufferGeometry
     *
     *  经过多次实验，得出以下理解：
     *            1.以一个树木的2D轮廓为基础。
     *            2.反复调试【ExtrudeBufferGeometry】的各种参数：参数的调节，就像增加缓坡和缓冲。让物体变厚，让物体边缘变的自然而柔和。
     *            3.直到，勉强像一颗少儿动画里的树一样。（就是个调参的过程。）
     */
    xX_MyThree_Util.makeExtrudeGeometry = function (shape, amount) {
        var extrudeSetting = {
            steps: 1,
            amount: amount,
            bevelEnabled: false,
        };
        var geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSetting);
        geometry.rotateX(-0.5 * Math.PI);
        return geometry;
    };
    /**
     * 形状+材质 = Mesh（贴面模型）。
     * lambert：适合普通物体。
     * phong：适合金属、镜面。
     */
    xX_MyThree_Util.makeMesh = function (materialType, geometry, color) {
        var material;
        if (materialType === 'lambert') {
            material = new THREE.MeshLambertMaterial({ color: color });
        }
        else if (materialType === 'phong') {
            material = new THREE.MeshPhongMaterial({ color: color });
        }
        else {
            console.error('unrecognized type!');
        }
        var mesh = new THREE.Mesh(geometry, material);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        return mesh;
    };
    /**
     * 路径点 ————> 多边形模子 ————> 形状。
     */
    xX_MyThree_Util.makeShapeGeometry = function (shapeCoords) {
        var shape = this.makeShape(shapeCoords);
        var geometry = new THREE.ShapeGeometry(shape);
        return geometry;
    };
    /**
     * 异步加载【Texture纹理文件】
     */
    xX_MyThree_Util.asyncLoad_textureLoader = function (path) {
        return new Promise(function (resolve) {
            new THREE.TextureLoader().load(path, function (texture) {
                resolve(texture);
            });
        });
    };
    return xX_MyThree_Util;
}());
export { xX_MyThree_Util };
//# sourceMappingURL=utils.js.map