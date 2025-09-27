/*globals DOMPurify*/ 
//==================
// Variables
//==================
const todolist = document.querySelector('.todolist')
const taskList = todolist.querySelector('.todolist__tasks')

//==================
//Functions
//==================
/**
 * Generate a Unique String
 * @param {Number} length  - length of string
 * @returns {string}
 */
function generateUniqueString(length) {
    return Math.random()
    .toString(36)
    .substring(2, 2 + length)
}

/**
 * Create the task element
 * @param {String} taskname - Task (i.e. inputValue)
 * @return {HTMLElement}
 */
function makeTaskElement(taskname) {
    const uniqueID = generateUniqueString(10) //generate a unique string
    const taskElement = document.createElement('li') // create the task element
    taskElement.classList.add('task') //add the class name
    //sanitize and populate the task's innerHTML, pass in the input value and unique id
    taskElement.innerHTML = DOMPurify.sanitize(` 
              <input type="checkbox" id="${uniqueID}"/>
                <label for="${uniqueID}">
                    <svg viewBox="0 0 20 20" width="1em" height="1em">
                        <path d="M0 8l2-2 5 5L18 0l2 2L7 15z" fill-rule="nonzero" />
                    </svg>
                </label>
                <span class="task__name">${taskname}</span>
                <button type="button" class="task__delete-button">
                    <svg viewBox="0 0 20 20" width="1em" height="1em">
                        <path
                        d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"
                        fill="currentColor"
                        />
                    </svg>
                </button>
    ` )
    return taskElement
}

//==================
// Event Listeners (Execution)
// =================
//Adding a task to the DOM
todolist.addEventListener('submit', e => {
    e.preventDefault()  //prevent submit behavior
    
    //Get what the user typed
    const newTaskField = todolist.querySelector('input') //select the input field
    const inputValue = newTaskField.value.trim() //grab the input value and remove extra whitespace

    //Clear the new task field
    newTaskField.value = ''

    //Bring focus back to the input field
    newTaskField.focus()

    //Prevent adding of empty field
    if (!inputValue) return

    //Create task element
    const taskElement = makeTaskElement(inputValue) 

    //Append to the DOOM
    taskList.appendChild(taskElement) //add task element to the UL
})

//Deleting a task from the DOM
taskList.addEventListener('click', e => {
    // console.log(e.target)
    //return, if not the delete button
    if(!e.target.matches('.task__delete-button')) return

    //Removes the task
    const taskDiv = e.target.parentElement
    taskList.removeChild(taskDiv)

    //Triggers empty state
    if (taskList.children.length === 0) taskList.innerHTML = ''
})
