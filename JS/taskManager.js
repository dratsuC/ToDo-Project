'use strict';

let createTaskHtml = (
	id, name, description, assignedTo, status, dueDate
	) => {

	const html = 

		`
	    <li class="card card-layout" 
	    data-task-id="${id}">
	        <div class="card-header rounded">

	        <h5>Task Name: <small>${name}</small></h5> 
	        </div>
	        <div class="card-body">
	        <div class="card-text">
	            <div class="card-entry">Assigned to: <span>${assignedTo}</span></div>
	            <div class="card-entry">Due Date: <span>${dueDate}</span></div>
	            <div class="card-entry">Status: <span>${status}</span></div>               
	        </div>
	        <h5 class="card-title">
	            <strong>Description: </strong> <small>${description}</small>
	        </h5>	 
	        <div class='cardButtons'>
		        <button class=" cardDone btn btn-light taskComplete ${(status === 'Done')
		         ? 'invisible' : 'visible'}">
		        Done ✓
		        </button>     
		        <button class="cardDelete btn btn-light taskDelete">
		        Delete 🗑
		        </button>
	        </div>
	    </li>
		`

	return html;
}

class TaskManager {
	constructor(currentId = 0) {
		this.tasks = [];
		this.currentId = currentId;
	}
	addTask(name, description, assignedTo, status, dueDate) {
		
		const task = {
			id: this.currentId += 1,
			name: name,
			description,
			assignedTo,
			status,
			dueDate
		};
		console.log(this.tasks)
		this.tasks.push(task);
		console.log(this.tasks)

	}
	getTaskById(taskId) {
		let foundTask;
		for(let i = 0; i < this.tasks.length; i++) {
			let task = this.tasks[i];
			if (task.id === taskId) {
				foundTask = task;
			}
		}
		return foundTask;
	}	
	render() {
		let tasksHtmlList = [];
		for(let i = 0; i < this.tasks.length; i++) {
			let task = this.tasks[i];
			let date = new Date(task.dueDate);
			let doneCounter = 0;
			// checking for tasks which are done
			// console.log(task)
			// if (task.status === 'Done') {
			// 	doneCounter++
			// }

			let formattedDate = 
				`${date.getDate()}/${(date.getMonth() + 1)}/${date.getFullYear()}`;
			let taskHtml = createTaskHtml(
				task.id,
				task.name,
				task.description,
				task.assignedTo,
				task.status,
				formattedDate
				);
			// console.log(task);

			tasksHtmlList.push(taskHtml);
			// console.log(tasksHtmlList);
		}

		let tasksHtml = tasksHtmlList.join('\n');

		let tasksList = document.querySelector('#tasksList');
		tasksList.innerHTML = tasksHtml;
	}
	saveUser(userName) {
		// saving username to localstorage
		let userJson = userName;
		localStorage.setItem('username', userJson);	
	}

	save() {
		let tasksJson = JSON.stringify(this.tasks);
		// console.log(tasksJson);
		localStorage.setItem('tasks', tasksJson);
		let currentId = String(this.currentId);
		// console.log(currentId);
		localStorage.setItem('currentId', currentId);
	}
	load() {
		if(localStorage.getItem('username')) {
			let username = localStorage.getItem('username');
		}		
		if (localStorage.getItem('tasks')) {
			let tasksJson = localStorage.getItem('tasks');
			this.tasks = JSON.parse(tasksJson);
		}
		if(localStorage.getItem('currentId')) {
			let currentId = localStorage.getItem('currentId');
			this.currentId = Number(currentId);
		}
	}
	deleteTask(taskId) {
		let newTasks = [];
		for(let i = 0; i < this.tasks.length; i++) {
			const task = this.tasks[i];
			if(task.id != taskId) {
				newTasks.push(task);
				
			}
		}
		this.tasks = newTasks;
	}
};