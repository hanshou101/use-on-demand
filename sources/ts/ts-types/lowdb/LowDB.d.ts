declare namespace LowDB {
	interface Project {
		id: string;            // 项目唯一ID
		name: string;          // 项目名
		icon: string;          // 图标（用默认值）
		//
		descTags: string;    // 描述标签
		content: string;       // 介绍内容
		//
		createdAt?: string;    // 创建时间（？）
		updatedAt?: string;    // 更新时间（？）
	}


	interface DB {
		projects: Project[],
	}
}
