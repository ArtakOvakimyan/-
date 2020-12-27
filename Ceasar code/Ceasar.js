let fs = require('fs');
let arg = process.argv;
let textForStatistics = fs.readFileSync(arg[2],'utf8');
let text = fs.readFileSync(arg[3],'utf8');
let outputFile = arg[4];

let alph = require('./export');
let shiftDefault = 3;
let mainFreq = GetFreq(textForStatistics);
let currentFreq = GetFreq(text); 

switch (arg[5]) {
	case "Encode":
		console.log(Encode(shiftDefault));
		fs.writeFileSync(outputFile, Encode(shiftDefault));
		break;
	case "Decode":
		console.log(Decode(GetShift()));
		fs.writeFileSync(outputFile, Decode(GetShift()));
		break;
	defualt:
		console.log("Unknown command");
		break;
}

function Initialize(){
	let freq = [];
	for (let i of alph)
		freq[i] = 0;
	return freq;
}

function GetFreq(text){
	let freq = Initialize();
	let sum = 0;
	for (var i of text){
		if (alph.includes(i)){
			freq[i]++;
			sum++;
		}
	}
	for (var j of alph)
		freq[j] /= sum;
	return freq;
}

function Encode(shift){
    let coded = [];
    for(let i of text)
    {
        let symbol = '';
        if(alph.includes(i))
			symbol = alph[(alph.indexOf(i) + shift) % alph.length];
        else
            symbol = i;
		coded.push(symbol);
    }
    return coded.join('');
}

function GetShift(){
	let dif = [];
	let shift = 0;
	for (let k = 0; k <= alph.length - 1; k++){
		dif[k] = 0;
		for (let i = 0; i <= alph.length - 1; i++)
			dif[k] += Math.pow(currentFreq[alph[i]] - mainFreq[alph[(i + k) % alph.length]], 2);
	}
	shift = dif.indexOf(Math.min.apply(null, dif));
	return shift;
}

function Decode(shift){
	return Encode(shift);
}