const playerNames = JSON.parse(localStorage.getItem("playerNames")) || [];

const display = document.getElementById('players');
display.innerHTML = `
  <h2>Joueurs :</h2>
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

    <button type="button" id="validerPreneur">Valider le preneur</button>
  </form>
`;
document.getElementById("validerPreneur").addEventListener("click", () => {
  const form = document.getElementById("choixPreneur");
  const preneur = form.preneur.value;

  if (!preneur) {
    console.log("Pas de Preneur sélectionné :", preneur);
    return;
  }
  // Stockage des noms pour la prochaine page
  localStorage.setItem("preneur", JSON.stringify(preneur));

  window.location.href = "score.html";
});
