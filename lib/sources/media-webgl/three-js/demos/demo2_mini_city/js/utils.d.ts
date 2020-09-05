export declare class MyThree_Util {
    /**
     * TIP 创建自定义形状。（模子轮廓坐标分布 + 内孔坐标分布）
     * 参考资料：  43 Three.js自定义二维图形THREE.ShapeGeometry - 现在学习也不晚 - CSDN博客 - https://blog.csdn.net/qq_30100043/article/details/78808725#commentBox
     */
    static makeShape(shapeCoords: number[][], ...manyHolesCoords_Arr: number[][][]): THREE.Shape;
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
    static makeExtrudeGeometry(shape: THREE.Shape, amount: number): THREE.ExtrudeBufferGeometry;
    /**
     * 形状+材质 = Mesh（贴面模型）。
     * lambert：适合普通物体。
     * phong：适合金属、镜面。
     */
    static makeMesh(materialType: 'lambert' | 'phong', geometry: THREE.Geometry, color: number): THREE.Mesh;
    /**
     * 路径点 ————> 多边形模子 ————> 形状。
     */
    static makeShapeGeometry(shapeCoords: number[][]): THREE.ShapeGeometry;
    /**
     * 异步加载【Texture纹理文件】
     */
    static asyncLoad_textureLoader(path: string): Promise<THREE.Texture>;
}
//# sourceMappingURL=utils.d.ts.map