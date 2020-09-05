/**
 * 图片参考资源：
 *            1.牌桌 - https://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E5%BE%B7%E5%85%8B%E8%90%A8%E6%96%AF%E6%89%91%E5%85%8B%20%E7%89%8C%E9%A6%86&step_word=&hs=0&pn=45&spn=0&di=97790&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=0&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=undefined&cs=1191553602%2C4141741864&os=1905175852%2C3732540719&simid=3328778840%2C305455330&adpicid=0&lpn=0&ln=1379&fr=&fmq=1555756344952_R&fm=&ic=undefined&s=undefined&hd=undefined&latest=undefined&copyright=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&ist=&jit=&cg=&oriquery=&objurl=http%3A%2F%2Fwww.yangming1888.com%2Fuploadfile%2F2016%2F0801%2F20160801051509608.jpg&fromurl=ippr_z2C%24qAzdH3FAzdH3Fxtw5x7j_z%26e3Bp7xt_z%26e3Bv54_z%26e3BvgAzdH3Fetjok-8bn0abalacncbn9-8bn0abalacncbn9m9ma_z%26e3Bip4s&gsm=3c&rpstart=0&rpnum=0&islist=&querylist=&force=undefined
 *            2.搜索 - http://image.baidu.com/search/index?tn=baiduimage&ps=1&ct=201326592&lm=-1&cl=2&nc=1&ie=utf-8&word=%E5%BE%B7%E5%85%8B%E8%90%A8%E6%96%AF%E6%89%91%E5%85%8B+%E7%89%8C%E9%A6%86
 *            3.筹码、卡面 - http://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E5%BE%B7%E5%85%8B%E8%90%A8%E6%96%AF%E6%89%91%E5%85%8B%20%E7%89%8C%E9%A6%86&step_word=&hs=0&pn=30&spn=0&di=141570&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=0&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=undefined&cs=1917373822%2C166787975&os=2242348046%2C4115527477&simid=4289668528%2C797921265&adpicid=0&lpn=0&ln=1379&fr=&fmq=1555756344952_R&fm=&ic=undefined&s=undefined&hd=undefined&latest=undefined&copyright=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&ist=&jit=&cg=&bdtype=0&oriquery=&objurl=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20160623%2Fc7fe62cfcc674c2086280e662eefe9bc_th.jpg&fromurl=ippr_z2C%24qAzdH3FAzdH3F4p_z%26e3Bf5i7_z%26e3Bv54AzdH3Fda8mamdnAzdH3Fg9cclcmlmd_z%26e3Bfip4s&gsm=0&rpstart=0&rpnum=0&islist=&querylist=&force=undefined
 *            4.筹码、卡面 - http://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E5%BE%B7%E5%85%8B%E8%90%A8%E6%96%AF%E6%89%91%E5%85%8B%20%E7%89%8C%E9%A6%86&step_word=&hs=0&pn=32&spn=0&di=80080&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=0&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=undefined&cs=684707031%2C1784232358&os=789242937%2C1989135310&simid=0%2C0&adpicid=0&lpn=0&ln=1379&fr=&fmq=1555756344952_R&fm=&ic=undefined&s=undefined&hd=undefined&latest=undefined&copyright=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&ist=&jit=&cg=&bdtype=0&oriquery=&objurl=http%3A%2F%2F02.imgmini.eastday.com%2Fmobile%2F20180403%2F20180403002347_24b6d50b4ca3d5985eb25697bf834c30_1.jpeg&fromurl=ippr_z2C%24qAzdH3FAzdH3Ffr56pf_z%26e3Bjwfp1wy_z%26e3Bv54AzdH3FwAzdH3F8ba9anaadn90amlaaaaaa_z%26e3Bip4s&gsm=0&rpstart=0&rpnum=0&islist=&querylist=&force=undefined
 *            5.
 */
import { MyThree_Util } from '../demo2_mini_city/js/utils';
const THREE = require('three'); // 85版本、95版本
import { MyOrbitControls } from '../demo2_mini_city/js/MyOrbitControls';
export class DepuTable_three95 {
    constructor() {
        this.config = { isMobile: false, background: 0x282828 };
        // 汽车
        this.cars = [];
    }
    /**
     * TODO 以下为启动阶段：
     *            1.【开始】
     *            2.【检验手机平台：适配】
     */
    startDepu() {
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
        this.buildTable();
        this.buildPoker();
        // this.buildBuilding();
        // this.buildRoad();
        // this.buildStaticCars();
        // this.buildMovingCars();
        this.loop();
        this.onWindowResize();
    }
    // TIP 检测手机平台
    checkUserAgent() {
        const n = navigator.userAgent;
        if (n.match(/Android/i) || n.match(/webOS/i) || n.match(/iPhone/i) || n.match(/iPad/i) || n.match(/iPod/i) || n.match(/BlackBerry/i)) {
            this.config.isMobile = true;
            this.camera.position.set(420, 420, 420);
            this.renderer.shadowMap.enabled = false;
        }
    }
    /**
     * 以上为启动阶段。
     */
    /**
     * TODO 以下为初始化场景阶段：
     *            1.【构建辅助网格系统（模拟地砖效果）】
     *            2.【】
     */
    // 构建辅助网格系统（模拟地砖效果）
    buildAuxSystem() {
        // 绘制网格线
        const gridHelper = new THREE.GridHelper(320, 32);
        this.scene.add(gridHelper);
        // 允许【视角旋转】、【视角放大缩小】。（包括阻尼系数）
        const controls = new MyOrbitControls(this.camera, this.renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.rotateSpeed = 0.35;
    }
    buildLightSystem() {
        if (!this.config.isMobile) {
            // TODO 电脑之上
            // 方向光：设置光照
            const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1.1);
            directionalLight.position.set(300, 1000, 500);
            directionalLight.target.position.set(0, 0, 0);
            directionalLight.castShadow = true;
            // 方向光：设置光照阴影
            const d = 300;
            directionalLight.shadow.camera = new THREE.OrthographicCamera(-d, d, d, -d, 500, 1600);
            directionalLight.shadow.bias = 0.0001;
            directionalLight.shadow.mapSize.width = directionalLight.shadow.mapSize.height = 1024;
            this.scene.add(directionalLight);
            // 环境光
            const light = new THREE.AmbientLight(0xFFFFFF, 0.3);
            this.scene.add(light);
        }
        else {
            // TODO 手机之上
            // 半球光（也就是天光效果，更加自然）
            const hemisphereLight = new THREE.HemisphereLight(0xFFFFFF, 1);
            this.scene.add(hemisphereLight);
            // 环境光
            const light = new THREE.AmbientLight(0xFFFFFF, 0.15);
            this.scene.add(light);
        }
    }
    // 创建桌子
    buildTable() {
        const tableShape = TableHelper.roundedRect(-100, -50, 200, 100, 50);
        const tableGeometry = MyThree_Util.makeExtrudeGeometry(tableShape, 10);
        const tableMesh = MyThree_Util.makeMesh('lambert', tableGeometry, 0x274C2B);
        tableMesh.position.y = 0;
        this.scene.add(tableMesh);
    }
    // 创建扑克
    async buildPoker() {
        // 空白扑克
        for (let i = 0; i < 1; i++) {
            const poker = PokerHelper.createOne_EmptyPoker();
            PokerHelper.randomPokerPos(poker);
            this.scene.add(poker);
        }
        // 带花扑克
        for (let i = 0; i < 11; i++) {
            const poker = await PokerHelper.createOne_FlowerPoker();
            PokerHelper.randomPokerPos(poker);
            this.scene.add(poker);
        }
    }
    // TIP 循环执行代码
    loop() {
        // stats.update()
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.loop.bind(this));
    }
    // TIP 监听浏览器窗口大小变化
    onWindowResize() {
        window.addEventListener('resize', () => {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.camera.aspect = this.width / this.height;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(this.width, this.height);
        });
    }
}
class TableHelper {
    /**
     * 创建圆角矩形。
     * 参考资料：用THREE.Shape画二维圆角矩形 - 郭不耐 {大数据 @ 可视化} - CSDN博客 - https://blog.csdn.net/guoweish/article/details/52905288
     */
    static roundedRect(x, y, width, height, radius) {
        const shape = new THREE.Shape();
        shape.moveTo(x, y + radius);
        shape.lineTo(x, y + height - radius);
        shape.quadraticCurveTo(x, y + height, x + radius, y + height);
        shape.lineTo(x + width - radius, y + height);
        shape.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
        shape.lineTo(x + width, y + radius);
        shape.quadraticCurveTo(x + width, y, x + width - radius, y);
        shape.lineTo(x + radius, y);
        shape.quadraticCurveTo(x, y, x, y + radius);
        return shape;
    }
}
class PokerHelper {
    // 创建空白扑克
    static createOne_EmptyPoker(w = 14.5, h = 20) {
        const pokerShape = TableHelper.roundedRect(-w / 2, -h / 2, w, h, w / 6);
        const pokerGeometry = MyThree_Util.makeExtrudeGeometry(pokerShape, 0.3);
        const pokerMesh = MyThree_Util.makeMesh('lambert', pokerGeometry, 0xFFFFFF);
        pokerMesh.position.y = 20;
        return pokerMesh;
    }
    /**
     * TIP 创建带花扑克
     * 参考资料：      three.js--如何给一个场景贴图 - CSDN博客 - https://blog.csdn.net/u011011025/article/details/50723410
     */
    static async createOne_FlowerPoker(w = 14.5, h = 20) {
        const path = `/image/poker/${Math.floor(2 + (Math.random() * 13))}-1.png`;
        const pokerTexture = await MyThree_Util.asyncLoad_textureLoader(path);
        const oldTexture = () => {
            // TIP 纹理矩阵参考资料：98 Three.js 通过设置纹理属性来修改纹理贴图的位置和大小 - 现在学习也不晚 - CSDN博客 - https://blog.csdn.net/qq_30100043/article/details/80260345
            // 暂时不用这个调整 texture.matrix.scale(10, 10);
            const pokerShape = TableHelper.roundedRect(-w / 2, -h / 2, w, h, w / 6);
            const pokerMaterial = new THREE.MeshBasicMaterial({
                map: pokerTexture,
                side: THREE.FrontSide,
            });
            const pokerGeometry = MyThree_Util.makeExtrudeGeometry(pokerShape, 0.3);
            const pokerMesh = new THREE.Mesh(pokerGeometry, pokerMaterial);
            // 别忘了添加阴影。
            pokerMesh.castShadow = true;
            pokerMesh.receiveShadow = true;
            pokerMesh.position.y = 20;
            return pokerMesh;
        };
        const newTexture = () => {
            const geometry = new THREE.BoxBufferGeometry(w, h, 0.3);
            const material = new THREE.MeshLambertMaterial({
                map: pokerTexture,
                side: THREE.BackSide,
            });
            const mesh = new THREE.Mesh(geometry, material);
            return mesh;
        };
        const finalTexture = () => {
            /**
             * 提问：如何给一个Mesh的Texture纹理，只设置一面有纹理？  （一面有，其它面没有）
             * 参考资料：    three.js - How to create multiple Box and only change the texture on one side? - Stack Overflow - https://stackoverflow.com/questions/23330269/how-to-create-multiple-box-and-only-change-the-texture-on-one-side
             *
             * 解决问题的思路：
             *            1.将多个【基础Material】放入一个数组，再用数组初始化【MeshFaceMaterial】。
             *            2.比如六面体，就六面都有各自Material。
             */
            const materialArray = [];
            materialArray.push(new THREE.MeshBasicMaterial({ color: 0xFFFFFF }));
            materialArray.push(new THREE.MeshBasicMaterial({ color: 0xFFFFFF }));
            materialArray.push(new THREE.MeshBasicMaterial({ color: 0xFFFFFF }));
            materialArray.push(new THREE.MeshBasicMaterial({ color: 0xFFFFFF }));
            // 第5面，创建【扑克纹理的材质】
            materialArray.push(new THREE.MeshLambertMaterial({
                map: pokerTexture,
            }));
            materialArray.push(new THREE.MeshBasicMaterial({ color: 0xFFFFFF }));
            const material = new THREE.MeshFaceMaterial(materialArray);
            const geometry = new THREE.BoxBufferGeometry(w, h, 0.3);
            const mesh = new THREE.Mesh(geometry, material);
            // 别忘了添加阴影。
            mesh.castShadow = true;
            // mesh.receiveShadow = true;
            // mesh.position.y    = 20;
            return mesh;
        };
        return finalTexture();
    }
    // 随机放置扑克位置。
    static randomPokerPos(poker) {
        poker.position.set((Math.random() - 0.5) * 200, (Math.random() + 0.2) * 130 + (-5), (Math.random() - 0.5) * 130);
        poker.rotation.set(Math.random() * (2 * Math.PI), Math.random() * (2 * Math.PI), Math.random() * (2 * Math.PI));
    }
}
//# sourceMappingURL=DepuTable.js.map