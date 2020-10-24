/**
 * 解析路径相关。
 */
export function xX_resolve(dir: any): string;
/**
 * 获取【多组件多入口】。
 */
export function xX_getEntries(path: any): {};
export namespace Externals_TypeE {
    const Window_Root: string;
    const Module_Exports: string;
    const Module_Exports_Default: string;
    const Module_Exports_Default_AMD: string;
}
/**
 * 从根源上，修复一个曾经很棘手的问题。
 * 				1.【npm link】+【业务库 & 组件库】时，同一个【vue】、【element-ui】会同时存在两个，导致【逻辑出错】。
 * @param	{WebpackOptions_Type} config
 * @param {Array<string>} packageArray
 */
export function xX_fix_NpmLink_TwoProject_DuplicatePackage_Error(config: WebpackOptions_Type, packageArray: Array<string>): void;
/**
 *
 * @param {ChainableWebpackConfig_Type} config
 */
export function xX_add_CircularDependencyPlugin(config: ChainableWebpackConfig_Type): void;
export namespace xX_NodeEnvE {
    const production: string;
    const development: string;
}
/**
 *
 * @param {xX_NodeEnvE_KeyType} env
 */
export function xX_isNodeEnv(env: xX_NodeEnvE_KeyType): boolean;
//# sourceMappingURL=webpack-util.d.ts.map