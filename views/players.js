// This sends a get request for the list of teams
// It will then create the HTML to display the table
// Lastly it will append the HTML onto the app

const player = [
  {
    Name: "Jose Gonzalez",
    Team: "Rockets",
    APG: "50"
  },
  {
    Name: "Jose Gonzalez",
    Team: "Rockets",
    APG: "50"
  },
  {
    Name: "Jose Gonzalez",
    Team: "Rockets",
    APG: "50"
  },
  {
    Name: "Jose Gonzalez",
    Team: "Rockets",
    APG: "50"
  }
]


function loadPlayersAPG() {
  console.log("test")
  const Http = new XMLHttpRequest();
  const url='http://localhost:3000/games';
  Http.open("GET", url); 
  Http.send();

  Http.onreadystatechange = function() {
    if (this.readyState==4 && this.status ==200) {
      let data = JSON.parse(Http.response);
      let div = document.createElement("div");

    let table = `
    <div class="season-select">
      <h5>Top Players: Average Points Per Game</h5>
        <table class=\"table teamtable gameTable\">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Team</th>
              <th scope="col">Avg Points Per Game</th>
            </tr>
          </thead>
          <tbody id="gameRows">
      `;
      
      for (let i = 0; i < player.length; i++) {
        table += `
          <tr>
            <td>${player[i].Name}</td>
            <td>${player[i].Team}</td>
            <td>${player[i].APG}</td>
          </tr>
        `
      }

      table += `
          </tbody>
        </table>
        </div>
      `;
      div.innerHTML = table;

      let content = document.getElementById("content")
      content.innerHTML = table;
    }
  }
}

function loadPlayersBlocks() {
  console.log("test")
  const Http = new XMLHttpRequest();
  const url='http://localhost:3000/games';
  Http.open("GET", url); 
  Http.send();

  Http.onreadystatechange = function() {
    if (this.readyState==4 && this.status ==200) {
      let data = JSON.parse(Http.response);
      let div = document.createElement("div");

    let table = `
    <div class="season-select">
      <h5>Top Players: Average Blocks Per Game</h5>
        <table class=\"table teamtable gameTable\">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Team</th>
              <th scope="col">Blocks Per Game</th>
            </tr>
          </thead>
          <tbody id="gameRows">
      `;
      
      for (let i = 0; i < player.length; i++) {
        table += `
          <tr>
            <td>${player[i].Name}</td>
            <td>${player[i].Team}</td>
            <td>${player[i].APG}</td>
          </tr>
        `
      }

      table += `
          </tbody>
        </table>
        </div>
      `;
      div.innerHTML = table;

      let content = document.getElementById("content")
      content.innerHTML = table;
    }
  }
}

function loadPlayersAPPG() {
  console.log("test")
  const Http = new XMLHttpRequest();
  const url='http://localhost:3000/games';
  Http.open("GET", url); 
  Http.send();

  Http.onreadystatechange = function() {
    if (this.readyState==4 && this.status ==200) {
      let data = JSON.parse(Http.response);
      let div = document.createElement("div");

    let table = `
    <div class="season-select">
      <h5>Top Players: Average Assists Per Game</h5>
        <table class=\"table teamtable gameTable\">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Team</th>
              <th scope="col">Assists Per Game</th>
            </tr>
          </thead>
          <tbody id="gameRows">
      `;
      
      for (let i = 0; i < player.length; i++) {
        table += `
          <tr>
            <td>${player[i].Name}</td>
            <td>${player[i].Team}</td>
            <td>${player[i].APG}</td>
          </tr>
        `
      }

      table += `
          </tbody>
        </table>
        </div>
      `;
      div.innerHTML = table;

      let content = document.getElementById("content")
      content.innerHTML = table;
    }
  }
}