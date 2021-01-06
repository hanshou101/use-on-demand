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
    relatedUrls : string;   // 相关url网址
    descTags : string;      // 描述标签
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

  interface Owner implements _Base{
    id : string;              // 唯一ID
    projectId : string;       // 项目唯一ID
    //
    whoisDetail : string;           // whois信息
    ownerName : string;             // 持有人姓名
    siteRegisterRecord : string;    // 网站备案记录
    frequentlyUsedAccount : string; // 持有人常用账号
    emailDetail : string;           // 邮箱信息
    phoneTrackDetail : string;      // 电话反查的信息
    socialRepoRecord : string;      // 社工库，线索信息
  }

  interface SiteRelated implements _Base{
    id : string;              // 唯一ID
    projectId : string;       // 项目唯一ID
    //
    childDomains : string;    // 子域名
    sameServerSites : string; // 同机旁站 同一服务器的 其它另外网站
    cClassMachines : string;  // C段网络，其它机器
  }

  interface Google implements _Base{
    id : string;              // 唯一ID
    projectId : string;       // 项目唯一ID
    //
    targetSearch : string;        // 针对化搜索，特定关键字
    pdfSearch : string;           // PDF文件搜索
    middlewareSearch : string;    // 中间件版本，搜索
    weakPasswordSearch : string;  // 弱口令搜索
  }

  interface DirFile implements _Base{
    id : string;              // 唯一ID
    projectId : string;       // 项目唯一ID
    //
    siteDirs : string;        // 网站目录结构
    adminSitePage : string;   // Admin网站入口
    bannerFiles : string;     // Banner图片目录
    siteTestFiles : string;   // 网站残留，测试文件
    siteBakFiles : string;    // 网站残留，备份文件
  }

  interface HoleSource implements _Base{
    id : string;              // 唯一ID
    projectId : string;       // 项目唯一ID
    //
    transferProtocolHole : string;    // 传输协议漏洞
    commonHole : string;              // 通用漏洞
    exploitDemo : string;             // EXP，漏洞利用，Demo
    githubSourceLeakage : string;     // GitHub源码泄露

  }

  interface DB{
    projects : Project[];
    servers : Server[];
    siteMains : SiteMain[];
    owners : Owner[];
    siteRelateds : SiteRelated[];
    googles : Google[];
    dirFiles : DirFile[];
    holeSources : HoleSource[];
  }
}
