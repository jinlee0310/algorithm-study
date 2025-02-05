const fs = require('fs');

const input = fs.readFileSync(0).toString().trim().split('\n');
const N = parseInt(input[0], 10);

const stack = [];
const log = [];
for (let i = 1; i <= N; i++) {
	const cmdStr = input[i];
	const blankIdx = cmdStr.indexOf(' ');
	const cmd = parseInt(
		blankIdx !== -1 ? cmdStr.substring(0, blankIdx) : cmdStr,
		10,
	);
	const x =
		blankIdx !== -1 ? parseInt(cmdStr.substring(blankIdx + 1), 10) : 0;

	if (cmd === 1) {
		stack.push(x);
	} else if (cmd === 2) {
		const v = stack.pop();
		log.push(v || -1);
	} else if (cmd === 3) {
		log.push(stack.length);
	} else if (cmd === 4) {
		log.push(stack.length === 0 ? 1 : 0);
	} else {
		log.push(stack.length === 0 ? -1 : stack[stack.length - 1]);
	}
}

console.log(log.join('\n'));