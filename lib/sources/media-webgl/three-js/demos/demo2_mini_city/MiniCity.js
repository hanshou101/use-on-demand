import { __values } from "tslib";
import { xX_MyThree_Util } from './js/utils';
var THREE = require('three'); // 85版本、95版本
import xX_textures from './js/textures';
import xX_Car from './js/Car';
import xX_treesPosition from './config/treesPosition';
import { xX_MyOrbitControls } from './js/MyOrbitControls';
var xX_MiniCity_three95 = /** @class */ (function () {
    function xX_MiniCity_three95() {
        this.config = { isMobile: false, background: 0x282828 };
        // 汽车
        this.cars = [];
    }
    /**
     * TODO 以下为启动阶段：
     *            1.【开始】
     *            2.【检验手机平台：适配】
     */
    xX_MiniCity_three95.prototype.startCity = function () {
        //
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 5000);
        this.camera.position.set(330, 330, 330);
        this.camera.lookAt(this.scene.position);
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            canvas: document.querySelector('canvas'),
        });
        this.renderer.setSize(this.width, this.height);
        this.renderer.setClearColor(this.config.background);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        // document.body.appendChild(this.renderer.domElement)
        this.checkUserAgent();
        this.buildAuxSystem();
        this.buildLightSystem();
        this.buildBuilding();
        this.buildRoad();
        this.buildStaticCars();
        this.buildMovingCars();
        this.loop();
        this.onWindowResize();
    };
    // TIP 检测手机平台
    xX_MiniCity_three95.prototype.checkUserAgent = function () {
        var n = navigator.userAgent;
        if (n.match(/Android/i) || n.match(/webOS/i) || n.match(/iPhone/i) || n.match(/iPad/i) || n.match(/iPod/i) || n.match(/BlackBerry/i)) {
            this.config.isMobile = true;
            this.camera.position.set(420, 420, 420);
            this.renderer.shadowMap.enabled = false;
        }
    };
    /**
     * 以上为启动阶段。
     */
    /**
     * TODO 以下为初始化场景阶段：
     *            1.【构建辅助网格系统（模拟地砖效果）】
     *            2.【】
     */
    // 构建辅助网格系统（模拟地砖效果）
    xX_MiniCity_three95.prototype.buildAuxSystem = function () {
        // 绘制网格线
        var gridHelper = new THREE.GridHelper(320, 32);
        this.scene.add(gridHelper);
        // 允许【视角旋转】、【视角放大缩小】。（包括阻尼系数）
        var controls = new xX_MyOrbitControls(this.camera, this.renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.rotateSpeed = 0.35;
    };
    xX_MiniCity_three95.prototype.buildLightSystem = function () {
        if (!this.config.isMobile) {
            // TODO 电脑之上
            // 方向光：设置光照
            var directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1.1);
            directionalLight.position.set(300, 1000, 500);
            directionalLight.target.position.set(0, 0, 0);
            directionalLight.castShadow = true;
            // 方向光：设置光照阴影
            var d = 300;
            directionalLight.shadow.camera = new THREE.OrthographicCamera(-d, d, d, -d, 500, 1600);
            directionalLight.shadow.bias = 0.0001;
            directionalLight.shadow.mapSize.width = directionalLight.shadow.mapSize.height = 1024;
            this.scene.add(directionalLight);
            // 环境光
            var light = new THREE.AmbientLight(0xFFFFFF, 0.3);
            this.scene.add(light);
        }
        else {
            // TODO 手机之上
            // 半球光（也就是天光效果，更加自然）
            var hemisphereLight = new THREE.HemisphereLight(0xFFFFFF, 1);
            this.scene.add(hemisphereLight);
            // 环境光
            var light = new THREE.AmbientLight(0xFFFFFF, 0.15);
            this.scene.add(light);
        }
    };
    // 构造建筑物
    xX_MiniCity_three95.prototype.buildBuilding = function () {
        this.Building_add_Plane();
        this.Building_add_Fense();
        this.Building_add_Green();
        this.Building_add_Trees();
        this.Building_add_Hospital();
        this.Building_add_Lamps();
    };
    // TIP 大平板（作为地基板块）
    xX_MiniCity_three95.prototype.Building_add_Plane = function () {
        // 绘制大平板（作为地基板块）
        var planeGeometry = new THREE.BoxBufferGeometry(320, 6, 320);
        var plane = xX_MyThree_Util.makeMesh('lambert', planeGeometry, 0x6F5F6A);
        plane.position.y = -3;
        this.scene.add(plane);
    };
    // TIP 外层的白色大理石围墙。
    xX_MiniCity_three95.prototype.Building_add_Fense = function () {
        var fenseCoords = [
            [-130, -130],
            [-130, 130],
            [130, 130],
            [130, -130],
            [20, -130],
            [20, -120],
            [120, -120],
            [120, 120],
            [-120, 120],
            [-120, -120],
            [-20, -120],
            [-20, -130],
            [-130, -130],
        ];
        var fenseShape = xX_MyThree_Util.makeShape(fenseCoords);
        var fenseGeometry = xX_MyThree_Util.makeExtrudeGeometry(fenseShape, 3);
        var fense = xX_MyThree_Util.makeMesh('lambert', fenseGeometry, 0xE5CABF);
        this.scene.add(fense);
    };
    // TIP 一圈绿色的矮小灌木丛
    xX_MiniCity_three95.prototype.Building_add_Green = function () {
        var greenCoords = [
            [-120, -120],
            [-120, 120],
            [120, 120],
            [120, -120],
            [20, -120],
            [20, -100],
            [100, -100],
            [100, 100],
            [-100, 100],
            [-100, -100],
            [-20, -100],
            [-20, -120],
            [-120, -120],
        ];
        var greenShape = xX_MyThree_Util.makeShape(greenCoords);
        var greenGeometry = xX_MyThree_Util.makeExtrudeGeometry(greenShape, 3);
        var green = xX_MyThree_Util.makeMesh('lambert', greenGeometry, 0xC0C06A);
        this.scene.add(green);
    };
    // TIP 添加长在【矮小灌木丛】之上的大树
    xX_MiniCity_three95.prototype.Building_add_Trees = function () {
        var _this = this;
        xX_treesPosition.forEach(function (elem) {
            var x = elem[0];
            var y = 1;
            var z = elem[1];
            var tree = BuildingHelper.createItem_Tree(x, y, z);
            _this.scene.add(tree);
        });
    };
    // TIP 主体大医院建筑。
    xX_MiniCity_three95.prototype.Building_add_Hospital = function () {
        // 生成。放置。
        var hospital = BuildingHelper.create_Hospital();
        hospital.position.z = -20;
        this.scene.add(hospital);
    };
    xX_MiniCity_three95.prototype.Building_add_Lamps = function () {
        var _this = this;
        // 路灯位置。（x坐标、y坐标、旋转弧度）
        var lampsPosition = [
            [-12.5, 12.5, 1.25],
            [-7.5, 12.5, -0.5],
            [-2.5, 12.5, -0.5],
            [2.5, 12.5, -0.5],
            [7.5, 12.5, -0.5],
            [12.5, 12.5, -0.25],
            [12.5, 7.5, 0],
            [12.5, 2.5, 0],
            [12.5, -2.5, 0],
            [12.5, -7.5, 0],
            [12.5, -12.5, 0.25],
            [7.5, -12.5, 0.5],
            [2.5, -12.5, 0.5],
            [-2.5, -12.5, 0.5],
            [-7.5, -12.5, 0.5],
            [-12.5, -12.5, 0.75],
            [-12.5, -7.5, 1],
            [-12.5, -2.5, 1],
            [-12.5, 2.5, 1],
            [-12.5, 7.5, 1],
        ];
        // 生成。放置。
        lampsPosition.forEach(function (elem) {
            var x = elem[0] * 10;
            var z = elem[1] * 10;
            var r = elem[2];
            var lamp = BuildingHelper.createItem_Lamp();
            lamp.rotation.y = r * Math.PI;
            lamp.position.set(x, 0, z);
            _this.scene.add(lamp);
        });
    };
    // TIP 建造道路
    xX_MiniCity_three95.prototype.buildRoad = function () {
        var road = new THREE.Object3D();
        var roadColor = 0xFFFFFF;
        // TIP 外部，start
        // 最外面的一层白线边缘。
        var roadBorderOuterCoords = [
            [-160, 160],
            [160, 160],
            [160, -160],
            [-160, -160],
        ];
        var roadBorderOuterHoleCoords = [
            [-159, 159],
            [-159, -159],
            [159, -159],
            [159, 159],
        ];
        var roadBorderOuterShape = xX_MyThree_Util.makeShape(roadBorderOuterCoords, roadBorderOuterHoleCoords);
        var roadBorderOuterGeometry = xX_MyThree_Util.makeExtrudeGeometry(roadBorderOuterShape, 0.1);
        var roadBorderOuter = xX_MyThree_Util.makeMesh('phong', roadBorderOuterGeometry, roadColor);
        road.add(roadBorderOuter);
        // TIP end，外部
        // TIP 内部，start
        // 最内部的道路白块，采用多边形算法，绘制而成。（分隔线，是【辅助网格线】环节绘制的。）
        var roadBorderInnerCoords = [
            [-131, 131],
            [-131, -131],
            [131, -131],
            [131, 131],
            [19, 131],
            [19, 99],
            [99, 99],
            [99, -99],
            [-99, -99],
            [-99, 99],
            [-19, 99],
            [-19, 131],
        ];
        var roadBorderInnerShape = xX_MyThree_Util.makeShape(roadBorderInnerCoords);
        var roadBorderInnerGeometry = xX_MyThree_Util.makeExtrudeGeometry(roadBorderInnerShape, 0.1);
        var roadBorderInner = xX_MyThree_Util.makeMesh('phong', roadBorderInnerGeometry, roadColor);
        roadBorderInner.rotation.y = Math.PI;
        road.add(roadBorderInner);
        // TIP end，内部
        // TIP 线条，start
        // 道路中间的白色虚线。
        var roadLinesGeometry = new THREE.Geometry();
        var roadLineGeometry = new THREE.BoxGeometry(20, 0.1, 2);
        // 底部
        var roadLinesBottomGeometry = new THREE.Geometry();
        for (var i = 0; i < 9; i++) {
            var geometry = roadLineGeometry.clone();
            geometry.translate(i * 30, 0, -1);
            roadLinesBottomGeometry.merge(geometry);
        }
        roadLinesBottomGeometry.translate(-120, 0, 145);
        roadLinesGeometry.merge(roadLinesBottomGeometry);
        // 顶部
        var roadLinesTopGeometry = roadLinesBottomGeometry.clone();
        roadLinesTopGeometry.translate(0, 0, -290);
        roadLinesGeometry.merge(roadLinesTopGeometry);
        // 左侧
        var roadLinesLeftGeometry = roadLinesBottomGeometry.clone();
        roadLinesLeftGeometry.rotateY(0.5 * Math.PI);
        roadLinesGeometry.merge(roadLinesLeftGeometry);
        // 右侧
        var roadLinesRightGeometry = roadLinesBottomGeometry.clone();
        roadLinesRightGeometry.rotateY(-0.5 * Math.PI);
        roadLinesGeometry.merge(roadLinesRightGeometry);
        roadLinesGeometry = new THREE.BufferGeometry().fromGeometry(roadLinesGeometry);
        var roadLines = xX_MyThree_Util.makeMesh('phong', roadLinesGeometry, roadColor);
        road.add(roadLines);
        // TIP end，线条
        this.scene.add(road);
    };
    // 建造静止汽车
    xX_MiniCity_three95.prototype.buildStaticCars = function () {
        var _this = this;
        // 汽车位置。（x坐标、y坐标、旋转弧度）
        var carsPosition = [
            [-84, 82, 1.5],
            [-58, 82, 1.5],
            [-32, 82, 1.5],
            [84, 82, 1.5],
        ];
        // 生成。放置。
        carsPosition.forEach(function (elem) {
            var car = new xX_Car();
            var x = elem[0];
            var z = elem[1];
            var r = elem[2];
            car.setPosition(x, 0, z);
            car.mesh.rotation.y = r * Math.PI;
            _this.scene.add(car.mesh);
        });
    };
    // 建造移动汽车
    xX_MiniCity_three95.prototype.buildMovingCars = function () {
        var _this = this;
        // 汽车位置。（x坐标、y坐标、旋转弧度）
        var carsPosition = [
            [-130, 145, 0],
            [10, 145, 0],
            [145, 20, 0.5],
            [30, -145, 1],
            [-145, -60, 1.5],
        ];
        // 生成。放置。
        carsPosition.forEach(function (elem) {
            var car = new xX_Car();
            var x = elem[0];
            var z = elem[1];
            var r = elem[2];
            car.setPosition(x, 0, z);
            car.mesh.rotation.y = r * Math.PI;
            _this.cars.push(car);
            _this.scene.add(car.mesh);
        });
    };
    // TIP 循环执行代码
    xX_MiniCity_three95.prototype.loop = function () {
        // stats.update()
        this.cars.forEach(function (car) {
            MyCarHelper.carMoving(car);
        });
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.loop.bind(this));
    };
    // TIP 监听浏览器窗口大小变化
    xX_MiniCity_three95.prototype.onWindowResize = function () {
        var _this = this;
        window.addEventListener('resize', function () {
            _this.width = window.innerWidth;
            _this.height = window.innerHeight;
            _this.camera.aspect = _this.width / _this.height;
            _this.camera.updateProjectionMatrix();
            _this.renderer.setSize(_this.width, _this.height);
        });
    };
    return xX_MiniCity_three95;
}());
export { xX_MiniCity_three95 };
var MyCarHelper = /** @class */ (function () {
    function MyCarHelper() {
    }
    // TIP 令车辆开始移动
    MyCarHelper.carMoving = function (car) {
        var angle = car.mesh.rotation.y;
        var x = car.mesh.position.x;
        var z = car.mesh.position.z;
        if (x < 145 && z === 145) {
            car.forward();
        }
        else if (angle < 0.5 * Math.PI) {
            car.turnLeft(0.5 * Math.PI, 0.1);
        }
        else if (x === 145 && z > -145) {
            car.forward();
        }
        else if (angle < Math.PI) {
            car.turnLeft(0.5 * Math.PI, 0.1);
        }
        else if (x > -145 && z == -145) {
            car.forward();
        }
        else if (angle < 1.5 * Math.PI) {
            car.turnLeft(0.5 * Math.PI, 0.1);
        }
        else if (x === -145 && z < 145) {
            car.mesh.rotation.y = 1.5 * Math.PI;
            car.forward();
        }
        else if (angle < 2 * Math.PI) {
            car.turnLeft(0.5 * Math.PI, 0.1);
        }
        else {
            car.setPosition(-145, 0, 145);
            car.mesh.rotation.set(0, 0, 0);
        }
    };
    return MyCarHelper;
}());
var BuildingHelper = /** @class */ (function () {
    function BuildingHelper() {
    }
    // TIP 创建单个路灯
    BuildingHelper.createItem_Lamp = function () {
        var lamp = new THREE.Object3D();
        // 路灯杆子
        var pillarGeomertry = new THREE.CubeGeometry(2, 30, 2);
        pillarGeomertry.translate(0, 15, 0);
        var pillar = xX_MyThree_Util.makeMesh('phong', pillarGeomertry, 0xEBD1C2);
        lamp.add(pillar);
        // 连接处（路灯头和路灯杆子的连接）
        var connectGeometry = new THREE.CubeGeometry(10, 1, 1);
        var connect = xX_MyThree_Util.makeMesh('phong', connectGeometry, 0x2C0E0E);
        connect.position.set(3, 30, 0);
        lamp.add(connect);
        // 路灯头
        var lightGeometry = new THREE.CubeGeometry(6, 2, 4);
        var light = xX_MyThree_Util.makeMesh('phong', lightGeometry, 0xEBD1C2);
        light.position.set(10, 30, 0);
        lamp.add(light);
        return lamp;
    };
    // TIP 创建单个大树
    BuildingHelper.createItem_Tree = function (_x, _y, _z) {
        var x = _x || 0;
        var y = _y || 0;
        var z = _z || 0;
        var tree = new THREE.Object3D();
        var treeTrunkGeometry = new THREE.BoxBufferGeometry(2, 16, 2);
        var treeTrunk = xX_MyThree_Util.makeMesh('lambert', treeTrunkGeometry, 0x8A613A);
        treeTrunk.position.y = 8;
        tree.add(treeTrunk);
        var treeLeafsGeometry = new THREE.BoxBufferGeometry(8, 8, 8);
        var treeLeafs = xX_MyThree_Util.makeMesh('lambert', treeLeafsGeometry, 0x9C9E5D);
        treeLeafs.position.y = 13;
        tree.add(treeLeafs);
        tree.position.set(x, y, z);
        return tree;
    };
    // TIP 创建单个医院
    BuildingHelper.create_Hospital = function () {
        var hospital = new THREE.Object3D();
        hospital.add(HospitalHelper.create_Hospital_WhiteBase());
        hospital.add(HospitalHelper.create_Hospital_FrontMain());
        hospital.add(HospitalHelper.create_Hospital_FrontRooftop());
        hospital.add(HospitalHelper.create_Hospital_FrontRooftop_Shelf());
        hospital.add(HospitalHelper.create_Hospital_FrontSecondFloor_GardenPlane());
        hospital.add(HospitalHelper.create_Hospital_FrontSecondFloor_Langan_BlueWall());
        hospital.add(HospitalHelper.create_Hospital_FrontSecondFloor_Langan_WhiteFushou());
        HospitalHelper.create_Hospital_Pillar_UnderFrontSecondFloor().forEach(function (object3D) {
            hospital.add(object3D);
        });
        hospital.add(HospitalHelper.create_Hospital_FrontMain_VerticalEdge_White());
        hospital.add(HospitalHelper.create_Hospital_FrontRooftop_EdgeWall());
        hospital.add(HospitalHelper.create_Hospital_BackMain_YellowWrapShell());
        hospital.add(HospitalHelper.create_Hospital_BackMain());
        hospital.add(HospitalHelper.create_Hospital_BackMain_MirrorWall());
        HospitalHelper.create_Hospital_BackMain_Windows().forEach(function (object3D) {
            hospital.add(object3D);
        });
        return hospital;
    };
    return BuildingHelper;
}());
var HospitalHelper = /** @class */ (function () {
    function HospitalHelper() {
    }
    HospitalHelper.create_Hospital_WhiteBase = function () {
        // 白色地基底座。
        var baseGeometry = new THREE.BoxBufferGeometry(180, 3, 140);
        var base = xX_MyThree_Util.makeMesh('lambert', baseGeometry, 0xFFFFFF);
        base.position.y = 1;
        return base;
    };
    HospitalHelper.create_Hospital_FrontMain = function () {
        var frontMainShape = xX_MyThree_Util.makeShape(this.frontMainCoords);
        // 前栋大楼。
        var frontMainGeometry = xX_MyThree_Util.makeExtrudeGeometry(frontMainShape, 100);
        var frontMainMaterial = new THREE.MeshPhongMaterial({ map: xX_textures.window() });
        frontMainMaterial.map.repeat.set(0.1, 0.08);
        var frontMain = new THREE.Mesh(frontMainGeometry, frontMainMaterial);
        frontMain.castShadow = true;
        frontMain.receiveShadow = true;
        return frontMain;
    };
    HospitalHelper.create_Hospital_FrontRooftop = function () {
        var frontTopShape = xX_MyThree_Util.makeShape(this.frontMainCoords);
        // 前栋大楼的天台石质板块。
        var frontTopGeometry = xX_MyThree_Util.makeExtrudeGeometry(frontTopShape, 5);
        var frontTop = xX_MyThree_Util.makeMesh('lambert', frontTopGeometry, 0xB1A7AF);
        frontTop.position.y = 100;
        return frontTop;
    };
    HospitalHelper.create_Hospital_FrontRooftop_Shelf = function () {
        var e_1, _a;
        // 前栋大楼的天台【顶上葡萄架】。
        var frontRoofShelfGeometry = new THREE.Geometry();
        var frontRoofShelfCubeGeometry = new THREE.BoxGeometry(2, 2, 40);
        // for z-axis
        for (var i = 0; i < 12; i++) {
            var geometry = frontRoofShelfCubeGeometry.clone();
            geometry.translate(i * 5, 0, 0);
            frontRoofShelfGeometry.merge(geometry);
        }
        // for x-axis
        for (var i = 0; i < 2; i++) {
            var geometry = frontRoofShelfCubeGeometry.clone();
            geometry.rotateY(0.5 * Math.PI);
            geometry.scale(1.6, 1, 1);
            geometry.translate(27, 0, -15 + i * 30);
            frontRoofShelfGeometry.merge(geometry);
        }
        // for y-axis
        var frontRoofShelfCubeYPosition = [
            [0, 0],
            [1, 0],
            [0, 1],
            [1, 1],
        ];
        try {
            for (var frontRoofShelfCubeYPosition_1 = __values(frontRoofShelfCubeYPosition), frontRoofShelfCubeYPosition_1_1 = frontRoofShelfCubeYPosition_1.next(); !frontRoofShelfCubeYPosition_1_1.done; frontRoofShelfCubeYPosition_1_1 = frontRoofShelfCubeYPosition_1.next()) {
                var p = frontRoofShelfCubeYPosition_1_1.value;
                var geometry = frontRoofShelfCubeGeometry.clone();
                geometry.scale(1, 1, 0.4);
                geometry.rotateX(0.5 * Math.PI);
                geometry.translate(p[0] * 55, 0, -15 + p[1] * 30);
                frontRoofShelfGeometry.merge(geometry);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (frontRoofShelfCubeYPosition_1_1 && !frontRoofShelfCubeYPosition_1_1.done && (_a = frontRoofShelfCubeYPosition_1.return)) _a.call(frontRoofShelfCubeYPosition_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        // for (let i = 0; i < frontRoofShelfCubeYPosition.length; i++) {
        //   const p        = frontRoofShelfCubeYPosition[i];
        //   const geometry = frontRoofShelfCubeGeometry.clone();
        //   geometry.scale(1, 1, 0.4);
        //   geometry.rotateX(0.5 * Math.PI);
        //   geometry.translate(p[0] * 55, 0, -15 + p[1] * 30);
        //   frontRoofShelfGeometry.merge(geometry);
        // }
        frontRoofShelfGeometry = new THREE.BufferGeometry().fromGeometry(frontRoofShelfGeometry);
        var frontRoofShelf = xX_MyThree_Util.makeMesh('phong', frontRoofShelfGeometry, 0xFFFFFF);
        frontRoofShelf.position.set(-70, 115, 5);
        return frontRoofShelf;
    };
    HospitalHelper.create_Hospital_FrontSecondFloor_GardenPlane = function () {
        // 二层大露台的地板。
        var frontPlatGeometry = new THREE.BoxBufferGeometry(150, 3, 90);
        var fronPlat = xX_MyThree_Util.makeMesh('lambert', frontPlatGeometry, 0x0792A5);
        fronPlat.position.set(-3, 18, 25);
        return fronPlat;
    };
    HospitalHelper.create_Hospital_FrontSecondFloor_Langan_BlueWall = function () {
        // 二层大露台的【栏杆-蓝色墙体】。
        var frontPlatVerticalGeometry = new THREE.BoxBufferGeometry(150, 15, 3);
        var frontPlatVertical = xX_MyThree_Util.makeMesh('phong', frontPlatVerticalGeometry, 0x0792A5);
        frontPlatVertical.receiveShadow = false;
        frontPlatVertical.position.set(-3, 24, 68.5);
        return frontPlatVertical;
    };
    HospitalHelper.create_Hospital_FrontSecondFloor_Langan_WhiteFushou = function () {
        // 二层大露台的【栏杆-白色扶手】。
        var frontPlatVerticalWhiteGeometry = new THREE.BoxBufferGeometry(150, 3, 3);
        var frontPlatVerticalWhite = xX_MyThree_Util.makeMesh('phong', frontPlatVerticalWhiteGeometry, 0xFFFFFF);
        frontPlatVerticalWhite.position.set(-3, 33, 68.5);
        return frontPlatVerticalWhite;
    };
    HospitalHelper.create_Hospital_Pillar_UnderFrontSecondFloor = function () {
        // 支撑二层大露台的【柱子：一】
        var frontPlatPillarGeometry = new THREE.CylinderGeometry(2, 2, 15, 32);
        var frontPlatPillar = xX_MyThree_Util.makeMesh('lambert', frontPlatPillarGeometry, 0xFFFFFF);
        frontPlatPillar.position.set(-60, 10, 55);
        // 支撑二层大露台的【柱子：二】
        var frontPlatPillar2 = frontPlatPillar.clone();
        frontPlatPillar2.position.set(55, 10, 55);
        return [frontPlatPillar, frontPlatPillar2];
    };
    HospitalHelper.create_Hospital_FrontMain_VerticalEdge_White = function () {
        // 前栋大楼，三条竖直的【转角包边-白色棱线】。
        var frontBorderVerticles = new THREE.Object3D();
        var frontBorderVerticleGeometry = new THREE.BoxBufferGeometry(4, 106, 4);
        var frontBorderVerticleMesh = xX_MyThree_Util.makeMesh('phong', frontBorderVerticleGeometry, 0xFFFFFF);
        var frontBorderVerticle1 = frontBorderVerticleMesh.clone();
        frontBorderVerticle1.position.set(-80, 52, 30);
        frontBorderVerticles.add(frontBorderVerticle1);
        var frontBorderVerticle2 = frontBorderVerticleMesh.clone();
        frontBorderVerticle2.position.set(-80, 52, -20);
        frontBorderVerticles.add(frontBorderVerticle2);
        var frontBorderVerticle3 = frontBorderVerticleMesh.clone();
        frontBorderVerticle3.position.set(50, 52, -18);
        frontBorderVerticles.add(frontBorderVerticle3);
        return frontBorderVerticles;
    };
    HospitalHelper.create_Hospital_FrontRooftop_EdgeWall = function () {
        // 前栋大楼的天台【白色围栏】。
        var frontRoofCoords = [
            [-82, -32],
            [20, -32],
            [52, 0],
            [52, 22],
            [-82, 22],
            [-82, -32],
        ];
        var frontRoofHolePath = [
            [-78, -28],
            [20, -28],
            [48, 0],
            [48, 18],
            [-78, 18],
            [-78, -28],
        ];
        var frontRoofShape = xX_MyThree_Util.makeShape(frontRoofCoords, frontRoofHolePath);
        var frontRoofGeometry = xX_MyThree_Util.makeExtrudeGeometry(frontRoofShape, 8);
        var frontRoof = xX_MyThree_Util.makeMesh('phong', frontRoofGeometry, 0xFFFFFF);
        frontRoof.position.y = 100;
        return frontRoof;
    };
    HospitalHelper.create_Hospital_BackMain_YellowWrapShell = function () {
        // 后栋大楼的【黄色外层包裹外壳】（窗户另外嵌入生成）
        var backMainCoords = [
            [-80, 20],
            [-80, 60],
            [80, 60],
            [80, 20],
            [-80, 20],
        ];
        var backMainHolePath = [
            [-78, 22],
            [78, 22],
            [78, 58],
            [-78, 58],
            [-78, 22],
        ];
        var backMainShape = xX_MyThree_Util.makeShape(backMainCoords, backMainHolePath);
        var backMainGeometry = xX_MyThree_Util.makeExtrudeGeometry(backMainShape, 90);
        var backMain = xX_MyThree_Util.makeMesh('lambert', backMainGeometry, 0xF2E21B);
        return backMain;
    };
    HospitalHelper.create_Hospital_BackMain = function () {
        // 后栋大楼的【白色主要楼体】（窗户另外嵌入生成）
        var backMiddleCoords = [
            [0, 0],
            [36, 0],
            [36, 70],
            [0, 70],
            [0, 0],
        ];
        var backMiddleHolePath = [
            [2, 2],
            [34, 2],
            [34, 68],
            [2, 68],
            [2, 2],
        ];
        var backMiddleShape = xX_MyThree_Util.makeShape(backMiddleCoords, backMiddleHolePath);
        var backMiddkeGeometry = xX_MyThree_Util.makeExtrudeGeometry(backMiddleShape, 165);
        var backMiddle = xX_MyThree_Util.makeMesh('lambert', backMiddkeGeometry, 0xFFFFFF);
        backMiddle.rotation.x = -0.5 * Math.PI;
        backMiddle.rotation.z = -0.5 * Math.PI;
        backMiddle.position.y = 86;
        backMiddle.position.z = -58;
        backMiddle.position.x = -78;
        return backMiddle;
    };
    HospitalHelper.create_Hospital_BackMain_MirrorWall = function () {
        // 后栋大楼，侧边的整面【幕墙墙体】。
        var backMiddleWindowGeometry = new THREE.PlaneGeometry(32, 66, 1, 1);
        var backMiddleWindowMaterial = new THREE.MeshPhongMaterial({ map: xX_textures.window() });
        backMiddleWindowMaterial.map.repeat.set(2, 6);
        var backMiddleWindow = new THREE.Mesh(backMiddleWindowGeometry, backMiddleWindowMaterial);
        backMiddleWindow.position.set(83, 51, -40);
        backMiddleWindow.rotation.y = 0.5 * Math.PI;
        return backMiddleWindow;
    };
    HospitalHelper.create_Hospital_BackMain_Windows = function () {
        var windows = [];
        // 后栋大楼，背面的窗户（共 4*7=28面）。
        var windowBackOrigin = HospitalHelper.inner_create_Hospital_Window();
        windowBackOrigin.scale.set(0.6, 0.6, 1);
        windowBackOrigin.rotation.y = Math.PI;
        windowBackOrigin.position.set(65, 75, -61);
        for (var i = 0; i < 7; i++) {
            for (var j = 0; j < 4; j++) {
                var windowObj = windowBackOrigin.clone();
                windowObj.position.x -= i * 22;
                windowObj.position.y -= j * 20;
                windows.push(windowObj);
            }
        }
        return windows;
    };
    // TIP 创建大楼窗户
    HospitalHelper.inner_create_Hospital_Window = function () {
        var windowObj = new THREE.Object3D();
        var glassGeometry = new THREE.PlaneGeometry(20, 20);
        var glass = xX_MyThree_Util.makeMesh('phong', glassGeometry, 0x6A5E74);
        windowObj.add(glass);
        var windowBorderGeometry = new THREE.BoxBufferGeometry(22, 2, 2);
        var windowBorder = xX_MyThree_Util.makeMesh('phong', windowBorderGeometry, 0xFFFFFF);
        var windowBorderTop = windowBorder.clone();
        windowBorderTop.position.y = 10;
        windowObj.add(windowBorderTop);
        var windowBorderBottom = windowBorder.clone();
        windowBorderBottom.position.y = -10;
        windowObj.add(windowBorderBottom);
        var windowBorderLeft = windowBorder.clone();
        windowBorderLeft.rotation.z = 0.5 * Math.PI;
        windowBorderLeft.position.x = -10;
        windowObj.add(windowBorderLeft);
        var windowBorderRight = windowBorderLeft.clone();
        windowBorderRight.position.x = 10;
        windowObj.add(windowBorderRight);
        return windowObj;
    };
    // 前栋大楼：共用的地基底座形状。
    HospitalHelper.frontMainCoords = [
        [-80, -30],
        [-80, 20],
        [50, 20],
        [50, 0],
        [20, -30],
        [-80, -30],
    ];
    return HospitalHelper;
}());
//# sourceMappingURL=MiniCity.js.map