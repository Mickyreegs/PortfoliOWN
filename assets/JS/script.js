
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
            } else if(this.getAttribute("data-type") === "reset") {
                reset();
            } else{
              alert(`Unknown command`);
              throw `Unknown command: Aborting!`;
            } 
        })
    }

    stock.addEventListener("onChange", function() {
        if (this.getAttribute("data-type") === "stock") {
            buildDropdownList();}
    })

    calculateCost("buy");
    calculateProceeds("sell");
    adjustPortfolio("proceed");
    incrementDayCount("increment");
    reset("reset");
})

/**
 * Iterates through the table to get usable stock data for functions
 */
function buildTableData() {
    let tbody = document.getElementsByTagName('tbody')[0];
    let rows = tbody.children;
    stock = []

    for (let row of rows) {
        let stocks = {};
    
        let cells = row.children;
        stocks.name = cells[0].textContent;
        stocks.ticker = cells[1].textContent;
        stocks.price = cells[2].textContent;
        stock.push(stocks);
    }

   return stock;
}
let data = buildTableData();
console.log(data);

function buildDropdownList() {
    let stockList = document.getElementById("stock");
    for (let i = 0; i < stock.length; i++) {
        let newOption = document.createElement("option");
        newOption.innerHTML = stock[i];
        stockList.appendChild(newOption)
    }
    return stockList;
}
let dataDos = buildDropdownList();
console.log(dataDos);



/**
 * Finds the latest price for stock transactions and valuation
 */
function findPrice() {
    let price = parseInt(getElementById("price").innerText = companies[2].innerText);
    return[price]
}

/**
 * Calculates the purchase cost per stock
 */
function calculateCost() {

}

/**
 * Calculates the sale proceeds per stock
 */
function calculateProceeds() {

}

/**
 * Pushes purchases/removes sales from the portfolio array
 */
function adjustPortfolio() {

}

/**
 * Updates the cash balance after purchases and sales are processed
 */
function adjustCashOnHand() {

}

/**
 * Increases day count by 1 for every click of the button
 */
function incrementDayCount() {
    let oldDayCount = parseInt(document.getElementById("day-count").innerText);
    document.getElementById("day-count").innerText = ++oldDayCount;
}

/**
 * Updates the stock prices by +/- 5 once incrementDayCount function is called
 */
function updatePrices() {

}

/**
 * Calculates the unrealised gain/loss when the updated prices are reflected for every day incremented
 */
function CalculateUnrealisedGainLoss() {

}

/**
 * Calculates total profit/loss when a security is sold
 */
function CalculateRealisedGainLoss() {

}

/**
 * Calculates the rate of return per day incremented in %
 */
function CalculateRateOfReturn() {

}

/**
 * Resets day count to 0, reinstates original table, resets budget, removes everything from portfolio and rate of return sections
 */
function reset() {
    let resetDayCount = parseInt(document.getElementById("day-count").innerText = 0);
    return[resetDayCount]
}

