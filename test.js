const form = document.querySelector('#form');
const input = document.querySelector('#title');
const list = document.querySelector('#list');

let tasks = JSON.parse(localStorage.getItem('TASKS')) || [];
tasks.map((task) => addListItem(task));

form.addEventListener('submit', (e) => {
	e.preventDefault();
	if (input.value.trim() === '') return alert('할일을 입력하세요');
	const newTask = {
		id: performance.now(),
		title: input.value,
		createdAt: new Date(),
	};
	input.value = '';
	tasks = [newTask, ...tasks];
	list.innerHTML = '';
	localStorage.setItem('TASKS', JSON.stringify(tasks));
	tasks.map((task) => addListItem(task));
});

function addListItem(task) {
	const item = document.createElement('li');
	const checkbox = document.createElement('input');
	checkbox.type = 'checkbox';
	checkbox.checked = task.complete ? true : false;
	item.style.textDecoration = task.complete ? 'line-through' : 'none';

	checkbox.addEventListener('change', () => {
		task.complete = checkbox.checked;
		item.style.textDecoration = task.complete ? 'line-through' : 'none';
		localStorage.setItem('TASKS', JSON.stringify(tasks));
	});

	item.append(checkbox, task.title);
	list.append(item);
}
