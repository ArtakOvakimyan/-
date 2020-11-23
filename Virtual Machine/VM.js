let fs = require ('fs');
let arg = process.argv;

let text = fs.readFileSync(arg[2]);
text = text.toString();
let mem = new Array();
mem = text.split(/\r\n| /);

let values = fs.readFileSync(arg[3]);
values = values.toString();
let numbers = new Array();
numbers = values.split(/\r\n| /);

var ind = 0;
var ip = 0;
let flag = true;
while (flag)
	switch(mem[ip]){
		case 'input':
			mem[mem[ip+1]] = parseInt(numbers[ind], 10);
			console.log(mem[mem[ip + 1]]);
			ip += 2;
			ind++;
			break;
			
		case 'set':
			mem[mem[ip+1]] = parseInt(mem[ip+2], 10);
			ip += 3;
			break;
			
		case 'output':
			console.log('outcmd');
			console.log(mem[mem[ip+1]]);
			ip += 2;
			break;
			
			
		case 'add':
			mem[mem[ip+3]] = mem[mem[ip+1]] + mem[mem[ip+2]];
			ip += 4;
			break; 
			
		case 'findDivisor':
			if (mem[mem[ip + 1]] > mem[mem[ip + 2]]) {
				mem[mem[ip + 1]] -= mem[mem[ip + 2]];
			}
			else {
				mem[mem[ip + 2]] -= mem[mem[ip + 1]];
			}
			ip -= 3;
			break;
			
		case 'areEquel':
			if (mem[mem[ip + 1]] - mem[mem[ip + 2]] != 0) {
				ip += 3;
			}
			else {
				ip += 6;
			}
			break; 
			
		case 'isZero':
			if (mem[mem[ip + 1]] >= 1) {
				ip += 3;
			}
			else {
				ip = parseInt(mem[ip + 2], 10);
			}
			break;
			
		case 'multiply':
			mem[mem[ip + 2]] = mem[mem[ip + 1]] * mem[mem[ip + 2]];
			ip += 3;
			break;
			
		case 'substract':
			mem[mem[ip + 1]] -= 1;
			ip += 2;
			break;
			
		case 'repeatAlgorithm':
			ip = parseInt(mem[ip + 1], 10);
			break;
			
		case 'exit':
			flag = false;
	}
