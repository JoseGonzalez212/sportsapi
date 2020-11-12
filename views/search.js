
let allPlayers;
let allTeams;

function loadSearch() {

  const Http = new XMLHttpRequest();
  const url='http://localhost:3000/players';
  Http.open("GET", url); 
  Http.send();

  Http.onreadystatechange = function() {
    if (this.readyState==4 && this.status ==200) {
      let data = JSON.parse(Http.response);
      let div = document.createElement("div");
      allPlayers = data;
      let table = `
        <div>
        <h5>Search</h5>
        <input class="searchbox" type="" class="form-control" id="searchquery" aria-describedby="emailHelp">
        <div class="form-group form-check">
          <input type="checkbox" class="form-check-input" id="isTeams">
          <label class="form-check-label" for="exampleCheck1">Teams</label>
        </div>
        <div class="form-group form-check">
          <input type="checkbox" class="form-check-input" id="isPlayers">
          <label class="form-check-label" for="exampleCheck1">Players</label>
        </div>
        <button onclick="searchResults()" type="submit" class="btn btn-primary">Search</button>
        </div>
        <div id="searchResults">
        </div>
      `;

      getTeams()
      div.innerHTML = table;
      let content = document.getElementById("content")
      content.innerHTML = table;
    }
  }
}

function getTeams() {
  const Http = new XMLHttpRequest();
  const url='http://localhost:3000/teams';
  Http.open("GET", url); 
  Http.send();

  Http.onreadystatechange = function() {
    if (this.readyState==4 && this.status ==200) {
      let data = JSON.parse(Http.response);
      allTeams = data;
    }
  }
}

function searchResults() {
  let content = document.getElementById("searchResults")
  let query = document.getElementById("searchquery").value
  // content.innerHTML = allTeams;

  let table = "";
  let isTeams = document.getElementById("isTeams").checked
  let isPlayers = document.getElementById("isPlayers").checked

  if (isTeams) {
    table += `
    <h5>Team List</h5>
      <div>
      <table class=\"table teamtable\">
        <thead>
          <tr>
            <th scope="col">Ranking</th>
            <th scope="col">Team</th>
            <th scope="col">Wins</th>
            <th scope="col">Loses</th>
            <th scope="col">Conference</th>
          </tr>
        </thead>
        <tbody>
    `;
    
    for (let i = 0; i < allTeams.length; i++) {

        if (allTeams[i].team.includes(query) || allTeams[i].team == query) {
          table += `
            <tr>
              <th scope="row">${allTeams[i].ranking}</th>
              <td onclick="singleTeam(this)">${allTeams[i].team}</td>
              <td>${allTeams[i].W}</td>
              <td>${allTeams[i].L}</td>
              <td>${allTeams[i].Conference}</td>
            </tr>
          `
        }        
    }
    
    table += `
        </tbody>
      </table>
    `;
  }

  if (isPlayers) {
    table += `
    <div class="season-select">
      <h5>Players</h5>
        <table class=\"table teamtable gameTable\">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Name</th>
              <th scope="col">Team</th>
              <th scope="col">PTS</th>
              <th scope="col">FGM</th>
              <th scope="col">3PM</th>
              <th scope="col">FTM</th>
            </tr>
          </thead>
          <tbody id="gameRows">
      `;
      
      for (let i = 0; i < allPlayers.length; i++) {
        if (allPlayers[i].Player.includes(query)) {
          table += `
            <tr>
              <td>${i + 1}</td>
              <td>${allPlayers[i].Player}</td>
              <td>${allPlayers[i].Team}</td>
              <td>${allPlayers[i].PTS}</td>
              <td>${allPlayers[i].FGM}</td>
              <td>${allPlayers[i].ThreePM}</td>
              <td>${allPlayers[i].FTM}</td>
            </tr>
          `
        }
      }

      table += `
          </tbody>
        </table>
        </div>
      `;
  }
  content.innerHTML = table;

}