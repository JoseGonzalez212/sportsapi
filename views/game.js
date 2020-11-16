// This sends a get request for the list of teams
// It will then create the HTML to display the table
// Lastly it will append the HTML onto the app

let allGames;
let allGamesMaster;
let currentPlaceInGames = 25;

function loadGames() {
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
      allGamesMaster = data;
      allGames = []
      for (let i = 0; i < allGamesMaster.length; i++) {
        allGames.push(allGamesMaster[i])
      }
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
      <div id="gamesList">
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
      
      for (let i = 0; i < 25; i++) {
        let winner;
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
        </div>
        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center">
            <li class="page-item ">
              <a class="page-link" onclick="loadPrevGames(this)" href="#">Previous</a>
            </li>
            <li class="page-item">
              <a class="page-link" onclick="loadNextGames(this)" href="#">Next</a>
            </li>
          </ul>
        </nav>
      `;
      div.innerHTML = table;

      let content = document.getElementById("content")
      content.innerHTML = table;
    }
  }
}

function filterList(event) {
  let filterYear = event.innerHTML.substring(2, 4);
  // filter allGames array
  allGames = []
  for (let i = 0; i < allGamesMaster.length; i++) {

    if (allGamesMaster[i].GameDate !== undefined) {
      if (allGamesMaster[i].GameDate.split("/")[2] == filterYear)
        allGames.push(allGamesMaster[i])
    }
    
  }

  //allGames = allGames.filter(game => game.GameDate.split("/")[2] == filterYear)
  // re create table with this
  loadGamesFiltered()
}

// function filterList(event) {
//   let filterYear = event.innerHTML.substring(2, 4);

//   let gametable = document.getElementById("gameRows");
//   let gameRows = gametable.getElementsByTagName("tr")
//   for (let i = 0; i < gameRows.length; i++) {
//     let columns = gameRows[i].innerHTML + "";
//     let year = columns.split("<td")[2].split("/")[2].slice(0, -1)
//     if (filterYear == year) {
//       gameRows[i].style.display = ""
//     } else {
//       gameRows[i].style.display = "none"
//     }
//   }
// }

function loadGamesFiltered() {
  let table = `
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

console.log("loadGamesFiltered")
console.log(allGames)
currentPlaceInGames = 25;
let topMax = Math.min(currentPlaceInGames + 25, allGames.length)
for (let i = currentPlaceInGames; i < topMax; i++) {
  // console.log(i)
  // console.log(allGames[i])
  if (allGames[i] !== undefined) {
    let winner;
    if (allGames[i].WL == 'W') {
      winner = allGames[i].Team
    } else {
      winner = allGames[i].MatchUp.substr(7, 10)
    }
    table += `
      <tr>
        <td>${allGames[i].MatchUp}</td>
        <td class="gameDate" >${allGames[i].GameDate}</td>
        <td>${winner}</td>
        <td>${allGames[i].PTS}</td>
      </tr>
      `
    }
  }

  currentPlaceInGames += 25;

  table += `
      </tbody>
    </table>`

  let content = document.getElementById("gamesList")
  content.innerHTML = table;
}

// function filterTeam(event) {
//   let filterTeam = event.innerHTML
//   let gametable = document.getElementById("gameRows");
//   let gameRows = gametable.getElementsByTagName("tr")
//   for (let i = 0; i < gameRows.length; i++) {
//     let columns = gameRows[i].innerHTML + "";
//     let year = columns.split("<td")[1]
//     if (year.includes(filterTeam)) {
//       gameRows[i].style.display = ""
//     } else {
//       if (gameRows[i].style.display != "none")
//         gameRows[i].style.display = "none"
//     }
//   }
// }

function filterTeam(event) {
  let filterTeam = event.innerHTML
  // filter allGames array
  //allGames = []
  //console.log(allGames[0].Team)
  let newGames = []
  for (let i = 0; i < allGames.length; i++) {
    console.log(allGames[i].Team)
    if (allGames[i].Team == filterTeam)
      newGames.push(allGames[i])
  }
  allGames = newGames
  //allGames = allGames.filter(game => game.GameDate.split("/")[2] == filterYear)
  // re create table with this
  loadGamesFiltered()
}

function loadNextGames() {
  let table = `
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

for (let i = currentPlaceInGames; i < currentPlaceInGames + 25; i++) {
  let winner;
  if (allGames[i].WL == 'W') {
    winner = allGames[i].Team
  } else {
    winner = allGames[i].MatchUp.substr(7, 10)
  }
  table += `
    <tr>
      <td>${allGames[i].MatchUp}</td>
      <td class="gameDate" >${allGames[i].GameDate}</td>
      <td>${winner}</td>
      <td>${allGames[i].PTS}</td>
    </tr>
    `
  }

  currentPlaceInGames += 25;

  table += `
      </tbody>
    </table>`

  let content = document.getElementById("gamesList")
  content.innerHTML = table;
  
}

function loadPrevGames() {
  if (currentPlaceInGames == 25) return 
  let table = `
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
currentPlaceInGames -= 50;
for (let i = currentPlaceInGames; i < currentPlaceInGames + 25; i++) {
  let winner;
  if (allGames[i].WL == 'W') {
    winner = allGames[i].Team
  } else {
    winner = allGames[i].MatchUp.substr(7, 10)
  }
  table += `
    <tr>
      <td>${allGames[i].MatchUp}</td>
      <td class="gameDate" >${allGames[i].GameDate}</td>
      <td>${winner}</td>
      <td>${allGames[i].PTS}</td>
    </tr>
    `
  }

  currentPlaceInGames += 25;

  table += `
      </tbody>
    </table>`

  let content = document.getElementById("gamesList")
  content.innerHTML = table;
  
}