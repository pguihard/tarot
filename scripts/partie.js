const playerNames = JSON.parse(localStorage.getItem("playerNames"));

const display = document.getElementById('players');
display.innerHTML = `
  <h4>Le preneur:</h4>
  <form id="choixPreneur">
    <ul>
      ${playerNames
        .map(
          (name) => `
            <li>
              <label>
                <input type="radio" name="preneur" value="${name}">
                ${name}
              </label>
            </li>`
        )
        .join('')}
    </ul>

    <button type="button" id="validerPreneur">Valider</button>
    <button type="button" id="finPartie">Fin et sauvegarde des scores</button>
  </form>
`;

// cas de 5 joueurs, fonction affichage du joueur appelé dans la division calledplayer
const calledPlayerDiv = document.getElementById('calledplayer');
const numberOfPlayers = playerNames.length;
if (numberOfPlayers === 5) {
    calledPlayerDiv.innerHTML = `
    <h4>Le joueur appelé:</h4>
    <form id="choixAppele">
      <ul>
        ${playerNames
          .map(
            (name) => `
              <li>
                <label>
                  <input type="radio" name="appele" value="${name}">
                  ${name}
                </label>
              </li>`
          )
          .join('')}
      </ul>
    </form>
  `;
};

document.getElementById("validerPreneur").addEventListener("click", () => {
  const form = document.getElementById("choixPreneur");
  const preneur = form.preneur.value;

  if (!preneur) {
    console.log("Pas de Preneur sélectionné :", preneur);
    return;
  }
  // Stockage des noms pour la prochaine page
  localStorage.setItem("preneur", JSON.stringify(preneur));
  localStorage.setItem("scores", JSON.stringify([]));

  window.location.href = "contrat.html";
});

// Affichage des scores
const scoresDiv = document.getElementById("scores");
const scoresTab = JSON.parse(localStorage.getItem("scoresTab")) || [];
let scoresHTML = "<h3>Scores actuels :</h3><table border='1'><tr><th>Manche</th>";
playerNames.forEach(name => {
  scoresHTML += `<th>${name}</th>`;
});
scoresHTML += "</tr>";

const rounds = {};
scoresTab.forEach(entry => {
    if (!rounds[entry.manche]) {
        rounds[entry.manche] = {};
    }
    rounds[entry.manche][entry.name] = entry.score;
});
for (const manche in rounds) {
    scoresHTML += `<tr><td>${manche}</td>`;
    playerNames.forEach(name => {
        scoresHTML += `<td>${rounds[manche][name] || 0}</td>`;
    });
    scoresHTML += "</tr>";
}
// Ajouter une dernière ligne pour les totaux
const totalScores = JSON.parse(localStorage.getItem("totalScores")) || [];
scoresHTML += `<tr><td>Total</td>`;
totalScores.forEach(total => {
    scoresHTML += `<td>${total}</td>`;
});
scoresHTML += "</tr>";

scoresHTML += "</table>";
scoresDiv.innerHTML = scoresHTML;
// finPartie 
document.getElementById("finPartie").addEventListener("click", () => {
  exportScoresToCSV();
  window.location.href = "../index.html";
});

function exportScoresToCSV() {
  const scores = JSON.parse(localStorage.getItem("scoresTab"));
  const playerNames = JSON.parse(localStorage.getItem("playerNames"));
  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += "Manche," + playerNames.join(",") + "\n";
  const rounds = {};
  scores.forEach(entry => {
      if (!rounds[entry.manche]) {
          rounds[entry.manche] = {};
      }
      rounds[entry.manche][entry.name] = entry.score;
  });
  for (const manche in rounds) {
      const row = [manche];
      playerNames.forEach(name => {
          row.push(rounds[manche][name] || 0);
      });
      csvContent += row.join(",") + "\n";
  }
  // Ajouter une dernière ligne au CSV qui est le totalScores
  const totalScores = JSON.parse(localStorage.getItem("totalScores"));
  csvContent += "Total," + totalScores.join(",") + "\n";
  //
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "scores_tarot.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
// finPartie