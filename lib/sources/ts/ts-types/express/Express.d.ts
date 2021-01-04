import { Router, Request, Response, NextFunction } from 'express';

declare global {
	interface MyExpress_Error extends Error {
		status?: number;
	}

	interface MyHttps_Error {
		syscall: string;
		code: 'EACCES' | 'EADDRINUSE' | string;
	}

	// 所有路由handler，都采用此快捷类型
	type My_RouterHandler = (req: Request, res: Response, next: NextFunction) => void;
}

