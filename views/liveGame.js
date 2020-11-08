// This sends a get request for the list of teams
// It will then create the HTML to display the table
// Lastly it will append the HTML onto the app

const LiveGames = [
  {
    "MatchUp": "Rockets VS Lakers",
    "GameDate": "11/8/2020",
    "Winner": "Rockets",
    "TeamAScore": "80",
    "TeamBScore": "80"
  },
  {
    "MatchUp": "Rockets VS Lakers",
    "GameDate": "11/8/2020",
    "Winner": "Rockets",
    "TeamAScore": "80",
    "TeamBScore": "80"
  },
  {
    "MatchUp": "Rockets VS Lakers",
    "GameDate": "11/8/2020",
    "Winner": "Rockets",
    "TeamAScore": "80",
    "TeamBScore": "80"
  }
]

function loadLiveGames() {


  const Http = new XMLHttpRequest();
  const url='http://localhost:3000/games/live';
  Http.open("GET", url); 
  Http.send();

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
              <th scope="col">MatchUp</th>
              <th scope="col">Game Date</th>
              <th scope="col">Predicted Winner</th>
              <th scope="col">Current Score</th>
            </tr>
          </thead>
          <tbody>
      `;
      
      for (let i = 1; i < data.length; i++) {
          table += `
            <tr>
              <th scope="row">${data[i].MatchUp}</th>
              <th scope="row">${data[i].GameDate}</th>
              <th scope="row">ATL</th>
              <th scope="row">${data[i].currentScore}</th>
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
