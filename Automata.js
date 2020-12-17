//
//type: node Automata.js [file with text] [file with string]
//
let fs = require('fs');
let arg = process.argv;
let string = fs.readFileSync(arg[2], 'utf8');
let t = fs.readFileSync(arg[3], 'utf8');
let n = string.length;
let m = t.length;

FindEntries();

function Alph(){
	var alph = [];
	for (i = 0; i < m; i++)
		alph[t.charAt(i)] = 0;
	return alph;
}
function PrintTable(alph){
	var position = 0;
	var del = [m + 1];
	for (j = 0; j <= m; j++)
		del[j] = [];
		
	for (i in alph)
		del[0][i] = 0;
		
	for (j = 0; j < m; j++) {
		prev = del[j][t.charAt(j)];
		del[j][t.charAt(j)] = j + 1;
		for (i in alph)
			del[j + 1][i] = del[prev][i];
	}
	
	for (j = 0; j <= m; j++) {
		out = '';
		for (i in alph)
			out += del[j][i] + ' ';
			console.log(out);
	}
	return del;
}
function FindEntries(){
	var position = 0;
	var alph = Alph();
	var del = PrintTable(alph);
	for (var i = 0; i < n; i++) {
		if (string[i] in alph)
			position = del[position][string[i]];
		else
			position = 0;
		if (position == m)
			console.log(i - m + 1);
	}
}