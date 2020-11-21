let fs = require ('fs');
let arg = process.argv;
const readlineSync = require('readline-sync');

let text = fs.readFileSync(arg[2]);
text = text.toString();

let mem = new Array();
mem = text.split(/\s/);
for (let i = 0; i < mem.length; i++)
	console.log(i, mem[i])

ip = 0;
let flag = true;
while (flag)
	switch(mem[ip]){
		case 'input':
			let readline = require('readline-sync');
			let value = readline.question("Write number");
			mem[mem[ip+1]] = parseFloat(number);
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
			
		//НОД	
		case 'findDivisor':
				if (mem[mem[ip + 1]] > mem[mem[ip + 2]]) {
					mem[mem[ip + 1]] -= mem[mem[ip + 2]];
				}
				else {
					mem[mem[ip + 2]] -= mem[mem[ip + 1]];
				}
			ip += 3;
			break;
			
		case 'areEquel':
			if (mem[mem[ip + 1]] != mem[mem[ip + 2]]) {
				ip -= 3;
			}
			else {
				ip += 3;
			break; 
		
		//Факториал
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