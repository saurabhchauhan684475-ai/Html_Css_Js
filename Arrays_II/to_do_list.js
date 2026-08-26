   const toDoList = [{
    name: "Buy groceries",
    dueDate: "",
  },{
    name: "Wash car",
    dueDate: "",
  }];
  function renderToDoList(){
    let todoListHTML = "";
    for(let i=0;i<toDoList.length;i++){
      const todoListObject = toDoList[i];
      const name = todoListObject.name;
      const dueDate = todoListObject.dueDate;
      const html = `<div>${name}</div>
      <div>${dueDate}</div>
      <button onclick="toDoList.splice(${i},1);
      renderToDoList()"
      class = "delete_todo_button">
      Delete
      </button>`;
      todoListHTML += html;
    }
    document.querySelector('.js_todo_list').innerHTML = todoListHTML;
  }
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
  