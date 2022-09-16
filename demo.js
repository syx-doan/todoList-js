function createElementLi(todo) {
  //get lli roif render
  const tempalteTodo = document.getElementById('todoTemplate');
  const todoElement = tempalteTodo.content.firstElementChild.cloneNode(true);
  todoElement.dataset.id =todo.id;
  const divElement = todoElement.querySelector('.todo');
  const titleElement = todoElement.querySelector('.todo__title');
  titleElement.textContent = todo.title;
  
  todoElement.dataset.status = todo.status;
  

  //click
  const markAsDoneButton = todoElement.querySelector('button.mark-as-done');
  markAsDoneButton.addEventListener('click', () => {
    //
    const currentStatus = todoElement.dataset.status;
    const newStatus = currentStatus === 'pending' ? 'finish' : 'pending';
    ////
    const todoList = getTodoList();
    localStorage.setItem('todo_list', JSON.stringify(todoList));
    const index = todoList.findIndex((x) => x.id === todo.id);

    // update status
    todoList[index].status = newStatus;
    todoElement.dataset.status = newStatus;
    //update alert class
    const newAlertclass = currentStatus === 'pending' ? 'alert-success' : 'alert-secondary';
    divElement.classList.remove('alert-success', 'alert-secondary');
    divElement.classList.add(newAlertclass);
  });
  //click remove
  const removeAsDoneButton = todoElement.querySelector('.remove');
  removeAsDoneButton.addEventListener('click', () => {
    // save todo tren localtrage
    const todoList = getTodoList();

    const newTodoList = todoList.filter((x) => x.id != todo.id);
    localStorage.setItem('todo_list', JSON.stringify(newTodoList));

    //remove tren DOM
    todoElement.remove();
  });

  
  ///add eidt button
  const editBtn = todoElement.querySelector('button.edit');
  editBtn.addEventListener('click', () => {
    //đảm bảo todo là mới nhất
    const todoList = getTodoList();
    const latesTodo = todoList.find((x) => x.id === todo.id);

    populateTodo(latesTodo);
  });

  return todoElement;
}

function populateTodo(todo) {
  //set id
  const todoForm = document.getElementById('todoList');
  todoForm.dataset.id = todo.id;
 

  // value form coontrol
  //set todotext input
  const todoInput = document.getElementById('todoText');
  todoInput.value = todo.title;
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
    return (todoList = JSON.parse(localStorage.getItem('todo_list'))); // chuyen qua chuoi
  } catch {
    return [];
  }
}
function handleSubmitTodo(event) {
  event.preventDefault();

  const todoForm = document.getElementById('todoFormId');
  const todoInput = document.getElementById('todoText');
  // 
  const isEdit = Boolean(todoForm.dataset.id);
  
  if (isEdit) {
    
   
  //tim todo
  const todoList = getTodoList();
  const index = todoList.findIndex((x) => x.id.toString() === todoForm.dataset.id);
  // update content

  todoList[index].title = todoInput.value;
  // save
  localStorage.setItem('todo_list', JSON.stringify(todoList));
  //  apply vao dom
  // tìm li element có id = todoForm.dataset.id
  
  const liElement = document.querySelector(`ul#todoList > li[data-id="${todoForm.dataset.id}"]`);
  //tìm dduocj r thì sẽ cập nhập lại
    const titleElement = liElement.querySelector('.todo__title');

    titleElement.textContent = todoInput.value; 
  } else {
    ///tao new todo
    const newTodo = {id: Date.now(), title: todoInput.value, status: 'pending'  };

    //save
    const todoList = getTodoList();
    todoList.push(newTodo);
    localStorage.setItem('todo_list', JSON.stringify(todoList));

    //apply Dome change
    const newElement = createElementLi(newTodo);
    const ulElement = document.getElementById('todoList');
    ulElement.appendChild(newElement);
  }

  
  delete todoForm.dataset.id;
  //resetFrom
  todoForm.reset();
}


//IFE
(() => {
  const todoList = getTodoList();
  addLi(todoList);

  // /submit evevtnt
  const todoForm = document.getElementById('todoFormId');
  todoForm.addEventListener('submit', handleSubmitTodo);
})();


// 