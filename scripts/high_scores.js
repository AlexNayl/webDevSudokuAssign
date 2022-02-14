let scoresTableElement = document.getElementById("scoresTable")

let data = [
	{"date": "2021/03/02", "duration": "2:51"},
	{"date": "2021/03/02", "duration": "2:51"},
	{"date": "2021/23/02", "duration": "2:51"},
	{"date": "2021/03/02", "duration": "2:53"},
	{"date": "2021/03/02", "duration": "2:51"}
]

window.onload = function(){

	let newTBody = document.createElement('tbody');
	scoresTableElement.appendChild(newTBody);
	scoresTableElement = newTBody;

	data.forEach(x => {
		let row = document.createElement('tr');
		let cell = document.createElement('td');
		cell.innerText = x['date'];
		row.appendChild(cell)
		cell = document.createElement('td');
		cell.innerText = x['duration'];
		row.appendChild(cell)
		scoresTableElement.appendChild(row);
	});
}