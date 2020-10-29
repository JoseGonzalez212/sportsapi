// This sends a get request for the list of teams
// It will then create the HTML to display the table
// Lastly it will append the HTML onto the app

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
      <table class=\"table teamtable\">
        <thead>
          <tr>
            <th scope="col">Ranking</th>
            <th scope="col">Name</th>
            <th scope="col">Location</th>
          </tr>
        </thead>
        <tbody>
    `;
    
    for (let i = 0; i < data.length; i++) {
      table += `
        <tr>
          <th scope="row">1</th>
          <td>${data[i].name}</td>
          <td>${data[i].location}</td>
        </tr>
      `
    }

    table += `
        </tbody>
      </table>
    `;
    div.innerHTML = table;
    let app = document.getElementById("app");
    app.appendChild(div);
  }
}