import ApiConfig         from './api.config';
import {EnvName_EnvEnum} from './EnvEnum';

export class EnvFlags {

  /**
   * 本地 Mock Cookie值。
   *        1.便于登录
   */
  static localMockCookie = EnvFlags._allowEnvs([
    EnvName_EnvEnum.local,          // 本地环境
  ]);

  /**
   * 使用CDN。
   */
  private static firstCheck_useCDN = EnvFlags._allowEnvs([                            // 首次检查
    EnvName_EnvEnum.pre_prod,       // 预生产
    EnvName_EnvEnum.std_prod,       // 生产
  ]);
  public static finalCheck_useCDN  = /* isClient && */ EnvFlags.firstCheck_useCDN;         // 最终检查

  // noinspection PointlessBooleanExpressionJS
  /**
   * K线的 debug模式 。
   */
  static tradingViewDebug = true && EnvFlags._allowEnvs([
    EnvName_EnvEnum.local,          // 本地环境
  ]);

  //
  //
  //
  private static _allowEnvs(envs: Array<EnvName_EnvEnum>) {
    return envs.includes(ApiConfig.envName);
  }
}


declare global {
  type EnvFlags_Type = typeof EnvFlags;
}
