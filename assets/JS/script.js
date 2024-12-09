
//Array of stocks at the start of the game and upon reset
const initialStocks = [
    { name: "Apple Inc.", ticker: "AAPL", price: 200 },
    { name: "Alphabet Inc.", ticker: "GOOG", price: 150 },
    { name: "Microsoft Corporation", ticker: "MSFT", price: 250 },
    { name: "Meta Platforms, Inc.", ticker: "META", price: 300 },
    { name: "The Bank of New York Mellon Corporation", ticker: "BK", price: 100 },
    { name: "BlackRock Inc.", ticker: "BLK", price: 1000 },
    { name: "Bank of America Corporation", ticker: "BAC", price: 50 },
    { name: "Pfizer Inc.", ticker: "PFE", price: 30 },
    { name: "Novartis AG", ticker: "NVS", price: 106 },
    { name: "Electronic Arts Inc.", ticker: "EA", price: 165 },
];
 
//Set Initial values at the beginning of the game and create the stock table
const defaultQuantity = 1;
const initialCashOnHand = 5000;
const initialDayCount = 0;

let myHoldings;
let totalProceeds;
let totalProceedsProfit;
let cashOnHand;
let stocks

function initValues() {
  myHoldings = {}
  totalProceeds = 0;
  totalProceedsProfit = 0;
  cashOnHand = initialCashOnHand;
  stocks = initialStocks.map((stock) => ({...stock}));
}
  
initValues();

function populateStockTable() {
  let html = `
    <table>
      <thead>
        <tr>
          <th>Company</th>
          <th>Ticker</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
  `;
  
  for (const stock of stocks) {
    html += `
      <tr class="stock-row">
        <td>${stock.name}</td>
        <td>${stock.ticker}</td>
        <td>${stock.price}</td>
      </tr>
    `;
  }

  html += `
    </tbody>
  </table>
  `;
  
  document.getElementById("stock-table").innerHTML = html;
}

populateStockTable();

// Get the button elements and add event listeners to them
document.addEventListener("DOMContentLoaded", function() {
    let currentSelectedStock;

    const buttons = document.getElementsByTagName("button");
    const stockSelectElement = document.getElementById("stock-select");
    const cashOnHandElement = document.getElementById("cash-on-hand");
    const priceElement = document.getElementById("price");
    const quantityElement = document.getElementById("quantity");
    const costElement = document.getElementById("total-cost");
    const potentialAdjustedCashElement = document.getElementById("potential-adjusted-cash");
    const proceedButtonElement = document.getElementById("proceed-button");
    const sellButtonElement = document.getElementById("sell-button")

    proceedButtonElement.disabled = true;
    sellButtonElement.disabled = true;

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

    populateStockSelectList(stockSelectElement);

    stockSelectElement.addEventListener("change", function() {
        const selectedStock = this.value;
        if (selectedStock === "") {
            currentSelectedStock = undefined;
            resetBuySection();
            return;
        }

        const stock = stocks.find((stock) => stock.name === selectedStock)
        currentSelectedStock = stock;
        priceElement.innerText = stock.price;

        quantityElement.value = defaultQuantity;
        quantityElement.innerText = defaultQuantity;
        const cost = calculateCost(defaultQuantity, currentSelectedStock);
        costElement.innerText = cost;
        const potentialAdjustedCashValue = (cashOnHand - cost).toFixed(2);
        potentialAdjustedCashElement.innerText = potentialAdjustedCashValue

        proceedButtonElement.disabled = potentialAdjustedCashValue < 0;
    })

    quantityElement.addEventListener("change", function () {
        if (currentSelectedStock !== undefined) {
            const selectedQuantity = this.value;
            const cost = calculateCost(selectedQuantity, currentSelectedStock);
            costElement.innerText = cost;
            const potentialAdjustedCashValue = (cashOnHand - cost).toFixed(2);
            potentialAdjustedCashElement.innerText = potentialAdjustedCashValue;

            proceedButtonElement.disabled = potentialAdjustedCashValue < 0;
        }
    })

    cashOnHandElement.innerText = initialCashOnHand;
})


/**
 * Select stocks from the dropdown by iterating through the objects list
 */

function populateStockSelectList(stockSelectHtmlElement) {
    stocks.forEach((stock) => {
        const option = document.createElement("option");
        option.innerHTML = stock.name;
        stockSelectHtmlElement.appendChild(option);
    })
    }


/**
 * Calculates the purchase cost per stock
 */
function calculateCost(quantity, stock) {
    if (!stock || !quantity || isNaN(quantity) || quantity <= 0) {
        alert("Please enter a valid number for quantity.");
        return;
    }
    return (quantity * stock.price).toFixed(2);
}

/**
 * Build stock list for HTML div with ID "stock"
 */


  


    

/**
 * Finds the latest price for stock transactions and valuation
 */
function findPrice() {
    
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
 * Found on https://stackoverflow.com/questions/8597731/are-there-known-techniques-to-generate-realistic-looking-fake-stock-data
 */
function updatePrices() {
    rnd = Random_Float(); // generate number, 0 <= x < 1.0
    change_percent = 2 * volatility * rnd;
    if (change_percent > volatility)
        change_percent -= (2 * volatility);
    change_amount = old_price * change_percent;
    new_price = old_price + change_amount;
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

