const preneur = JSON.parse(localStorage.getItem("preneur"))
const totalScores = JSON.parse(localStorage.getItem("totalScores"));

const display1 = document.getElementById('preneur');
display1.innerHTML = `
  <h4>Preneur : ${preneur}</h4>
`;

const playerNames = JSON.parse(localStorage.getItem("playerNames"));

const display2 = document.getElementById('petitaubout');

display2.innerHTML = `
  <label>Petit au bout  : 
<select id="choixPreneur">
  <option value="Non">Non</option>
  <option value="Preneur">Preneur</option>
  <option value="Defense">Defense</option>
</select>
</label>
`;

//Dans la division id="annonces", ajouter 5 cases à cocher pour chaque joueur intitulées "Poignée simple", "Poignée double", "Poignée triple", "Misère de tête" et "Misère d'atout"
const display3 = document.getElementById('annonces');
display3.innerHTML = `
  <h4>Annonces des joueurs :</h4>
  ${playerNames
    .map(
      (name) => `
        <div>
          <h4>${name} :</h4>
          <label>Poignée :</label>
          <select id="${name}_poignee">
            <option value="aucune_poignee">0</option>
            <option value="poignee_simple">10</option>
            <option value="poignee_double">13</option>
            <option value="poignee_triple">15</option>
          </select>
          <br>
          <label><input type="checkbox" name="${name}_misere_tete" value="misere_tete"> Misère de tête</label>
          <label><input type="checkbox" name="${name}_misere_atout" value="misere_atout"> Misère d'atout</label>
        </div>
      `
    )
    .join('')}
`;
