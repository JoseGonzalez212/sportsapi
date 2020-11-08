// This sends a get request for the list of teams
// It will then create the HTML to display the table
// Lastly it will append the HTML onto the app

function loadTeams() {

  let teams = [
    {
      name: "Rockets",
      location: "HOU",
      ranking: "1"
    }
  ]

  let teams1 = [
    {
      name: "Rockets",
      location: "HOU",
      ranking: "1"
    }
  ]


  const Http = new XMLHttpRequest();
  const url='http://localhost:3000/teams';
  Http.open("GET", url); 
  Http.send();

  const teamCols = ["Ranking", "Name"];

  Http.onreadystatechange = function() {
    if (this.readyState==4 && this.status ==200) {
      let data = JSON.parse(Http.response);
      let div = document.createElement("div");
      let east = []
      let west = []
      for (let i = 0; i < data.length; i++) {
        if (data[i].Conference == "Easter") {
          east.push(data[i])
        } else {
          west.push(data[i])
        }
      }

      teams = east
      teams1 = west
      let table = `
      <div class="teamWrapper">
        <div>
        <h5>Eastern Conference</h5>
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
      
      for (let i = 0; i < teams.length; i++) {
          table += `
            <tr>
              <th scope="row">${teams[i].ranking}</th>
              <td>${teams[i].team}</td>
              <td>${teams[i].W}</td>
              <td>${teams[i].L}</td>
              <td>${teams[i].Conference}</td>
            </tr>
          `        
      }
      
      // for (let i = 0; i < data.length; i++) {
      //   table += `
      //     <tr>
      //       <th scope="row">1</th>
      //       <td>${data[i].name}</td>
      //       <td>${data[i].location}</td>
      //     </tr>
      //   `
      // }

      table += `
          </tbody>
        </table>
        </div>
      `;


      table += `
      <div>
      <h5>Western Conference</h5>
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
    
    for (let i = 0; i < teams1.length; i++) {
        table += `
          <tr>
          <th scope="row">${teams1[i].ranking}</th>
          <td>${teams1[i].team}</td>
          <td>${teams1[i].W}</td>
          <td>${teams1[i].L}</td>
          <td>${teams1[i].Conference}</td>
          </tr>
        `        
    }
    
    // for (let i = 0; i < data.length; i++) {
    //   table += `
    //     <tr>
    //       <th scope="row">1</th>
    //       <td>${data[i].name}</td>
    //       <td>${data[i].location}</td>
    //     </tr>
    //   `
    // }

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