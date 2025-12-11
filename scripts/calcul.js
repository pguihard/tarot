//https://www.le-tarot.fr/oudlers/calcul-score/
function calculGain(prise, nbBouts, nbPoints, petitAuBout, chelem) {
    // Définir les valeurs de base pour chaque type de prise
    const facteurMulti = {
        "petite": 1,
        "garde": 2,
        "gardesans": 4,
        "gardecontre": 6
    };
    // Calculer le score minimum requis en fonction du nombre de bouts
    const scoresMinBouts = [56, 51, 41, 36]; // Index 0: 0 bouts, 1: 1 bout, 2: 2 bouts, 3: 3 bouts
    const scoreMinRequis = scoresMinBouts[nbBouts];

    // Calculer la différence entre les points réalisés et le score minimum requis
    const differencePoints = nbPoints - scoreMinRequis;
    // Calculer le multiplicateur en fonction de la différence de points
    let gain = (Math.abs(differencePoints) + 25) * facteurMulti[prise] * (differencePoints >= 0 ? 1 : -1);
console.log("Gain: ", gain);    
    // Ajouter les points pour le petit au bout
    if (petitAuBout === "Preneur") {
        gain += 10 * facteurMulti[prise];
    } else if (petitAuBout === "Defense") {
        gain -= 10 * facteurMulti[prise];
    }
    const playerNames = JSON.parse(localStorage.getItem("playerNames"));
    const preneur = JSON.parse(localStorage.getItem("preneur"));
    playerNames.forEach((name, index) => {
        // Récupérer la valeur de id="${name}_poignee"
        const poigneeSelect = document.getElementById(`${name}_poignee`);
        const poigneeValue = poigneeSelect.value;
        let poigneePoints = 0;
        switch (poigneeValue) {
            case "poignee_simple":
                poigneePoints = 20;
                break;
            case "poignee_double":
                poigneePoints = 30;
                break;
            case "poignee_triple":
                poigneePoints = 40;
                break;
            default:
                poigneePoints = 0;
        }
        // Vérifier si la misère de tête est cochée
        const misereTeteCheckbox = document.querySelector(`input[name="${name}_misere_tete"]`);
        if (misereTeteCheckbox && misereTeteCheckbox.checked) {
            poigneePoints += 10;
        }
        // Vérifier si la misère d'atout est cochée
        const misereAtoutCheckbox = document.querySelector(`input[name="${name}_misere_atout"]`);
        if (misereAtoutCheckbox && misereAtoutCheckbox.checked) {
            poigneePoints += 10;
        }
                // Vérifier si le joueur est le preneur et a perdu ou bien s'il est défenseur
        if ((name === preneur && differencePoints < 0) || (name !== preneur)) {
            poigneePoints *= -1;
        }
        gain += poigneePoints;
    });

    // Ajouter les points pour le chelem
    if (chelem === "Annoncé et réussi") {
        gain += 400;
    } else if (chelem === "Non annoncé mais réussi") {
        gain += 200;
    } else if (chelem === "Annoncé mais raté") {
        gain -= 200;
    }

    return gain;
}
function repartitionPoints(gain) {
    // Récupérer les noms des joueurs
    const playerNames = JSON.parse(localStorage.getItem("playerNames"));
    // Récupérer le numéro de la manche
    const roundNumber = parseInt(localStorage.getItem("roundNumber"), 10);
    // Récuperer le nombre de joueurs
    const numPlayers = playerNames.length;
    const pointsPreneur = gain * (numPlayers - 1);
    const pointsDefense = -gain;
 
    // Parcourir la liste de joueurs et afficher leurs points
    const preneur = JSON.parse(localStorage.getItem("preneur"));
    // Créer une liste pour stocker chaque joueur et son score
    const scores = [];
    playerNames.forEach((name, index) => {
        // Stocker le score dans un tableau
        if (name === preneur) {
            points = pointsPreneur;
        } else {
            points = pointsDefense;
        }
        scores.push({manche: roundNumber, name: name, score: points });
    });
    return scores;
}
     function calculScores() {
    // Récupère la prise sélectionné
    const prise = document.getElementById("prise").value;
    // Récupère le nombre de bouts
    const nbBouts = parseInt(document.getElementById("nbBouts").value, 10);
    // Vérification du nombre de bouts
    if (isNaN(nbBouts) || nbBouts < 0 || nbBouts > 3) {
        document.getElementById("resultat").innerHTML =
            "Erreur : le nombre de bouts doit être entre 0 et 3.";
        return;
    }
    // Récupère le nombre de points réalisés
    const nbPoints = parseInt(document.getElementById("nbPoints").value, 10);
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

    // Affiche le résultat
    const gain = calculGain(prise, nbBouts, nbPoints, petitAuBout, chelem);
    let scores =  repartitionPoints(gain);
    // Une boucle pour afficher les scores
    const roundNumber = parseInt(localStorage.getItem("roundNumber"), 10);
    localStorage.setItem("scores", JSON.stringify(scores));
    // Afficher les scores des joueurs ET un passage à la ligne à la fin    
    document.getElementById("resultat").innerHTML = "Manche : " + roundNumber + " " + scores.map(s => `${s.name} : ${s.score} points`).join(", ");
}
function sauvegardeScores() {
    // Ajouter les nouveaux scores aux scores existants
    const existingScores = JSON.parse(localStorage.getItem("scoresTab"));

    const newScores = JSON.parse(localStorage.getItem("scores"));

    // Fusionner les deux tableaux de scores
    const mergedScores = existingScores.concat(newScores);
    // Stocker localement les scores
    localStorage.setItem("scoresTab", JSON.stringify(mergedScores));
    // Afficher les scores de scoreTab dans l'element resultat
    Scores = JSON.parse(localStorage.getItem("scoresTab"));
    document.getElementById("resultat").innerHTML = "Scores sauvegardés : " + JSON.stringify(Scores);
    console.log(Scores, typeof Scores);
    // Incrémenter le numéro de la manche
    const roundNumber = parseInt(localStorage.getItem("roundNumber"), 10) + 1;
console.log("Avant stockage roundNumber :", roundNumber);
    localStorage.setItem("roundNumber", JSON.stringify(roundNumber));
    // Mettre à jour le total des scores par joueur
    const totalScores = JSON.parse(localStorage.getItem("totalScores"));
    const playerNames = JSON.parse(localStorage.getItem("playerNames"));
    newScores.forEach((entry) => {
        const playerIndex = playerNames.indexOf(entry.name);
        if (playerIndex !== -1) {
            totalScores[playerIndex] += entry.score;
        }
    });
    localStorage.setItem("totalScores", JSON.stringify(totalScores));
    console.log("Total des scores mis à jour :", totalScores);

    //exportScoresToCSV();


    // Rediriger vers la page d'accueil ou une autre page
    window.location.href = "partie.html";
}
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
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "scores_tarot.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
