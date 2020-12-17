let fs = require('fs');
let arg = process.argv;
let text = fs.readFileSync(arg[2], 'utf8');

Perform();

function Perform(){
	WriteTable(BuildTree()[0], BuildTree()[1]);
	switch (arg[3]){
		case "Encode":
			console.log("Encoded string:", Encode(BuildTree()[0], BuildTree()[1]));
			break;
		case "Decode":
			console.log("Decoded string:", Decode(BuildTree()[0], BuildTree()[1]));
			break;
		default:
			console.log("Unknown command");
	}
}

function Node(letter, freq, used, parent, code){
	this.letter = letter;
	this.freq = freq;
	this.used = used;
	this.parent = parent;
	this.code = code;
}

function CreateAlph(){
	let alphabet = new Array();
	for(let i = 0; i < text.length; i++)
		alphabet [text.charAt(i)] = 0;
	for(let i = 0; i < text.length; i++)
		alphabet [text.charAt(i)]++;
	return alphabet;
}

function ChangeUsedNode(node, parent, code) {
    node.used = true;
    node.parent = parent;
    node.code = code;
}

function BuildTree(){
	let tree = new Array();
	for(i in CreateAlph()){
		let newNode = new Node(i, CreateAlph()[i], false, null, '');
		tree.push(newNode);
	}

	let treeLength = tree.length;
	for (let i = 0; i < treeLength - 1; i++){
		var firstMinInd, secondMinInd, firstMinFrequency, secondMinFrequency;
		firstMinInd = secondMinInd = -1;
		firstMinFrequency = secondMinFrequency = text.length;
		for(let j = 0; j < tree.length; j++){
			if((!tree[j].used) && (tree[j].freq <= firstMinFrequency))
			{
				secondMinInd = firstMinInd;
				firstMinInd = j;
				secondMinFrequency = firstMinFrequency;
				firstMinFrequency = tree[j].freq;
			}
			else if ((!tree[j].used) && (tree[j].freq <= secondMinFrequency))
			{
				secondMinInd = j;
				secondMinFrequency = tree[j].freq;
			}

		}
	ChangeUsedNode(tree[firstMinInd], tree.length, '0');
	ChangeUsedNode(tree[secondMinInd], tree.length, '1');
	let newNode = new Node(tree[secondMinInd].letter + tree[firstMinInd].letter, firstMinFrequency + secondMinFrequency, false, null, '');
	tree.push(newNode);
	}

	if (treeLength == 1)
		tree[0].code = '0';
	else
		for (let i = 0; i < treeLength; i++){
			let par = tree[tree[i].parent];
			while (par.parent != null){
				tree[i].code = par.code + tree[i].code;
				par = tree[par.parent];
			}
		}
	return [tree, treeLength];
}

function WriteTable(tree, treeLength){
	for (let i = 0; i < treeLength; i++)
		console.log(tree[i].letter + " : " + tree[i].code);
}

function Encode(tree, treeLength){
	let codedString = "";
	for (let i = 0; i < text.length; i++)
	{
		for (let j = 0; j < treeLength; j++)
		{
			if (text[i] == tree[j].letter)
			{
				codedString += tree[j].code;
				break;
			}
		}
	}
	return codedString;
}

function Decode(tree, treeLength){
	let decodedString = "";
	let symbols = "";
	let codedString = Encode(tree, treeLength);
	for (let i = 0; i < codedString.length; i++)
	{
		symbols += codedString[i];
		for (let j = 0; j < treeLength; j++)
		{
			if (symbols == tree[j].code)
			{
				decodedString += tree[j].letter;
				symbols = "";
				break;
			}
		}
	}
	return decodedString;
}