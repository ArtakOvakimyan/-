let fs = require('fs');
let resStr = '';
let arg = process.argv;
let i = 0, n = 1;

fs.readFile(arg[2], (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    if (data.length == 0) {
        throw new Error('Пустой файл');
    }
	let inText = data.toString();

    if (arg[3] == 'code') {
        while (i < inText.length) {
            while (inText.charAt(i) == inText.charAt(i + n))
                n++;
            console.log(inText.charAt(i), " - ", n);
            let nJump = n;
            while (n >= 127) {
                resStr += '#' + String.fromCharCode(127) + inText.charAt(i);
                n -= 127;
            }
            if ((n > 3) || (inText.charAt(i) == '#'))
                resStr += '#' + String.fromCharCode(n) + inText.charAt(i)
            else
                for (k = 0; k < n; k++)
                    resStr += inText.charAt(i);
            i += nJump;
            n = 1;
        }
        fs.writeFileSync(arg[4], resStr);
    }

    else if (arg[3] == 'decode') {
        while (i < inText.length) {
            if (inText.charAt(i) != '#')
                resStr += inText.charAt(i);
            else {
                let symbol = inText.charAt(i + 2);
                let amount = 1 * inText.charAt(i + 1);
                for (let j = 0; j < amount; j++) {
                    resStr += symbol;
                }
                i += 3;
            }
        }
        fs.writeFileSync(arg[4], resStr);
    }
	
	else {
		console.log('Неизвестная комманда');
	}
});
