// <div id="taskForm">
// <form id="newTask" method="POST">

const addNewTaskForm = `
<form action="" id="newTask" method="POST">
<div class="response">{{responseData}}</div>
<input type="text" name="taskTitle" id="taskTitle">
<label for="taskTitle">Task</label>
<p>
  <label>
    <input name="status" type="radio" value="Todo" checked />
    <span>To do</span>
  </label>
</p>
<p>
  <label>
    <input name="status" type="radio" value="Ongoing" />
    <span>Doing</span>
  </label>
</p>
<p>
  <label>
    <input name="status" type="radio" value="Completed" />
    <span>Completed</span>
  </label>
</p>
<select>
{{# each user}}
<option value="{{this.username}}">{{}}</option>
{{/each}}
</select>
<label>Assign a Team Member</label>
<input type="text" name="assignedUser" id="assignedUser">
<label for="assignedUser">Assign to Team Member</label>
<textarea name="description" id="description" cols="30" rows="10">Description</textarea>
<input type="number" name="weight" id="weight">
<label for="weight">Task Weight</label>
<button id="saveTask" type="submit" class="btn" name="saveTask">Save Task</button>
</form>
</div>`;

document.addEventListener(
    'DOMContentLoaded',
    () => {
        console.log('JS Imported');
    },
    false
);

// To handle side navBar -> Option('draggable')
document.addEventListener('DOMContentLoaded', function() {
    let elems = document.querySelectorAll('.sidenav');
    let instances = M.Sidenav.init(elems, 'draggable');
});

const projectDATA = new DATAHandler('http://localhost:3000');

let currentProjectId;
let responseData;
document.getElementById('projectTitle').onsubmit = function(event) {
    const inputTitle = document.querySelectorAll('#projectName')[0].value;
    event.preventDefault();
    projectDATA.postProjectTitle({ inputTitle: inputTitle }).then(response => {
        responseData = response.data;
        currentProjectId = response.data._id;
        console.log(currentProjectId, ':from script.js', response);
    });
    document.querySelectorAll('#newAddTask')[0].classList.toggle('disabled');
    document.querySelector('button[name="saveProjectTitle"]').style.display = 'none';
    // console.log(projectId);
};
document.getElementById('newAddTask').onclick = function() {
    document.getElementById('newAddTask').style.display = 'none';
    document.querySelector('#formContainer').innerHTML = addNewTaskForm;
    // document.querySelector('.response').innerHTML = 'test';
    document.getElementById('newTask').onsubmit = function(event) {
        event.preventDefault();
        let datalink = document.querySelector('#newTask').elements;
        let weightToSave = 1;
        if (datalink.weight.value < 1) {
            weightToSave = 1;
        } else {
            weightToSave = datalink.weight.value;
        }
        let formData = {
            taskTitle: datalink.taskTitle.value,
            assignedUser: datalink.assignedUser.value,
            description: datalink.description.value,
            weight: weightToSave,
            status: datalink.status.value,
            project: currentProjectId
        };
        projectDATA.postNewTask(formData);
        document.querySelector('#formContainer').innerHTML = '';
        document.querySelector('.created-tasks').innerHTML += `
        <p>Task Title: ${formData.taskTitle}</p>
        <p>Description: ${formData.description}</p>
        <p>Assigned To: ${formData.assignedUser}</p>
        <p>Weight: ${formData.weight}</p>
        <p>Status: ${formData.status}</p>`;
        document.getElementById('newAddTask').style.display = 'block';
        document.getElementById('saveProject').classList.remove('display-hide');
    };
};

// To display news category dropdown
$(document).ready(function() {
    $('select').formSelect();
});
