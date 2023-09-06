const form = document.querySelector('form');
const input = document.querySelector('#title');
const list = document.querySelector('#list');
let tasks = [];

//폼요소에 submit이벤트 연결
form.addEventListener('submit', (e) => {
	e.preventDefault();
	//input 요소에 값이 없으면 경고창 출력
	if (input.value.trim() === '') return alert('할일을 입력하세요');

	//값이 있으면 객체에 id, title, 현재시간을 객체로 저장
	const newTask = {
		id: performance.now(),
		title: input.value,
		createAt: new Date(),
	};
	//input요소 값을 비우고
	input.value = '';
	//console.log(newTask);
	//기존 배열에 할일 객체목록 추가
	tasks = [newTask, ...tasks];
	//tasks.push(newTask);
	console.log(tasks);
	//순간적으로 ul안쪽의 기존 목록을 모두 지우고
	list.innerHTML = '';
	//배열의 목록을 반복돌면서 새로운 리스트 생성
	tasks.map((task) => addListItem(task));
});

//객체를 파라미터로 받아서 li 목록을 동적으로 생성해주는 함수
function addListItem(task) {
	//li, input 엘리먼트 노드 생성
	const item = document.createElement('li');
	const checkbox = document.createElement('input');
	//input 노드에 checkbox
	checkbox.type = 'checkbox';
	//동적으로 생성되는 체크박스요소에 아예 이벤트핸들러까지 연결해서 생성
	//이벤트 위임을 하지 않아도 동적인요소에 이벤트 연결하는 방법
	checkbox.addEventListener('change', () => {
		tasks.complete = checkbox.checked;
		console.log(tasks);
	});
	//li노드에 자식으로 checkbox, 인수로 받은 객체의 할일내용 추가
	item.append(checkbox, task.title);
	//완성된 li노드를 ul안에 추가
	list.append(item);
}
