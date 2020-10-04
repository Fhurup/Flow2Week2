import "./style.css"
import "bootstrap/dist/css/bootstrap.css"
import "./personFacade"
import personFacade from "./personFacade"


function makeTable(){
  personFacade.getAllPersons()
      .then(persons => {
        const allPersons = persons.all
        const tableData = allPersons.map(person => 
          `<tr>
          <td>${person.id}</td>
          <td>${person.fName}</td>
          <td>${person.lName}</td>
          <td>${person.phone}</td>
          <td>${person.street}</td>
          <td>${person.city}</td>
          <td>${person.zip}</td>
          </tr>`)
        const tableDataString = tableData.join("");
        document.getElementById("tbody").innerHTML = tableDataString
    })
    .catch(err =>{
      if(err.status){
        err.fullError.then(e => {
          document.getElementById("error").innerHTML = e.message;
        })
      }
      else{ console.log("Network error"); }
   })
  
  }
makeTable();

const reloadButton = document.getElementById("reload");
reloadButton.addEventListener('click', (event) =>{
  event.preventDefault();
  makeTable();
})

const addPersonButton = document.getElementById("addPerson");
  addPersonButton.addEventListener('click', (event) => {
  event.preventDefault();
  fName = document.getElementById("fName").value;
  lName = document.getElementById("lName").value;
  phone = document.getElementById("phone").value;
  street = document.getElementById("street").value;
  city = document.getElementById("city").value;
  zip = document.getElementById("zip").value;
  
  const person = {
    fName,
    lName,
    phone,
    street,
    city,
    zip
  }

  personFacade.addPerson(person)
  .then(() => {
    makeTable();
  })
  .catch(err =>{
    if(err.status){
      err.fullError.then(e=> console.log(e.detail))
    }
    else{ console.log("Network error"); }
 })
 
}
)
