function createElementLi(todo) {
  //get lli roif render
  const tempalteTodo = document.getElementById('todoTemplate');
  const todoElement = tempalteTodo.content.firstElementChild.cloneNode(true);
  const divElement = todoElement.querySelector('.todo')
  const titleElement = todoElement.querySelector('.todo__title');
  titleElement.textContent = todo.title;

  //click
  const markAsDoneButton = todoElement.querySelector('button.mark-as-done');
  markAsDoneButton.addEventListener('click', () => {
    //
    const currentStatus = todoElement.dataset.status;
    const newStatus = currentStatus === 'pending' ? 'finish' : 'pending';
  ////
    const todoList = getTodoList();
    localStorage.setItem('todo_list',JSON.stringify(todoList))
    const index = todoList.findIndex(x => x.id === todo.id)

// update status
    todoList[index].status = newStatus
    todoElement.dataset.status = newStatus
    //update alert class
    const newAlertclass = currentStatus === 'pending' ? 'alert-success' : 'alert-secondary'
    divElement.classList.remove('alert-success','alert-secondary')
    divElement.classList.add(newAlertclass)




  });
  //click remove
  const removeAsDoneButton = todoElement.querySelector('.remove');
  removeAsDoneButton.addEventListener('click', () => {

    // save todo tren localtrage
    const todoList = getTodoList();
    console.log({todoList,removeId: todo.id})

    const newTodoList = todoList.filter(x => x.id != todo.id )
    localStorage.setItem('todo_list', JSON.stringify(newTodoList));


    //remove tren DOM
    todoElement.remove();
  });

  return todoElement;
}

function addLi(todoList) {
  //ham render
  const ulelement = document.getElementById('todoList');
  for (const todo of todoList) {
    const liElement = createElementLi(todo);
    ulelement.appendChild(liElement);
  }
}

function getTodoList() {
  //  ham bat loi json co ton tai k 
  try {
    return  todoList = JSON.parse(localStorage.getItem('todo_list'));// chuyen qua chuoi
  } catch  {
      return [];
  }
 
}

(() => {
  // const todoList = [
  //   { id: 1, title: 'Hello maay cuwng Hello maay cuwng', status: 'pending' },
  //   { id: 2, title: 'Hello hehe a', status: 'finish' },
  //   { id: 2, title: 'Hello doan a', status: 'finish' },
  //   { id: 3, title: 'Hello syyx b', status: 'pending' },
  // ];

  const todoList = getTodoList();
  addLi(todoList);
  createElementLi();
})();
