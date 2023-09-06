interface Task {
	id: number;
	title: string;
	createdAt: Date;
	complete?: boolean;
}

const form = document.querySelector<HTMLFormElement>('#form');
const input = document.querySelector<HTMLInputElement>('#title');
const list = document.querySelector<HTMLUListElement>('#list');

//JSON.parse메서드는 무조건 파라미터값으로 문자값만 들어올수 있도록 강제되어있음
//generic으로 타입을 지정할 수 없기 때문에 무조건 문자를 넣어야 하는데
//처음 로컬저장소에 값이 없기 때문에 undefined, null이 들어가게됨
//localStrogae에 null값이 반환되는 순간 배열을 문자화해서 대신 들어가도록 하면
//parse메서드 안쪽에는 문자값이 인수로 전달되서 오류를 피할 수 있음
let tasks: Task[] = JSON.parse(localStorage.getItem('TASKS') || '[]');
tasks.map((task) => addListItem(task));

//해당변수는 처음 스크립트가 로드될때 아직 돔이 담기지 않아 담기지 않았기 때문에 초기에 undefined가 들어감
//form 타입을 HTML노드 형태로 지정했기 때문에 해당 값이 없을때에는 무시하고 넘어가도록 optional chaing처리
form?.addEventListener('submit', (e) => {
	e.preventDefault();
	if (input?.value.trim() === '') return alert('할일을 입력하세요');
	const newTask: Task = {
		id: performance.now(),
		title: input?.value || '',
		createdAt: new Date(),
	};
	input && (input.value = '');
	tasks = [newTask, ...tasks];
	list && (list.innerHTML = '');
	localStorage.setItem('TASKS', JSON.stringify(tasks));
	tasks.map((task) => addListItem(task));
});

//해당함수의 파라미터에 넘어가는것이 객체이므로 해당 객체에 대한 interface타입 지정
function addListItem(task: Task) {
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
	list?.append(item);
}
