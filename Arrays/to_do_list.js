const todoList =[];
function addTodo(){
  const inputElement = document.querySelector('.js_name_input');
  const name = inputElement.value;
  console.log(name);
  todoList.push(name);
  console.log(todoList)
}