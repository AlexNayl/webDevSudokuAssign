let boardElement = document.getElementById('board');
let numberPalette = document.getElementById('numberPalette');

//For undo, format [x,y,prevNum] push when player adds to board, pop when they use the undo button
let moves = []

let currentSelection = -1;

let board = [
	[-1, 1, -1,			-1, -1, -1,		-1, 9, -1],
	[-1, -1, 4,			-1, -1, -1,		2, -1, -1],
	[-1, -1, 8,			-1, -1, 5,		-1, -1, -1],

	[-1, -1, -1,		-1, -1, -1,		-1, 3, -1],
	[2, -1, -1,			-1, 4, -1,		1, -1, -1],
	[-1, -1, -1,		-1, -1, -1,		-1, -1, -1],

	[-1, -1, 1,			8, -1, -1,		6, -1, -1],
	[-1, 3, -1,			-1, -1, -1,		-1, 8, -1],
	[-1, -1, 6,			-1, -1, -1,		-1, -1, -1]
]

//Checks is the given cell is conflicting with other cells
function isConflicting(x,y){
	let a = board[y][x];
	//Check row
	for(let i = 0; i < 9;i++){
		if (i != x){
			if (board[y][i] == a){
				return true
			}
		}
	}
	//check col
	for(let i = 0; i < 9;i++){
		if (i != y){
			if (board[i][x] == a){
				return true
			}
		}
	}
	//check block
	let firstRow = Math.floor(y / 3) * 3;
	let firstCol = Math.floor(x / 3) * 3;
	for (let i = firstRow; i <= firstRow + 2; i++){
		for (let j = firstCol; j <= firstCol + 2; j++){
			if (x != j || y != i){
				if (board[i][j] == a){
					return true
				}
			}
		}
	}

	return false
}

//Updates the board element to the board array
function drawBoard(){
	for (let y = 0; y < 9; y++){
		for (let x = 0; x < 9; x++){
			currentVal = board[y][x];
			cell = document.getElementById('cell'+y+x)
			cell.setAttribute('class','')	//clear any formating
			if(currentVal > 0){
				cell.innerText = currentVal;
				if(isConflicting(x,y)){
					cell.setAttribute('class','error')
				}
			}else{
				cell.innerText = ''
			}
		}
	}
}



window.onload = function(){

	let newTBody = document.createElement('tbody');
	boardElement.appendChild(newTBody);
	boardElement = newTBody;

	//Initialize 9 by 9 board of empty named cells
	for (let y = 0; y < 9; y++){
		let currentRow = document.createElement('tr');
		boardElement.appendChild(currentRow);
		for (let x = 0; x < 9; x++){
			let currentCell = document.createElement('td');
			currentCell.setAttribute('id','cell'+y+x);
			currentRow.appendChild(currentCell);
		}
	}

	drawBoard();
};

boardElement.onclick = function(){
	let e = window.event;
	let path = e.composedPath();
	let x = path[0].cellIndex;
	let y = path[1].rowIndex;

	//Make sure a number is selected first
	if(currentSelection > 0){
		//TODO: Prevent user from overwriting starter numbers
		let prevNum = board[y][x]
		board[y][x] = currentSelection;
		drawBoard()
		moves.push([x,y,prevNum])
		console.log(moves)
	}
}



numberPalette.onclick = function(){
	let e = window.event;
	let target = e.target;
	x = target.cellIndex;

	if(x < 9){
		//if the target is a number cell
		//remove formating from all cells
		let cells = numberPalette.getElementsByTagName('td');
		for ( let i = 0; i < cells.length; i++){
			cells[i].setAttribute('class', '');
		}
		//Apply formating to target
		target.setAttribute("class", "user-input");

		currentSelection = x + 1;
	}else{
		//Undo button pressed
		let move = moves.pop();

		x = move[0];
		y = move[1];
		prevValue = move[2];

		board[y][x] = prevValue;
		drawBoard();

	}
}