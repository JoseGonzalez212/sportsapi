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
  const url='http://localhost:3000/players';
  Http.open("GET", url); 
  Http.send();

  Http.onreadystatechange = function() {
    if (this.readyState==4 && this.status ==200) {
      let data = JSON.parse(Http.response);
      let div = document.createElement("div");
      data.sort((a, b) => parseInt(b.PTS) - parseInt(a.PTS))
    let table = `
    <div class="season-select">
      <h5>Top Players: Average Points Per Game</h5>
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
      
      for (let i = 0; i < 50; i++) {
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

      let content = document.getElementById("content")
      content.innerHTML = table;
    }
  }
}

function loadPlayersBlocks() {
  console.log("test")
  const Http = new XMLHttpRequest();
  const url='http://localhost:3000/players';
  Http.open("GET", url); 
  Http.send();

  Http.onreadystatechange = function() {
    if (this.readyState==4 && this.status ==200) {
      let data = JSON.parse(Http.response);
      let div = document.createElement("div");
      data.sort((a, b) => parseInt(b.ThreePM) - parseInt(a.ThreePM))

    let table = `
    <div class="season-select">
      <h5>Top Players: Three Points Made</h5>
        <table class=\"table teamtable gameTable\">
          <thead>
            <tr>
            <th scope="col"></th>
              <th scope="col">Name</th>
              <th scope="col">Team</th>
              <th scope="col">Three Points Made</th>
            </tr>
          </thead>
          <tbody id="gameRows">
      `;
      
      for (let i = 0; i < 50; i++) {
        table += `
          <tr>
          <td>${i + 1}</td>
            <td>${data[i].Player}</td>
            <td>${data[i].Team}</td>
            <td>${data[i].ThreePM}</td>
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
  const url='http://localhost:3000/players';
  Http.open("GET", url); 
  Http.send();

  Http.onreadystatechange = function() {
    if (this.readyState==4 && this.status ==200) {
      let data = JSON.parse(Http.response);
      let div = document.createElement("div");
      data.sort((a, b) => parseInt(b.FTM) - parseInt(a.FTM))
      let table = `
      <div class="season-select">
        <h5>Top Players: Free Throws Made</h5>
          <table class=\"table teamtable gameTable\">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Name</th>
                <th scope="col">Team</th>
                <th scope="col">Free Throws Made</th>
              </tr>
            </thead>
            <tbody id="gameRows">
        `;
        
        for (let i = 0; i < 50; i++) {
          table += `
            <tr>
            <td>${i + 1}</td>
            <td>${data[i].Player}</td>
            <td>${data[i].Team}</td>
              <td>${data[i].FTM}</td>
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