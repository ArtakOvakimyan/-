let fs = require('fs');
let arg = process.argv;
let alph = new Array();
fs.readFile(arg[2], (err, data) => {
	if (err){
		console.error(err);
		return;
	}
	if (data.length == 0){
		throw new Error('Пустой файл');
	}
	console.log(data.toString());
	let inText = data.toString();
	
	for (let i = 0; i < inText.length; i++){
		alph[inText.charAt(i)] = 0;
	}
	for (let i = 0; i < inText.length; i++){
		alph[inText.charAt(i)] ++;
	}
	let h = 0;
	let n = 0;
	for (let i in alph) {
		alph[i] /= inText.length;
		n++;
	}
	if (n = 1){
		console.log(1)
	}
	else{
	for (let i in alph){
		h -= alph[i] * Math.log2(alph[i]);
	}
	h /= Math.log2(n);
	console.log(h);
	}
});