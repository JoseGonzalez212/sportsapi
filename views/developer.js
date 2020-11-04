function loadSignIn() {
  let div = document.createElement("div");

  let table = `
  <h3>Sign in or Create developer account</h3>
  <form onsubmit="return false">
    <div class="form-group">
      <label for="exampleInputEmail1">Username</label>
      <input type="" class="form-control" id="username" aria-describedby="emailHelp">
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input id="password" type="password" class="form-control" id="exampleInputPassword1">
    </div>
    <div class="form-group form-check">
      <input type="checkbox" class="form-check-input" id="isNewAccount">
      <label class="form-check-label" for="exampleCheck1">Create new account</label>
    </div>
    <div id="error"> </div>
    <button onclick="signIn()" type="submit" class="btn btn-primary">Submit</button>
  </form>
  `;
  
  div.innerHTML = table;
  let content = document.getElementById("content")
  content.innerHTML = table;

}

function signIn() {
  let isNewAccount = document.getElementById("isNewAccount").checked
  if (isNewAccount) {
    return createNewAccount()
  }

  const Http = new XMLHttpRequest();
  let username = document.getElementById("username").value
  let password = hashCode(document.getElementById("password").value)

  const url='http://localhost:3000/user/' + username;
  Http.open("GET", url); 
  Http.send();


  Http.onreadystatechange = function() {
    if (this.readyState==4 && this.status ==200) {
      let data = JSON.parse(Http.response);
      // check if password or no username match
      if (data.length == 0 || data[0].password != password) return signInFalied()

      // show api keys
      return showAPIKeys()
    }
  }
}

let hashCode = function(s){
  return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);              
}

function signInFalied() {
  let error = `
    <p>incorrect passsword</p>
  `;

  let content = document.getElementById("error")
  content.innerHTML = error;
}

function createNewAccount() {
  const Http = new XMLHttpRequest();
  let username = document.getElementById("username").value
  let password = hashCode(document.getElementById("password").value)

  const url='http://localhost:3000/user';
  Http.open("POST", url); 
  
  Http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  Http.send(JSON.stringify({
    "username": username,
    "password": password
  }));

  Http.onreadystatechange = function() {
    console.log(this.readyState)
    console.log("createNewAccount")
    if (this.readyState==4 && this.status ==201) {
      //let data = JSON.parse(Http.response);
      // check if password or no username match
      //if (data.length == 0 || data[0].password != password) return signInFalied()
      return showAPIKeys();

    }
  }
}

function showAPIKeys() {
  let username = document.getElementById("username").value
  let password = hashCode(document.getElementById("password").value)
  
  const Http = new XMLHttpRequest();
  const url='http://localhost:3000/apikey/' + username;
  Http.open("GET", url); 
  Http.send();

  Http.onreadystatechange = function() {
    if (this.readyState==4 && this.status ==200) {
      let data = JSON.parse(Http.response);

      let table = `
        <p id="usernamekey">${username} API keys: </p>
        <ul id="apikeylist" class="list-group">
      `;

      for (let i = 0; i < data.length; i++) {
        table += `<li class="list-group-item">${data[i]._id}</li>`;
      }
      table += `</ul>
      <button onclick="createNewAPIKey()" type="button" class="btn btn-primary">Create new API key</button>
      `
      
      let content = document.getElementById("content")
      content.innerHTML = table;
    }
  }
}

function createNewAPIKey() {
  let username = document.getElementById("usernamekey").innerHTML.replace(' API keys: ','');
  const Http = new XMLHttpRequest();
  const url='http://localhost:3000/apikey';
  Http.open("POST", url); 

  Http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  Http.send(JSON.stringify({
    "username": username
  }));

  Http.onreadystatechange = function() {
    if (this.readyState==4 && this.status ==201) {
      let data = JSON.parse(Http.response);
      let listAPI = document.getElementById("apikeylist")
      var ul = document.getElementById("apikeylist");
      var li = document.createElement("li");
      li.className = "list-group-item"
      li.appendChild(document.createTextNode(`${data._id}`));
      ul.appendChild(li);
      // let newItem = document.createElement("li")
      // var textnode = document.createTextNode(`${JSON.stringify(data)}`);         // Create a text node
      // newItem.appendChild(textnode);  

      // newItem.className = "list-group-item"
      // listAPI.appendChild(newItem)
    }
  }

}