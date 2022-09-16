function getAllTodo(){
  return document.querySelectorAll('#todoList > li')
}


function isMatch(liElement,searchTerm) {
  if(searchTerm ==='') return true;
  const titleElement = liElement.querySelector('p.todo__title')
  if(!titleElement) return false
  return titleElement.textContent.toLowerCase().includes(searchTerm.toLowerCase())
}

function searchTodo(searchTerm){
  const todoElementList = getAllTodo()

  for (const todoElement of todoElementList) {
     const needToshow = isMatch(todoElement,searchTerm)
     todoElement.hidden = !needToshow;
  }
}

function filterTodo(filterStatus){
  const todoElementList = getAllTodo()

  for (const todoElement of todoElementList) {
     const needToshow = filterStatus ==="all" || todoElement.dataset.status ===filterStatus;
     todoElement.hidden = !needToshow;
  }
}


function initSearchInput(){
  const searchInput = document.getElementById('searchTerm')
    
  searchInput.addEventListener('input',() =>{
   searchTodo(searchInput.value)
  })
}
function  initFilterStatus(){
  const filterSelect = document.getElementById('statusFilter')
  filterSelect.addEventListener('change', () =>{
    filterTodo(filterSelect.value)
    console.log('hehe',filterSelect.value)
  })
}


(()=>{
  initSearchInput()
  initFilterStatus()
})()