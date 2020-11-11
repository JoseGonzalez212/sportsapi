// This sends a get request for the list of teams
// It will then create the HTML to display the table
// Lastly it will append the HTML onto the app

function loadDraft() {


  const Http = new XMLHttpRequest();
  const url='http://localhost:3000/draft';
  Http.open("GET", url); 
  Http.send();

  Http.onreadystatechange = function() {
    if (this.readyState==4 && this.status ==200) {
      let data = JSON.parse(Http.response);
      let div = document.createElement("div");
      let table = `
      <div class="teamWrapper">
        <div>
        <h5>Picks for Draft</h5>
        <table class=\"table teamtable\">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Player</th>
              <th scope="col">Team</th>
              <th scope="col">GP</th>
              <th scope="col">FGM</th>
              <th scope="col">FG</th>
            </tr>
          </thead>
          <tbody>
      `;
      
      for (let i = 0; i < data.length; i++) {
          table += `
            <tr>
              <td>${i + 1}</td>
              <th scope="row">${data[i].Player}</th>
              <th scope="row">${data[i].Team}</th>
              <td>${data[i].GP}</td>
              <td>${data[i].FGM}</td>
              <td>${data[i].FG.substring(0, 4)}</td>
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