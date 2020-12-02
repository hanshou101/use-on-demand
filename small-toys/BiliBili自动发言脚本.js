// const textArea = document.querySelector(".chat-input-ctnr.p-relative .chat-input.border-box");
// const btn = document.querySelector(".right-action.p-absolute.live-skin-coloration-area .bl-button");
// for (let i = 1; i < 200; i++) {
//     textArea.value = i;

// }

function send(msg) {

	const formData = new FormData();
	const params   = 'color=16777215&fontsize=25&mode=1&msg=123&rnd=1606914178&roomid=22539487&bubble=0&csrf_token=790d4e12e380ff78db8b77e6f2fd72dc&csrf=790d4e12e380ff78db8b77e6f2fd72dc';

	params.split('&').forEach(item => {
		const [key, value] = item.split('=');
		formData.append(
			key,
			key === 'msg'
				? msg
				: value,
		);
	});

	const data = new URLSearchParams();
	formData.forEach(pair => {
		data.append(pair[0], pair[1]);
	});

	fetch('https://api.live.bilibili.com/msg/send', {
		method     : 'post',
		body       : data,
		// credentials: 'same-origin',
		credentials: 'include',
	}).then(res => {
		console.log(res);
	});

}

let i = 0;
setInterval(() => {
	// send(String('狗子'.repeat(++i)));
	send(`${++i}条狗子`);
}, 1000);
