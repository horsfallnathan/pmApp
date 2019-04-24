const addNewTaskForm = `<div id="taskForm">
<form action="" method="POST" id="newTask">
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
  <input type="text" name="assignedUser" id="assignedUser">
  <label for="assignedUser">Assign to Team Member</label>
  <textarea name="description" id="description" cols="30" rows="10">Description</textarea>
  <input type="number" id="weight">
  <label for="weight">Task Weight</label>
  <button id="newAddTask" class="btn" type="submit" name="saveTask">Save Task</button>
</form>
<button id="newAddTask" class="btn disabled">Add Task</button>
</div>`

document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("JS Imported")
  },
  false
)

// To handle side navBar -> Option('draggable')
document.addEventListener("DOMContentLoaded", function() {
  let elems = document.querySelectorAll(".sidenav")
  let instances = M.Sidenav.init(elems, "draggable")
})

const projectDATA = new DATAHandler("http://localhost:3000")

//Function to check if DOM is loaded
function r(f) {
  ;/in/.test(document.readyState) ? setTimeout("r(" + f + ")", 9) : f()
}

// Call DOM checking function and on success do get element...
r(function() {
  console.log("DOM Ready!")
  document.getElementById("projectTitle").onsubmit = function(event) {
    const inputTitle = document.querySelectorAll("#projectName")[0].value
    event.preventDefault()
    const newTitle = projectDATA.postProjectTitle(inputTitle).then(newTitle => {
      // document.querySelectorAll('#projectName')[0].value = newTitle;
    })
    document.querySelectorAll("#newAddTask")[0].classList.toggle("disabled")
  }
})

// To display news category dropdown
$(document).ready(function() {
  $("select").formSelect()
})
