const preneur = JSON.parse(localStorage.getItem("preneur"))
const appele = JSON.parse(localStorage.getItem("appele"))
// Définir une variable attaque = preneur + appele si appele n'est pas null sinon attaque = preneur
let attaque = preneur;
if (appele != null) {
  attaque = preneur + " / " +  appele
} 
const display1 = document.getElementById('preneur');
display1.innerHTML = `
  <h4>Attaque: ${attaque}</h4>
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
const poignee = [[0, 13, 15, 18], [0, 10, 13, 15], [0, 8, 10, 13]];
switch (JSON.parse(localStorage.getItem("playerNames")).length) {
  case 3:
    poigneeValues = poignee[0];
    break;
  case 4:
    poigneeValues = poignee[1];
    break;
  case 5:
    poigneeValues = poignee[2];
    break;
  default:
    poigneeValues = [0, 0, 0, 0];
    break;
} 
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
            <option value="aucune_poignee">${poigneeValues[0]}</option>
            <option value="poignee_simple">${poigneeValues[1]}</option>
            <option value="poignee_double">${poigneeValues[2]}</option>
            <option value="poignee_triple">${poigneeValues[3]}</option>
          </select>
          <br>
          <label><input type="checkbox" name="${name}_misere_tete" value="misere_tete"> Misère de tête</label>
          <label><input type="checkbox" name="${name}_misere_atout" value="misere_atout"> Misère d'atout</label>
        </div>
      `
    )
    .join('')}
`;
