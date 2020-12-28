//
//type: node dijkstra.js [text file's name]
//
let fs = require('fs');
let arg = process.argv;
let s = fs.readFileSync(arg[2], 'utf8');

let priority = [];
	priority['('] = 0;
	priority[')'] = 1;
	priority['+'] = 2;
	priority['-'] = 2;
	priority['*'] = 3;
	priority['/'] = 3;
	priority['^'] = 4;
let stack = [];
let result = '';

WriteResult(Build());

function WriteResult(stack){
	for (i = 0;i < stack.length; i++){
		Split();
		result += stack[stack.length - i - 1];
	}
	console.log(result);
}

function Split(){
	if (!isNaN(result[result.length - 1]))
		result += ',';
}

function Build(){
	for (i = 0; i < s.length; i++)
	{
		if (isNaN(s[i]) && s[i] != ')')
		{
			Split();
			if (stack.length == 0 || priority[s[i]] > priority[stack[stack.length - 1]] || s[i] == '(' || s[i] == '^')
				stack.push(s[i]);
			else if (priority[s[i]] <= priority[stack[stack.length - 1]]){
				if (s[i] != '(')
					result += stack[stack.length - 1];

				stack.pop();
				stack.push(s[i]);
			}
		}
		
		else if (s[i] == ')'){
			Split();
			if (stack[stack.length - 1] != '(' ){
				result += stack[stack.length - 1];
				stack.pop();
			}
			stack.pop();
		}
		
		else if (!isNaN(s[i])){
			result += s[i];
		}
	}
	return stack;
}
