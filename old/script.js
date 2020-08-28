
var create_card = function(person){
  var contribution = parseInt(person.totalContribution.replace("$", "").replace(",",""))
  var color = hslToRgb(0, Math.min(Math.max(contribution, 2500), 10000.0)/15000.0, .42)
  return `
            <div class="card">
              <div class="row no-gutters card-body">
                <div class="col-md-8 card-element">
                  <h5 class="card-title">${person.electedOfficialName}</h5>
                  <p class="card-text"> ${person.officeRanForOrDescription} </p> 
                  <p class="card-text text-muted"> ${person.districtOrJurisdiction} </p>
                </div>
                <div class="col-md-4 amount-due" style="background-color: ${color};">
                  <p class="card-text">${person.totalContribution}</p>
                </div>
              </div>
            </div>
          `
}

var fill_cards = function(data){
  $('#cards').innerHTML += data.map(create_card).join('\n');
}

var table;


function onload(){
  fill_cards(contributions)
}

window.addEventListener('load', onload);