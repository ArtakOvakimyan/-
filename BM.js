let fs = require('fs');
const readlineSync = require('readline-sync');
let arg = process.argv;

let string = fs.readFileSync(arg[2], 'utf8');
let t = readlineSync.question("Write substring: ");
let n = string.length;
let m = t.length;

Search();

function Search(){
	let N = GetTable();
	let res = [];
	let i = 0;
	let l = 0;
	while (i <= n - m){
		for (l = 0; string[i+m-l-1] == t[m-l-1]; l++){
			if (l == m - 1){
				res.push(i);
				break;
			}
		}
		i = Shift(N, i, l);
	}
	console.log(res);
}

function GetTable(){
	var N = [];
	for(j = 0; j < m; j++)
		N[t.charAt(j)] = j + 1;
	return N;
}

function Shift(N, i, l){
	var char = string[i + m - l - 1];
	if (!N[char])
		i += m;
	else
		i+= Math.max(1, m - N[char] - l);
	return i;
}
