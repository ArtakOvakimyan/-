const { performance } = require('perf_hooks');
let fs = require('fs');
let arg = process.argv;

let string = fs.readFileSync(arg[2], 'utf8');
let subString = fs.readFileSync(arg[3], 'utf8');

switch (arg[4]) {
	case "BruteForce":
		Perform(BruteForce);
		break;
	case "SimpleHash":
		Perform(SimpleHash);
		break;
	case "SquareHash":
		Perform(SquareHash);
		break;
	case "RabinKarp":
		Perform(RabinKarp);
		break;
	defualt:
		console.log("Unknown command");
		break;
}
function Perform (method) {
	var time = 0;
	var startTime = 0;
	var startTime = performance.now();
	result = method(string, subString);
	time = performance.now() - startTime;
	console.log("time: ", time, "\nindexes: ", result);
}

function Compare(str, substr, i){
	var flag = true
	for (var j = 0; j < substr.length; ++j){
		if (str.charAt(i + j) != substr.charAt(j)){
			flag = false;
			break;
		}
	}
	return flag;
}

function BruteForce(str, substr){
	var indexes = new Array();
	for (var i = 0; i < str.length-substr.length; i++){
		if (Compare(str, substr, i)) indexes.push(i);	
	}
	return indexes;
}

function SimpleHash(str, substr){
	var indexes = new Array();
	var hashStr = 0;
	var substrHash = 0;
	var collisions = 0;
	for (var i = 0; i < substr.length; i++){
		substrHash += substr.charCodeAt(i);
		hashStr += str.charCodeAt(i);
	}

	for (var i = 0; i < str.length - substr.length + 1; i++){
		if (hashStr == substrHash){
			if (Compare(str, substr, i)) indexes.push(i);
			else collisions++;
		}
		hashStr += str.charCodeAt(i + substr.length) - str.charCodeAt(i);
	}
	console.log("SimpleHash collisions:", collisions);
	return indexes;
}

function SquareHash(str, substr){
	var indexes = new Array();
	var hashStr = 0;
	var substrHash = 0;
	var collisions = 0;
	for (var i = 0; i < substr.length; i++){
		substrHash += Math.pow(substr.charCodeAt(i),2);
		hashStr += Math.pow(str.charCodeAt(i),2);
	}

	for (var i = 0; i < str.length - substr.length + 1; i++){
		if (substrHash == hashStr){
			if (Compare(str, substr, i)) indexes.push(i);
			else collisions++;
		}
		hashStr += Math.pow(str.charCodeAt(i + substr.length),2) - Math.pow(str.charCodeAt(i),2);
	}
	console.log("SquareHash collisions:", collisions);
	return indexes;
}

function RabinKarp(str, substr){
	var indexes = new Array();
	var hashStr = 0;
	var substrHash = 0;
	var collisions = 0;
	for (var i = 0; i < substr.length; i++){
		substrHash += substr.charCodeAt(i) * Math.pow(2, substr.length - i - 1)
		hashStr += str.charCodeAt(i) * Math.pow(2, substr.length - i - 1)
	}

	for (var i = 0; i < str.length - substr.length + 1; i++){
		if (hashStr == substrHash){
			if (Compare(str, substr, i)) indexes.push(i);
			else collisions++;
		}
		hashStr -= str.charCodeAt(i) * Math.pow(2, substr.length - 1);
		hashStr *= 2;
		hashStr += str.charCodeAt(i + substr.length);
	}
	console.log("RabinKarp collisions:", collisions);
	return indexes;
}
