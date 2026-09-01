   const toDoList = [{
    name: "Buy groceries",
    dueDate: "",
  },{
    name: "Wash car",
    dueDate: "",
  }];
  function renderToDoList(){
    let todoListHTML = "";
    toDoList.forEach((toDoObject, i) => {
      const {name, dueDate} = toDoObject;
      const html = `<div>${name}</div>
      <div>${dueDate}</div>
      <button onclick="toDoList.splice(${i},1);
      renderToDoList()"
      class = "delete_todo_button js_delete_todo_button">
      Delete
      </button>`;
      todoListHTML += html;
    });
    document.querySelector('.js_todo_list').innerHTML = todoListHTML;
      }
      const todoAddButton = document.querySelector('.js_add_todo_button');
    todoAddButton.addEventListener('click', () => {
      addToDo();
    });

    const todoDeleteButton = document.querySelectorAll('.js_delete_todo_button')
    .forEach((todoDeleteButton, i) => {
      todoDeleteButton.addEventListener('click', () => {
        toDoList.splice(i, 1);
        renderToDoList();
      });
    });
  function addToDo(){
    const inputElement = document.querySelector('.js_name_input');
    const name = inputElement.value;
    const dateInputElement = document.querySelector('.js_date_input');
    const dueDate = dateInputElement.value;
    toDoList.push({
      name,
      dueDate
    });
    console.log(toDoList);
    inputElement.value = '';
    renderToDoList();
  }
  