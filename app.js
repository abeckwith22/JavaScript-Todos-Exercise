/* NOTE: This File not in use made a first draft */

const form = document.querySelector('#add-todo-form');
const ul = document.querySelector('#todo-list');
if(!localStorage.getItem("TODO_LIST")){ // If localStorage was cleared set TODO LIST to empty and only if it doesn't exist
    localStorage.setItem('TODO_LIST', "[]");
}
const TODO_LIST = JSON.parse(localStorage.getItem('TODO_LIST')); // array

doSomething();

form.addEventListener("submit", function(event){
    event.preventDefault();
    const input = document.querySelector('input');
    const newli = document.createElement('li');
    const newRemoveButton = document.createElement('button');
    // solution: if event.target === "BUTTON" : code here

    if (input.value.trim() === ''){
        alert("Please add text to form! ");
    }
    else{
        // localStorage implementation
        TODO_LIST.push({task: input.value, });
        localStorage.setItem('TODO_LIST', JSON.stringify(TODO_LIST));

        newRemoveButton.innerText = "Remove task";
        newRemoveButton.classList += "remove-todo";
        newli.innerText = input.value;
        newli.classList = "todo";
        newli.append(newRemoveButton);
        ul.append(newli);
    }
    input.value = '';
});

ul.addEventListener("click", function(event){
    console.log(event.target);
    if (event.target.localName === "button"){ // if "Remove task" button is pressed
        console.log(event.target.parentElement.innerHTML);
        event.target.parentElement.remove();

    }
    else{
        event.target.classList.toggle('completed');
    }
});

function doSomething(){
    if(!(TODO_LIST == [])){
        for (let task of TODO_LIST){
            let oldli = document.createElement('li');
            let oldButton = document.createElement('button');
            oldButton.innerText = "Remove task";
            oldli.innerText = task;
            oldli.classList = "todo";
            oldli.append(oldButton);
            ul.append(oldli);
        }
    }
}


/* 
** Create array in localstorage
** access array
** push new element to array
** put updated array back into localStorage
** rinse and repeat
*/