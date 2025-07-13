const input = document.getElementById('taskInput');
const addButton = document.getElementById('addTaskButton');
const clearButton = document.getElementById('clearTasksButton');
const taskList = document.getElementById('taskList');
const editor = document.getElementById('editorCont');
let editedTask = "";
const editedInput = document.getElementById('editedTask');
const editBtn = document.getElementById('editBtn');
function addTask() {
    task = input.value;
    if(task === '') {
        alert('Please enter a task.'); 
        return;
    }
    if(taskList.firstChild && taskList.firstChild.innerHTML === 'No tasks added yet.') { 
        taskList.innerHTML = '';
    }
    const li = document.createElement('li');
    li.textContent = task;
    const btnContainer = document.createElement('div');
    btnContainer.className = 'btnContainer';
    const deleteButton = document.createElement('button');
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'editButton';
    btnContainer.appendChild(editButton);
    deleteButton.textContent = 'Delete';    
    deleteButton.className = 'deleteButton';
    li.className = 'taskItem';
    btnContainer.appendChild(deleteButton);
    li.appendChild(btnContainer);
    taskList.appendChild(li);
    input.value = '';
    if(taskList.offsetHeight >= 450) {
        taskList.style.overflowY = 'auto';
    }
    editButton.addEventListener('click',()=> {
        editor.classList.add('show_editor');
        editedInput.value = li.textContent.replace('EditDelete', '').trim();

        let intervalId = setInterval(() => {
            if(editedTask != '' ) {
                li.textContent = editedTask;
                li.appendChild(btnContainer);
                editedTask = "";
                editor.classList.remove('show_editor');
                clearInterval(intervalId);
            }
        }, 150);
        
    })
    deleteButton.addEventListener('click', ()=> {
        li.classList.add('fadeOut')
        taskList.style.overflowX = 'hidden';
        if(taskList.children.length == 1) {
            taskList.style.overflow = 'hidden';
        }
        setTimeout(() => {
            li.remove();
            checkTasks();
        }, 250);
    })
}

editBtn.addEventListener('click', () =>{
     if(editedInput.value === '') {
        alert('Please enter a task to edit.');
        return;
     }
        editedTask = editedInput.value;
        editedInput.value = '';
})

addButton.addEventListener('click', addTask);
input.addEventListener('keypress', (e) => {
    if(e.key == 'Enter') {
        addTask()
    }
})
editor.addEventListener('click', (e) => {
    if(e.target === editor) {
        editor.classList.remove('show_editor');
        editedInput.value = '';
    }
})
function checkTasks() {
    if(taskList.children.length <= 0) {
        const li = document.createElement('li');
        li.textContent = 'No tasks added yet.';
        li.style.height = '50px'
        taskList.appendChild(li);
    }
}


clearButton.addEventListener('click', () => {
    taskList.innerHTML = '';
    checkTasks();
});

