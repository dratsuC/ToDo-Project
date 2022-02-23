'use strict';

// object for storing tasks
const taskManager = new TaskManager(0);
if (!localStorage.getItem('username')) {
	let userName = prompt('Please enter your name: ');
	taskManager.saveUser(userName);
}
taskManager.load();
taskManager.render();


/* -----------------------------
// 	DATE DISPLAY FUNCTION	//
----------------------------- */ 

// defining current date, 
// and appending it to '#date' HTML element



let d = new Date().toLocaleDateString('en-us', { 
	weekday:"long", year:"numeric", month:"short", day:"numeric"});



let displayDate = () => {
	try {
		let userName = localStorage.getItem('username')
		let displayD = document.querySelector("#date");
		displayD.innerHTML = `
		<div class="welcomeDiv"><p>Welcome 
		<strong id="userName">${userName}</strong>! </p></div>
		<div class="welcomeDiv">${d}.</div>
		`;			
	} catch(error) {
		console.log('Uh oh, something went oopsie!')
		console.log(error)
	}
}


/////////////////////////////////////////////
// FUNCTION FOR CLEARING HTML CLASSES //
/////////////////////////////////////////////
let clearForm = () => {
	addName.value = '';
	addDescription.value = '';
	addAssignedTo.value = '';
	addStatus.value = 'Pick an option ↴';
	addDate.value = '';
	addName.classList.remove("is-valid");
    addDescription.classList.remove("is-valid");
    addAssignedTo.classList.remove("is-valid");
    addStatus.classList.remove("is-valid");
   	addDate.classList.remove("is-valid");
}

//calling date function
displayDate();


/* ------------------------------/
// 	FORM VALIDATION	//
/----------------------------- */ 


let form = document.querySelector('#addTask');



/////////////////////////////////////////////
// VALIDATION FOR 'ADD NEW FORM' MODAL WINDOW//
/////////////////////////////////////////////
form.addEventListener('submit', (event) => {

	// counter for checking if any invalid inputs were given
	let invalidCounter = 0;
	let editInvalidCounter = 0;
	// submit button
	let addButton = document.querySelector('#addSubmit');
	// grabbing add task inputs 
	const addName = document.querySelector('#addName');
	const addDescription = document.querySelector('#addDescription');
	const addAssignedTo = document.querySelector('#addAssignedTo')
	const addStatus = document.querySelector('#addStatus');
	const addDate = document.querySelector('#addDate');



	event.preventDefault();

	// console.log("Task Name :" + addName.value);
	// console.log("Task Description :" + addDescription.value);
	// console.log("Task Assigned To :" + addAssignedTo.value);
	// console.log("Task Due Date :" + addDate.value);
	// console.log("Task Status:" + addStatus.value);	


	try {
		invalidCounter = 0;

		if (addName.value.length >= 5) {
			addName.classList.add('is-valid');
			addName.classList.remove('is-invalid');
		} else {
			addName.classList.remove('is-valid');
			addName.classList.add('is-invalid');
			invalidCounter++
		}
		if (addDescription.value.length >= 5 ) {
			addDescription.classList.add('is-valid');
			addDescription.classList.remove('is-invalid');
		} else {
			addDescription.classList.remove('is-valid');
			addDescription.classList.add('is-invalid');
			invalidCounter++
		}
		if (addAssignedTo.value.length >= 5 ) {
			addAssignedTo.classList.add('is-valid');
			addAssignedTo.classList.remove('is-invalid');
		} else {
			addAssignedTo.classList.remove('is-valid');
			addAssignedTo.classList.add('is-invalid');
			invalidCounter++
		}
		if (addStatus.value !== 'Pick an option ↴') {
			addStatus.classList.add('is-valid');
			addStatus.classList.remove('is-invalid');
		} else {
			addStatus.classList.remove('is-valid');
			addStatus.classList.add('is-invalid');
			invalidCounter++
		}

		// DATE LOGIC

		// Counter for spotting invalid dates
		let dateCounter = 0;

		// Current date
		let todaysDate = new Date(Date.now());

		// Formatting current date
		const year = todaysDate.getFullYear().toString();
		const month = (todaysDate.getMonth() + 1).toString();
		const date = todaysDate.getDate();		

		// Date given by user
		let userDate = new Date(addDate.value);

		// Formatting date given by user
		const formattedYear = userDate.getFullYear().toString();
		const formattedMonth = (userDate.getMonth() + 1).toString();
		const formattedDate = userDate.getDate();

		// console.log(todaysDate);
		// console.log(formattedYear, formattedMonth, formattedDate);
		// console.log(userDate);
		if (addDate.value) {
			if (formattedYear >= year && formattedMonth === month) {
			if(formattedDate >= date) {
			dateCounter = 0 
			} else {dateCounter++}
			} else if (formattedYear >= year && formattedMonth > month) {
				dateCounter = 0
			} else {dateCounter++}	
		} else {dateCounter++}


			//if the counter is empty, the user 
			// inputted a good date		
		if (!dateCounter) {
			addDate.classList.add('is-valid');
			addDate.classList.remove('is-invalid');
		} else {
			addDate.classList.remove('is-valid');
			addDate.classList.add('is-invalid');
			invalidCounter++
		}
		//end of date logic


		// evaluate invalidCounter to check for 
		// invalid inputs
		if (invalidCounter === 0) {
			// Pass form inputs to object
			// addTask method
			taskManager.addTask(
				addName.value,
				addDescription.value,
				addAssignedTo.value,
				addStatus.value,
				addDate.value)
			// clear inputs ready for next
			// task creation
			console.log('Task form submitted')
			clearForm();
			taskManager.render();
			taskManager.save();	


		} else {
			invalidCounter = 0;
			return;
		}


	} catch(error) {
		console.log('Something went wrong. Please read.')
		console.log(error)
	}
})

// tasks list event listener
let tasks_list = document.querySelector('#tasksList');

tasks_list.addEventListener('click', (event) => {
	if (event.target.classList.contains('taskComplete')) {
		const parentTask = event.target.parentElement.parentElement.parentElement;
		let taskId = Number(parentTask.dataset.taskId);
		let task = taskManager.getTaskById(taskId);
		task.status = 'Done';
		// console.log(task);
		// event.target.classList.add('d-none')
		// console.log(event.target);
		// event.target.style.color="red";
		// ${(status === 'In progress') ? ('') : 'invisible'};
		// displayHidden()
		taskManager.render();
		taskManager.save();	
	} 
	if (event.target.classList.contains('taskDelete')) {
		const parentTask = event.target.parentElement.parentElement.parentElement;
		let taskId = Number(parentTask.dataset.taskId);
		let task = taskManager.getTaskById(taskId);
		taskManager.deleteTask(taskId)
		taskManager.render();
		taskManager.save();		
	} 

});


// Event listener for 'reset' modal button
let resetButton = document.querySelector('#addReset')
resetButton.addEventListener('click', () => {
	clearForm();
	console.log('Task form reset')
});



// functions
// function displayHidden() {
// 	// document.querySelector('.taskComplete').style.backgroundColor = 'black';
// 	let x = document.querySelector(".taskComplete");
// 	// console.log(x)
// 	if (x.style.display === "none") {
// 	x.style.display = "block";
// 	} else {
// 	x.style.display = "none";
// 	}

// }

// console.log(tasks_list);



// USERNAME ADDING



