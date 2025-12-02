function calculScore() {
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
    // Récupère le petit au bout
    const petitAuBout = document.getElementById("choixPreneur").value;
    if (petitAuBout !== "Non") {
        // Ajouter 10 points si le preneur a le petit au bout
        nbPoints += 10;
    }
    // Affiche le résultat
    document.getElementById("resultat").innerHTML =
            prise + ", " + nbBouts + " bouts, " + nbPoints + " points, petit au bout: " + petitAuBout + ", chelem: " + chelem  ;

}