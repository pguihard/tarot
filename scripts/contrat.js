const preneur = JSON.parse(localStorage.getItem("preneur"))
console.log("score.js: Preneur sélectionné :", preneur);

const display1 = document.getElementById('preneur');
display1.innerHTML = `
  <h4>Preneur : ${preneur}</h4>
`;

const playerNames = JSON.parse(localStorage.getItem("playerNames")) || [];

const display2 = document.getElementById('petitaubout');
//Ajouter la possibilité de ne choisir aucun des joueurs

display2.innerHTML = `
  <h4>Qui a mené le petit au bout :</h4>
<form id="choixPreneur">
      <label>
        <input type="radio" name="petitaubout" value="" checked>
        Aucun
      </label>
    ${playerNames
      .map(
        (name) => `
            <label>
              <input type="radio" name="petitaubout" value="${name}">
              ${name}
            </label>
      `
      )
      .join('')}
 </form>
`;

function lireContrat() {
    // Récupère la prise sélectionné
    const prise = document.getElementById("prise").value;
    // Récupère le nombre de bouts
    var nbBouts = parseInt(document.getElementById("nbBouts").value, 10);
    // Vérification du nombre de bouts
    if (isNaN(nbBouts) || nbBouts < 0 || nbBouts > 3) {
        document.getElementById("resultat").innerHTML =
            "Erreur : le nombre de bouts doit être entre 0 et 3.";
        return;
    }
    // Récupère le nombre de points réalisés
    var nbPoints = parseInt(document.getElementById("nbPoints").value, 10);
    // Vérification du nombre de points
    if (isNaN(nbPoints) || nbPoints < 0 || nbPoints > 91) {
        document.getElementById("resultat").innerHTML =
            "Erreur : le nombre de points réalisés doit être entre 0 et 91.";
        return;
    }
    // Récupère le chelem sélectionné
    const chelem = document.getElementById("chelem").value;
    // Affiche le résultat
    document.getElementById("resultat").innerHTML =
            prise + ", " + nbBouts + " bouts, " + nbPoints + " points, chelem: " + chelem;

}    
