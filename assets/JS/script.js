
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
            } else{
                alert(`Unknown command`);
                throw `Unknown command: Aborting!`;
            }
        })
    }

    stock.addEventListener("click",function() {
        if(this.value === company.ticker[1])
            return[company.price]
    })

    calculateCosts("buy");
    calculateProceeds("sell");
    adjustPortfolio("proceed");
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


function displayPrice() {
    if (getElementById('stock').textContent === companies[0]);
    return[companies[2]]
}

function calculateCost() {
    let stockToPurchase = document.getElementById('stock').innerText;
    let purchasePrice = parseInt(company.price).innerText;
    let quantity = parseInt(document.getElementById('quantity').innerText)

    if (stockToPurchase === company.name) {
        return[purchasePrice * quantity]
    } else {
        alert(`Try Again`);
        throw `unimplemented. Aborting!`;
    }
}

function calculateProceeds() {

}

function adjustPortfolio() {

}

function findPrice() {
    
}