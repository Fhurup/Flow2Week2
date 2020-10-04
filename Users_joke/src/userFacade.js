let url = "http://localhost:3333/api/users"

function getUsers(){
    return fetch(url)
    .then(handleHttpErrors)
};

function getUser(id){
    return fetch(url+`/${id}`)
        .then(handleHttpErrors)
};

function addUser(user){
    const options = makeOptions("POST", user)
    return fetch(url,options)
        .then(handleHttpErrors)
};

function editUser(user, id){
    const options = makeOptions("PUT", user)
    return fetch(url + `/${id}`,options)
        .then(handleHttpErrors)
};

function deleteUser(id){
    return fetch (url + `/${id}`,{ method : "DELETE"})
        .then(handleHttpErrors)

};

const userFacade = {
    getUsers,
    getUser,
    addUser,
    editUser,
    deleteUser
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
   

export default userFacade;