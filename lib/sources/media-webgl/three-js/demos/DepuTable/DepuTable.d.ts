/**
 * 图片参考资源：
 *            1.牌桌 - https://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E5%BE%B7%E5%85%8B%E8%90%A8%E6%96%AF%E6%89%91%E5%85%8B%20%E7%89%8C%E9%A6%86&step_word=&hs=0&pn=45&spn=0&di=97790&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=0&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=undefined&cs=1191553602%2C4141741864&os=1905175852%2C3732540719&simid=3328778840%2C305455330&adpicid=0&lpn=0&ln=1379&fr=&fmq=1555756344952_R&fm=&ic=undefined&s=undefined&hd=undefined&latest=undefined&copyright=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&ist=&jit=&cg=&oriquery=&objurl=http%3A%2F%2Fwww.yangming1888.com%2Fuploadfile%2F2016%2F0801%2F20160801051509608.jpg&fromurl=ippr_z2C%24qAzdH3FAzdH3Fxtw5x7j_z%26e3Bp7xt_z%26e3Bv54_z%26e3BvgAzdH3Fetjok-8bn0abalacncbn9-8bn0abalacncbn9m9ma_z%26e3Bip4s&gsm=3c&rpstart=0&rpnum=0&islist=&querylist=&force=undefined
 *            2.搜索 - http://image.baidu.com/search/index?tn=baiduimage&ps=1&ct=201326592&lm=-1&cl=2&nc=1&ie=utf-8&word=%E5%BE%B7%E5%85%8B%E8%90%A8%E6%96%AF%E6%89%91%E5%85%8B+%E7%89%8C%E9%A6%86
 *            3.筹码、卡面 - http://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E5%BE%B7%E5%85%8B%E8%90%A8%E6%96%AF%E6%89%91%E5%85%8B%20%E7%89%8C%E9%A6%86&step_word=&hs=0&pn=30&spn=0&di=141570&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=0&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=undefined&cs=1917373822%2C166787975&os=2242348046%2C4115527477&simid=4289668528%2C797921265&adpicid=0&lpn=0&ln=1379&fr=&fmq=1555756344952_R&fm=&ic=undefined&s=undefined&hd=undefined&latest=undefined&copyright=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&ist=&jit=&cg=&bdtype=0&oriquery=&objurl=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20160623%2Fc7fe62cfcc674c2086280e662eefe9bc_th.jpg&fromurl=ippr_z2C%24qAzdH3FAzdH3F4p_z%26e3Bf5i7_z%26e3Bv54AzdH3Fda8mamdnAzdH3Fg9cclcmlmd_z%26e3Bfip4s&gsm=0&rpstart=0&rpnum=0&islist=&querylist=&force=undefined
 *            4.筹码、卡面 - http://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E5%BE%B7%E5%85%8B%E8%90%A8%E6%96%AF%E6%89%91%E5%85%8B%20%E7%89%8C%E9%A6%86&step_word=&hs=0&pn=32&spn=0&di=80080&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=0&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=undefined&cs=684707031%2C1784232358&os=789242937%2C1989135310&simid=0%2C0&adpicid=0&lpn=0&ln=1379&fr=&fmq=1555756344952_R&fm=&ic=undefined&s=undefined&hd=undefined&latest=undefined&copyright=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&ist=&jit=&cg=&bdtype=0&oriquery=&objurl=http%3A%2F%2F02.imgmini.eastday.com%2Fmobile%2F20180403%2F20180403002347_24b6d50b4ca3d5985eb25697bf834c30_1.jpeg&fromurl=ippr_z2C%24qAzdH3FAzdH3Ffr56pf_z%26e3Bjwfp1wy_z%26e3Bv54AzdH3FwAzdH3F8ba9anaadn90amlaaaaaa_z%26e3Bip4s&gsm=0&rpstart=0&rpnum=0&islist=&querylist=&force=undefined
 *            5.
 */
import xX_Car from '../demo2_mini_city/js/Car';
export declare class xX_DepuTable_three95 {
    width?: number;
    height?: number;
    config: {
        isMobile: boolean;
        background: number;
    };
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    cars: xX_Car[];
    /**
     * TODO 以下为启动阶段：
     *            1.【开始】
     *            2.【检验手机平台：适配】
     */
    startDepu(): void;
    checkUserAgent(): void;
    /**
     * 以上为启动阶段。
     */
    /**
     * TODO 以下为初始化场景阶段：
     *            1.【构建辅助网格系统（模拟地砖效果）】
     *            2.【】
     */
    buildAuxSystem(): void;
    buildLightSystem(): void;
    buildTable(): void;
    buildPoker(): Promise<void>;
    loop(): void;
    onWindowResize(): void;
}
//# sourceMappingURL=DepuTable.d.ts.map