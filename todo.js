let todos = [];
let limit = 20;
// Fetch data from the API
function fetchData() {
  fetch("https://jsonplaceholder.typicode.com/todos")
    .then((response) => response.json())
    .then((data) => {
      todos = data;
      displayData(todos.slice(0, limit));
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}
// Display data in the table
function displayData(data) {
  let placeholder = document.querySelector("#data-output");
  let out = "";
  data.forEach((todo) => {
    out += `
                    <tr>
                        <td>${todo.id}</td>
                        <td>${todo.title}</td>
                        <td>${todo.completed}</td>
                        <td><button class="delete-button" onclick="deleteItem(${todo.id})">Delete</button></td>
                    </tr>
                `;
  });
  placeholder.innerHTML = out;
}
// Search data based on the title
function searchData() {
  let searchTerm = document.querySelector("#search-term").value.toLowerCase();
  let filteredData = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchTerm)
  );
  displayData(filteredData.slice(0, limit));
}
function setLimit() {
  let userInput = parseInt(document.querySelector("#limit").value);
  if (isNaN(userInput) || userInput <= 0) {
    alert("Please enter a valid positive number for the limit.");
    return;
  }

  limit = Math.min(userInput, todos.length);

  displayData(todos.slice(0, limit));
}
// Delete item
function deleteItem(itemId) {
  const index = todos.findIndex((todo) => todo.id === itemId);
  if (index !== -1) {
    todos.splice(index, 1);
    displayData(todos.slice(0, limit));
  }
}

fetchData();
