// This sends a get request for the list of teams
// It will then create the HTML to display the table
// Lastly it will append the HTML onto the app

function loadTeamsList() {


  const Http = new XMLHttpRequest();
  const url='http://localhost:3000/teams';
  Http.open("GET", url); 
  Http.send();

  const teamCols = ["Ranking", "Name"];

  Http.onreadystatechange = function() {
    if (this.readyState==4 && this.status ==200) {
      let data = JSON.parse(Http.response);
      let div = document.createElement("div");
      let table = `
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
      
      for (let i = 0; i < data.length; i++) {
          table += `
            <tr>
              <th scope="row">${data[i].ranking}</th>
              <td onclick="singleTeam(this)">${data[i].team}</td>
              <td>${data[i].W}</td>
              <td>${data[i].L}</td>
              <td>${data[i].Conference}</td>
            </tr>
          `        
      }
      
      table += `
          </tbody>
        </table>
      `;


      div.innerHTML = table;
      let content = document.getElementById("content")
      content.innerHTML = table;
    }
  }
}

function singleTeam(event, id) {
  let team = event.innerHTML.split(">")[0]

  const Http = new XMLHttpRequest();
  const url='http://localhost:3000/teams/';
  Http.open("GET", url); 
  Http.send();


  Http.onreadystatechange = function() {
    if (this.readyState==4 && this.status ==200) {
      let data = JSON.parse(Http.response);
      let div = document.createElement("div");
      let teamData;
      for (let i = 0; i < data.length; i++) {
        if (data[i].team == team) 
          teamData = data[i]
      }
      
      let table = `
      <h5>${teamData.team}</h5>
      <p>Ranking: ${teamData.ranking}</p>
      <p>Conference: ${teamData.Conference}</p>
        <div>
        <table class=\"table teamtable\">
          <thead>
            <tr>
              <th scope="col">Stat</th>
              <th scope="col">Current Value</th>
            </tr>
          </thead>
          <tbody>
      `;

      for (const stat in teamData) {
        if (stat == "_id" || stat == "ranking" || stat == "team" || stat == "Conference"|| stat == "__v") continue
        table += `
        <tr>
          <th scope="row">${stat}</th>
          <th scope="row">${teamData[stat]}</th>
        </tr>
      `  
      }
      
      table += `
          </tbody>
        </table>
      `;




      div.innerHTML = table;
      let content = document.getElementById("content")
      content.innerHTML = table;
    }
  }
}