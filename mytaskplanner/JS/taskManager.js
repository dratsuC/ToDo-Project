'use strict';

let createTaskHtml = (
	id, name, description, assignedTo, status, dueDate
	) => {

	const html = `
	    <li class="card layout" data-task-id="${id}">
	        <div class="card-header rounded">

	        <h5>Task Name: <small>${name}</small></h5> 
	        </div>
	        <div class="card-body">
	        <h5 class="card-title">
	            <strong>Description: </strong> <small>${description}</small>
	        </h5>
	        <p class="card-text">
	            Assigned to: ${assignedTo}<br>
	            Due Date: ${dueDate}<br>
	            Status: ${status}<br>                
	        </p>
	        <label for="yes">  
	        <a class="btn btn-light area taskComplete DoneBtn" onclick = 'displayHidden()'>
	        Done
	        </a>     
	        <a class="btn btn-light area taskDelete">
	        Delete
	        </a>
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
		this.tasks.push(task);
		console.log(this.tasks)

	};
	getTaskById(taskId) {
		let foundTask;
		for(let i = 0; i < this.tasks.length; i++) {
			let task = this.tasks[i];
			if (task.id === taskId) {
				foundTask = task;
			}
		}
		return foundTask;
	};	
	render() {
		let tasksHtmlList = [];
		for(let i = 0; i < this.tasks.length; i++) {
			let task = this.tasks[i];
			let date = new Date(task.dueDate);

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
	};



}