// Initialize localStorage tasks
localStorageIsEmpty();
/* Grabbing values in array */
const taskForm = document.querySelector('#taskForm');
const taskList = document.querySelector('#taskList');
let TASKS = JSON.parse(localStorage.getItem('TASKS')); // Should return string of objects or empty

if (!localStorageIsEmpty()){
    readdTasks();
}

/* Event listeners */
taskForm.addEventListener('submit', function(event){
    event.preventDefault();

    let input = document.querySelector('input'); // checks input
    const removeButton = document.createElement('button');
    const task = document.createElement('li');

    // Add innerText and isCompleted to object and push to TASKS array to localstorage
    // const completed = event.target.parentElement.classList == 'completed'

    // push new object to array to localStorage
    TASKS.push({task: input.value, isCompleted: false});
    localStorage.setItem('TASKS', JSON.stringify(TASKS));

    // append to taskList
    removeButton.innerHTML = '&nbsp;Remove task';
    task.innerText = input.value;
    task.classList = 'task';
    task.append(removeButton);
    taskList.append(task);
    input.value = '';
});

taskList.addEventListener('click', function(event){
    const clickType = event.target.localName;
    if(clickType == 'button'){ // remove button
        removeFromTasks(event.target.parentElement.innerHTML.replace("<button>&nbsp;Remove task</button>", ""));
        event.target.parentElement.remove();
    }
    else if(clickType == 'li'){ 
        event.target.classList.toggle('completed');
        setToCompleted(event.target.innerHTML.replace("<button>&nbsp;Remove task</button>", ""));
    }
});

// Regular Functions

/* Checks if localStorage has TASKS, if doesn't, creates it */
function localStorageIsEmpty(){
    if(!localStorage.getItem('TASKS')){
        localStorage.setItem('TASKS', '[]');
        return true;
    }
    return false;
}

function readdTasks(){
    if (!(TASKS == [])){
        for (let obj of TASKS){
            let taskLi = document.createElement('li');
            let removeButton = document.createElement('button');
            removeButton.innerHTML = '&nbsp;Remove task';
            taskLi.innerText = obj.task;
            if (obj.isCompleted){
                taskLi.classList = 'task completed';
            }
            else{
                taskLi.classList = 'task';
            }
            taskLi.append(removeButton);
            taskList.append(taskLi);
        }
    }
}

function setToCompleted(mission){
    for(let obj of TASKS){
        if (obj.task == mission){
            obj.isCompleted = !(obj.isCompleted);
            localStorage.setItem('TASKS', JSON.stringify(TASKS));
            return;
        }
    }
}

function removeFromTasks(mission){
    let newTasks = [];
    for (let i = 0; i < TASKS.length; i++){
        if (TASKS[i].task != mission){
            newTasks.push(TASKS[i]);
        }
    }
    TASKS = newTasks;
    localStorage.setItem('TASKS', JSON.stringify(TASKS));
}