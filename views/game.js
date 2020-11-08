// This sends a get request for the list of teams
// It will then create the HTML to display the table
// Lastly it will append the HTML onto the app
function loadGames() {
  console.log("test")
  const Http = new XMLHttpRequest();
  const url='http://localhost:3000/games';
  Http.open("GET", url); 
  Http.send();

  const teams = ["ATL",
    "BKN",
    "BOS",
    "CHA",
    "CHI",
    "CLE",
    "DAL",
    "DEN",
    "DET",
    "GSW",
    "HOU",
    "IND",
    "LAC",
    "LAL",
    "MEM",
    "MIA",
    "MIL",
    "MIN",
    "NOP",
    "NYK",
    "OKC",
    "ORL",
    "PHI",
    "PHX",
    "POR",
    "SAC",
    "SAS",
    "TOR",
    "UTA",
    "WAS"]

  Http.onreadystatechange = function() {
    if (this.readyState==4 && this.status ==200) {
      let data = JSON.parse(Http.response);
      let div = document.createElement("div");

      let table = `
      <h5>Season Game Data</h5>
      <div class="filter-menu"> 
        <div class="dropdown season-select">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Year
        </button>
        <div id="yearFilter" class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" href="#" onclick="filterList(this)">2020</a>
          <a class="dropdown-item" href="#" onclick="filterList(this)">2019</a>
          <a class="dropdown-item" href="#" onclick="filterList(this)">2018</a>
        </div>
        </div>
        <div class="dropdown season-select">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Team
        </button>
        <div id="yearFilter" class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    `
    for (let i = 0; i < teams.length; i++) {
      table += `<a class="dropdown-item" href="#" onclick="filterTeam(this)">${teams[i]}</a>`
    }

    table += `
        </div>
        </div>
      </div>

        <table class=\"table teamtable gameTable\">
          <thead>
            <tr>
              <th scope="col">Match Up</th>
              <th scope="col">Game Date</th>
              <th scope="col">Winner</th>
              <th scope="col">PTS</th>
            </tr>
          </thead>
          <tbody id="gameRows">
      `;
      
      for (let i = 0; i < 500; i++) {
        let winner;
        console.log(data[i])
        if (data[i].WL == 'W') {
          winner = data[i].Team
        } else {
          winner = data[i].MatchUp.substr(7, 10)
        }
        table += `
          <tr>
            <td>${data[i].MatchUp}</td>
            <td class="gameDate" >${data[i].GameDate}</td>
            <td>${winner}</td>
            <td>${data[i].PTS}</td>
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

function filterList(event) {
  let filterYear = event.innerHTML.substring(2, 4);

  let gametable = document.getElementById("gameRows");
  let gameRows = gametable.getElementsByTagName("tr")
  for (let i = 0; i < gameRows.length; i++) {
    let columns = gameRows[i].innerHTML + "";
    let year = columns.split("<td")[2].split("/")[2].slice(0, -1)
    if (filterYear == year) {
      gameRows[i].style.display = ""
    } else {
      gameRows[i].style.display = "none"
    }
  }
}

function filterTeam(event) {
  let filterTeam = event.innerHTML
  console.log(filterTeam)
  let gametable = document.getElementById("gameRows");
  let gameRows = gametable.getElementsByTagName("tr")
  for (let i = 0; i < gameRows.length; i++) {
    let columns = gameRows[i].innerHTML + "";
    let year = columns.split("<td")[1]
    console.log(columns.split("<td")[1])
    if (year.includes(filterTeam)) {
      gameRows[i].style.display = ""
    } else {
      if (gameRows[i].style.display != "none")
        gameRows[i].style.display = "none"
    }
  }
}