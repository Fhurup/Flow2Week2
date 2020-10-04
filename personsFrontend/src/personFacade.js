let url = "https://legepladss.dk/devops-starter/api/person/";


function getAllPersons(){
    return fetch(url + "all")
        .then(handleHttpErrors)
}
function getPerson(id){
    return fetch(url+ "{id}")
        .then(handleHttpErrors)
}

function addPerson(person){
    const options = makeOptions("POST", person)
    return fetch(url, options)
    .then(handleHttpErrors) 
}
function editPerson(person, id){

}
function deletePerson(id){

}

const personFacade = {
getAllPersons,
getPerson,
addPerson,
editPerson,
deletePerson
}

function makeOptions(method, body) {
    var opts =  {
      method: method,
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json"
      }
    }
    if(body){
      opts.body = JSON.stringify(body);
    }
    return opts;
   }

   function handleHttpErrors(res){
    if(!res.ok){
      return Promise.reject({status: res.status, fullError: res.json() })
    }
    return res.json();
   }

export default personFacade;

