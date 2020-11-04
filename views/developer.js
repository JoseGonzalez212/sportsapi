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

