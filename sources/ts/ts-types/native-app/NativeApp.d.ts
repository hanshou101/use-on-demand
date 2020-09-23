// 消息处理Handler
interface WebkitMsgHandler {
	postMessage(str: string): void;
}

interface Window {
	// 用于iOS
	webkit?: {
		messageHandlers: {
			[key: string]: WebkitMsgHandler;
		}
	};
	// 用于Android
	android?: {
		[key: string]: Function;
	};
}
