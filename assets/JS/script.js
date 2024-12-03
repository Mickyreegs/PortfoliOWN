
// Get the button elements and add event listeners to them
document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");
    let stock = document.getElementById("stock");

    for(let button of buttons){
        button.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "buy") {
                calculateCost();
            } else if (this.getAttribute("data-type") === "sell") {
                    calculateProceeds();
             } else if(this.getAttribute("data-type") === "proceed") {
                    adjustPortfolio();
            } else if(this.getAttribute("data-type") === "increment") {
                incrementDayCount();
            }   else{
                alert(`Unknown command`);
                throw `Unknown command: Aborting!`;
            }
        })
    }

    calculateCosts("buy");
    calculateProceeds("sell");
    adjustPortfolio("proceed");
    incrementDayCount("increment");
})

function buildTableData() {
    let tbody = document.getElementsByTagName('tbody')[0];
    let rows = tbody.children;
    let companies = []

    for (let row of rows) {
        let company = {};
    
        let cells = row.children;
        company.name = cells[0].textContent;
        company.ticker = cells[1].textContent;
        company.price = cells[2].textContent;
        companies.push(company);
    }

   return companies;
}
let data = buildTableData();
console.log(data);


function findPrice() {
    
}

function calculateCost() {

}

function calculateProceeds() {

}

function adjustPortfolio() {

}

function adjustCashOnHand() {

}

function incrementDayCount() {

}

function updatePrices() {

}

function CalculateUnrealisedGainLoss() {

}

function CalculateRealisedGainLoss() {

}

function CalculateRateOfReturn() {

}

