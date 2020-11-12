// This sends a get request for the list of teams
// It will then create the HTML to display the table
// Lastly it will append the HTML onto the app

const teamsName = {
  "ATL": "Atlanta Hawks",
  "BKN": "Brooklyn Nets",
  "BOS": "Boston Celtics",
  "CHA": "Charlotte Hornets",
  "CHI": "Chicago Bulls",
  "CLE": "Cleveland Cavaliers",
  "DAL": "Dallas Mavericks",
  "DEN": "Denver Nuggets",
  "DET": "Detroit Pistons",
  "GSW": "Golden State Warriors",
  "HOU": "Houston Rockets",
  "IND": "Indiana Pacers",
  "LAC": "LA Clippers",
  "LAL": "Los Angeles Lakers",
  "MEM": "Memphis Grizzlies",
  "MIA": "Miami Heat",
  "MIL": "Milwaukee Bucks",
  "MIN": "Minnesota Timberwolves",
  "NOP": "New Orleans Pelicans",
  "NYK": "New York Knicks",
  "OKC": "Oklahoma City Thunder",
  "ORL": "Orlando Magic",
  "PHI": "Philadelphia 76ers",
  "PHX": "Phoenix Suns",
  "POR": "Portland Trail Blazers",
  "SAC": "Sacramento Kings",
  "SAS": "San Antonio Spurs",
  "TOR": "Toronto Raptors",
  "UTA": "Utah Jazz",
  "WAS": "Washington Wizards"
}
  

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
      <div id="team-players-list"> </div>
      <h5>Team stats</h5>
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
      loadPlayerTeam(team)
    }
  }
}

function loadPlayerTeam(team) {
  console.log("test")
  let realTeam;
  const Http = new XMLHttpRequest();
  for (const key in teamsName) {
    if (teamsName[key] == team) {
        realTeam = key
    }
  }
  console.log(realTeam)
  const url='http://localhost:3000/players/' + realTeam;
  Http.open("GET", url); 
  Http.send();

  Http.onreadystatechange = function() {
    if (this.readyState==4 && this.status ==200) {
      let data = JSON.parse(Http.response);
      let div = document.createElement("div");
      data.sort((a, b) => parseInt(b.PTS) - parseInt(a.PTS))
      console.log(data)
    let table = `
    <div class="season-select">
      <h5>Top Players</h5>
        <table class=\"table teamtable gameTable\">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Name</th>
              <th scope="col">Team</th>
              <th scope="col">Avg Points Per Game</th>
            </tr>
          </thead>
          <tbody id="gameRows">
      `;
      
      for (let i = 0; i < 5; i++) {
        table += `
          <tr>
            <td>${i + 1}</td>
            <td>${data[i].Player}</td>
            <td>${data[i].Team}</td>
            <td>${data[i].PTS}</td>
          </tr>
        `
      }

      table += `
          </tbody>
        </table>
        </div>
      `;
      div.innerHTML = table;

      let content = document.getElementById("team-players-list")
      content.innerHTML += table;
    }
  }
}
