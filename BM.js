let fs = require('fs');
const readlineSync = require('readline-sync');
let arg = process.argv;

let string = fs.readFileSync(arg[2], 'utf8');
let t = readlineSync.question("Write substring: ");
let n = string.length;
let m = t.length;

Search();

function Search(){
	let N = GetTableForBadCharacter();
	let res = [];
	let i = l = 0;
	while (i <= n - m){
		for (l = 0; string[i+m-l-1] == t[m-l-1]; l++){
			if (l == m - 1){
				res.push(i);
				break;
			}
		}
		i = Math.max(Shift(N, i, l));
	}
	console.log(res);
}

function GetTableForBadCharacter(){
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
		i += Math.max(1, m - N[char] - l, GoodSuffix()[l]);
	return i;
}

function GoodSuffix(){
	let suffix = "";
	let shift = new Array(m);
	shift.fill(m);
	shift[0] = 1;
	let i = m - 1;
	let j = i - 1;
	while (i > 0){
		suffix = t[i] + suffix;
		while (j >= 0 && suffix != t.substring(j, suffix.length))
			j--;
		shift[suffix.length] = j;
		i--;
		j = i;
	}
	return shift;
}
