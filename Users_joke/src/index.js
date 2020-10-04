import "./style.css"
import "bootstrap/dist/css/bootstrap.css"
import "./jokeFacade"
import "./userFacade"
import jokeFacade from "./jokeFacade"
import userFacade from "./userFacade"

/* 
  Add your JavaScript for all exercises Below or in separate js-files, which you must the import above
*/

/* JS For Exercise-1 below */

function makeListItem(){
const jokes = jokeFacade.getJokes();
let jokeList = jokes.map(joke => `<li>${joke}</li>`).join("")
document.getElementById("jokes").innerHTML = jokeList;
}
makeListItem();

const jokeIdButton = document.getElementById("jokeId");
jokeIdButton.addEventListener('click', (event) => {
  event.preventDefault()
  const jokeId = document.getElementById("getJoke")
  const joke = jokeFacade.getJokeById(jokeId.value);
  document.getElementById("singleJoke").innerHTML = joke;
});

const AddjokeButton = document.getElementById("AddJokes");
AddjokeButton.addEventListener('click', (event) => {
  event.preventDefault()
  const newJoke = document.getElementById("addNewJoke").value;
  jokeFacade.addJoke(newJoke);
  makeListItem();
});


/* JS For Exercise-2 below */
function getQoute(){
  let url = "https://studypoints.info/jokes/api/jokes/period/hour";
  fetch(url)
    .then(res => res.json())
    .then(data => {
      let qoute = data.joke;
      document.getElementById("fetchPlaceholder").innerHTML = qoute;
    })

}
setInterval(() => {
  getQoute();
}, 3600000);

let fetchButton = document.getElementById("fetch");
  fetchButton.addEventListener('click', (event) => {
  event.preventDefault();
  getQoute();
}
)


/* JS For Exercise-3 below */
function makeTable(){
  userFacade.getUsers()
    .then(users => {
      const tableData = users.map(user =>
        `<tr>
          <td>${user.id}</td>
          <td>${user.age}</td>
          <td>${user.name}</td>
          <td>${user.gender}</td>
          <td>${user.email}</td>
        </tr>`
      )
    const tableDataString = tableData.join("");
    document.getElementById("allUserRows").innerHTML = tableDataString;
})};
makeTable();

let addUserButton = document.getElementById("AddUser");
  addUserButton.addEventListener('click', (event) => {
  event.preventDefault();
  age = document.getElementById("age").value;
  name = document.getElementById("name").value;
  gender = document.getElementById("gender").value;
  email = document.getElementById("email").value;
  
  const newUser = {
    age: age,
    name : name,
    gender : gender,
    email : email
  }
  userFacade.addUser(newUser)
  .then(() => {
    makeTable();
  }) 
}
)

let editUserButton = document.getElementById("EditUser");
  editUserButton.addEventListener('click', (event) => {
  event.preventDefault();
  const id = document.getElementById("ID").value;
  age = document.getElementById("Eage").value;
  name = document.getElementById("Ename").value;
  gender = document.getElementById("Egender").value;
  email = document.getElementById("Eemail").value;
  
  const editedUser = {
    age: age,
    name : name,
    gender : gender,
    email : email
  }
  userFacade.editUser(editedUser, id)
  .then(() => {
    makeTable();
  }) 
}
)

let findUserButton = document.getElementById("findUser");
findUserButton.addEventListener('click', (event) => {
  event.preventDefault();
  const id = document.getElementById("Fid").value
  userFacade.getUser(id)
    .then(user => {
      let findUser = document.getElementById("singleUser");
      findUser.innerHTML = renderObjectToHTML(user);
    }
       
      )
}
)

function renderObjectToHTML(user) {
  const result = `
  id: ${user.id}<br>
  age: ${user.age}<br>
  name: ${user.name}<br>
  gender: ${user.gender}<br>
  email: ${user.email}<br>`
  return result;
}

let deleteUserButton = document.getElementById("deleteUser")
deleteUserButton.addEventListener('click', (event) => {
  event.preventDefault();
  const id = document.getElementById("Did").value;
  userFacade.deleteUser(id)
  .then(() => {
    makeTable();
  }) 
 
}
)

/* 
Do NOT focus on the code below, UNLESS you want to use this code for something different than
the Period2-week2-day3 Exercises
*/

function hideAllShowOne(idToShow) {
  document.getElementById("about_html").style = "display:none"
  document.getElementById("ex1_html").style = "display:none"
  document.getElementById("ex2_html").style = "display:none"
  document.getElementById("ex3_html").style = "display:none"
  document.getElementById(idToShow).style = "display:block"
}

function menuItemClicked(evt) {
  const id = evt.target.id;
  switch (id) {
    case "ex1": hideAllShowOne("ex1_html"); break
    case "ex2": hideAllShowOne("ex2_html"); break
    case "ex3": hideAllShowOne("ex3_html"); break
    default: hideAllShowOne("about_html"); break
  }
  evt.preventDefault();
}
document.getElementById("menu").onclick = menuItemClicked;
hideAllShowOne("about_html");



