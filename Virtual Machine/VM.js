let fs = require ('fs');
let arg = process.argv;
let readline = require('readline-sync');

let text = fs.readFileSync(arg[2]);
text = text.toString();
let mem = new Array();
mem = text.split(/\r\n| /);
for (let i = 0; i < mem.length; i++)
	console.log(i, mem[i])

ip = 0;
let flag = true;
while (flag)
	switch(mem[ip]){
		case 'input':
			let value = readline.question("Write a number");
			mem[mem[ip+1]] = parseFloat(value);
			ip += 2;
			break;
			
		case 'set':
			console.log('setcmd');
			mem[mem[ip+1]] = parseFloat(mem[ip+2]);
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
			if (mem[mem[ip + 1]] != mem[mem[ip + 2]]) {
				ip += 3;
			}
			else {
				ip += 6;
			}
			break; 
			
		case 'isZero':
			if (mem[mem[ip + 1]] != 0) {
				ip += 3;
			}
			else {
				ip = parseFloat(mem[ip + 2]);
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
			ip = parseFloat(mem[ip + 1]);
			break;
			
		case 'exit':
			flag = false;
	}
