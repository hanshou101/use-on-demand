declare namespace LowDB{

  interface _Base{
    //
    createdAt? : string;    // 创建时间（？）
    updatedAt? : string;    // 更新时间（？）
  }

  interface Project implements _Base{
    id : string;            // 唯一ID
    name : string;          // 项目名
    icon : string;          // 图标（用默认值）
    //
    descTags : string;    // 描述标签
    content : string;       // 介绍内容
  }

  interface Server implements _Base{
    id : string;              // 唯一ID
    projectId : string;       // 项目唯一ID
    //
    trueIP : string;          // 真实IP
    systemType : string;      // 系统类型
    systemVersion : string;   // 系统版本
    openPort : string;        // 开放端口
    webAppFirewall : string;  // 网页防火墙
  }

  interface SiteMain implements _Base{
    id : string;              // 唯一ID
    projectId : string;       // 项目唯一ID
    //
    cmsSystemInfo : string;         // CMS系统信息
    cdnDetail : string;             // CDN详情
    certDetail : string;            // 证书详情
    dnsRecords : string;            // DNS导向记录
  }

  interface DB{
    projects : Project[];
    servers : Server[];
    siteMains : SiteMain[];
  }
}
