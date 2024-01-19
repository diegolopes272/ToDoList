//Creating simple task list (to do list):
//Its uses the localStorage to make the task list persistent
//Using JSON.parse, stringify and localStorage examples.

function localScope() {

    //select the used objects from html
    const inputTask = document.querySelector('.input-task');
    const btnAddTask = document.querySelector('.btn-add-task');
    const taskList = document.querySelector('.task-list');


    /*****************************************************/ 
    //general functions
    /*****************************************************/
    function clearInput() {
        inputTask.value = '';
        inputTask.focus();
    }

    function createDeleteButton(li) {
        li.innerText += ' ';
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        //could use classList.add but now using setAttribute
        deleteButton.setAttribute('class', 'delete');
        deleteButton.setAttribute('title', 'Delete this task');
        li.appendChild(deleteButton);
    }

    //create and add a new task
    function addTask (task) {
        const newLi = document.createElement('li');
        //console.log(`newTask:${newLi}`);  //object HTMLLIElement
        newLi.innerText = task;
        createDeleteButton(newLi);
        //lets add the li on ul
        taskList.appendChild(newLi);
        clearInput();
        saveTasksOnStorage();
    }


    /*****************************************************/
    //non volatile info functions
    /*****************************************************/
    function saveTasksOnStorage() {
        const actualList = taskList.querySelectorAll('li');
        const actualListArray = [];

        for(let task of actualList){
            let taskInfo = task.innerText;
            taskInfo = taskInfo.replace('Delete', '').trim();
            //console.log(taskInfo);
            actualListArray.push(taskInfo);
        }

        const tasksJSON = JSON.stringify(actualListArray);
        //save on brownser local storage
        localStorage.setItem('savedTasks', tasksJSON);
    }

    function loadTasksFromStorage() {
        const tasksJSON = localStorage.getItem('savedTasks');
        const actualListArray = JSON.parse(tasksJSON);

        if(actualListArray != null) {
            for (let task of actualListArray) {
                addTask(task);
            }
        }
    }


    /*****************************************************/
    //events
    /*****************************************************/
    //get enter from input
    inputTask.addEventListener('keypress', function(e) {
        //console.log(e); //bring all info
        if (e.keyCode === 13)  {
            if(!inputTask.value) return;
            addTask(inputTask.value);
        }
    });

    //btn event and get the task 
    btnAddTask.addEventListener('click', function() {
        if(!inputTask.value) return;
        addTask(inputTask.value);
    });

    //btn delete events (all objs on document)
    document.addEventListener('click', function(e){
        const element = e.target;
        //get only delete class
        if(element.classList.contains('delete')){
            //delete event parent
            element.parentElement.remove();
        }
        saveTasksOnStorage();
    });


    //load the saved tasks
    loadTasksFromStorage();

}

//avoid global scope
localScope();