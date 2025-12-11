document.getElementById('validateCount').addEventListener('click', () => {
    // Initialisation du stockage local pour un tableau de scores
    localStorage.setItem("scoresTab", JSON.stringify([]));
    // Initialisation du stockage local pour le numéro de la manche
    localStorage.setItem("roundNumber", "1");
    // Initialisation du stockage local pour un total des scores par joueur
    localStorage.setItem("totalScores", JSON.stringify([]));

    // Récupération du nombre de joueurs
    const count = parseInt(document.getElementById('playerCount').value, 10);
    if (!count || count < 3 || count >8) return;

    const step2 = document.getElementById('step2');
    step2.innerHTML = '<h2>Noms des joueurs :</h2>';

    for (let i = 1; i <= count; i++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = `Nom du joueur ${i}`;
        input.id = `player${i}`;
        input.required = true; // impose une saisie
        step2.appendChild(input);
        step2.appendChild(document.createElement('br'));
    }

    const btn = document.createElement('button');
    btn.textContent = 'Confirmer';

    btn.addEventListener('click', () => {
        const names = [];
        let valid = true;

        for (let i = 1; i <= count; i++) {
            const value = document.getElementById(`player${i}`).value.trim();

            if (value === "") {
                alert(`⚠️ Le nom du joueur ${i} ne peut pas être vide !`);
                valid = false;
                break;
            }

            names.push(value);
        }
        if (!valid) return;
        // Stockage des noms pour la prochaine page
        localStorage.setItem("playerNames", JSON.stringify(names));
        // Stockage des scores totaux initialisés à 0 pour chaque joueur
        const totalScores = names.map(() => 0);
        localStorage.setItem("totalScores", JSON.stringify(totalScores));
        // Redirection vers la page partie.html
        window.location.href = "html/partie.html";
    });
    step2.appendChild(btn);
    step2.style.display = 'block';
});
