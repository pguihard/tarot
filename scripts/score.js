const preneur = JSON.parse(localStorage.getItem("preneur"))
console.log("score.js: Preneur sélectionné :", preneur);

const display = document.getElementById('preneur');
display.innerHTML = `
  <h2>Preneur : ${preneur}</h2>
`;

function lireContrat() {
    // Récupère le radio bouton sélectionné
    var contrats = document.getElementsByName("contrat");
    var choix = null;

    for (var i = 0; i < contrats.length; i++) {
        if (contrats[i].checked) {
            choix = contrats[i].value;
            break;
        }
    }

    // Récupère le nombre de bouts
    var nbBouts = parseInt(document.getElementById("nbBouts").value, 10);

    // Vérification du nombre de bouts
    if (isNaN(nbBouts) || nbBouts < 0 || nbBouts > 3) {
        document.getElementById("resultat").innerHTML =
            "Erreur : le nombre de bouts doit être entre 0 et 3.";
        return;
    }

    // Affiche le résultat
    document.getElementById("resultat").innerHTML =
            "Contrat choisi : " + choix + "<br>Nombre de bouts : " + nbBouts;
}    
