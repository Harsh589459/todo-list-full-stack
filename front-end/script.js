
const endpoint = 'http://localhost:3007';


function addTodo() {

  const todoNameInput = document.getElementById('todoName');
  const descriptionInput = document.getElementById('description');

  const todoName = todoNameInput.value.trim();
  const description = descriptionInput.value.trim();

  if (!todoName || !description) {
    alert('Please enter both the todo name and description.');
    return;
  }

  // Send a POST request to the server to add the new todo using Axios
  axios.post(`${endpoint}/add`, { todoName, description })
    .then((res) => {
      console.log(res)
      todoNameInput.value = '';
      descriptionInput.value = '';      getTodo()

    })
    .catch(err => console.error('Error adding todo:', err));
}

function getTodo() {
  const remainingList = document.getElementById('remainingList');
  const doneList = document.getElementById('doneList');
  remainingList.innerHTML = '';
  doneList.innerHTML = '';  axios.get(`${endpoint}`).then((res) => {
    console.log(res.data)
    for(let i =0;i<res.data.length;i++){
      if(res.data[i].status==='remaining'){
    const remainingList = document.getElementById('remainingList');
    const newTodo = document.createElement('li');
    newTodo.innerHTML = `
        <strong>${res.data[i].name}:</strong> ${res.data[i].description}
        <button onclick=markAsDone(this,${res.data[i].id})>Done</button>
        <button onclick="deleteTodoItem(this,${res.data[i].id})">Delete</button>
      `;
    remainingList.appendChild(newTodo);
    }
    else{
      const doneItem = document.createElement('li');
      doneItem.innerHTML = `
        <strong>${res.data[i].name}:</strong> ${res.data[i].description}
        <button onclick="deleteTodoItem(this,${res.data[i].id})">Delete</button>
      `;
      const doneList = document.getElementById('doneList');
      doneList.appendChild(doneItem);

    }
    
  }
  })
 

}
getTodo();


function markAsDone(button,id) {
  const todoItem = button.parentNode;

  const endpoint = 'http://localhost:3007'
  axios.post(`${endpoint}/done`, { id })
    .then((res) => {
      getTodo();
     
    })
    .catch(err => console.error('Error marking todo as done:', err));
}

function deleteTodoItem(button,id) {
  
  axios.post(`${endpoint}/delete`, { id })
    .then((res) => {
      getTodo();
    })
    .catch(err => console.error('Error deleting todo:', err));
}
