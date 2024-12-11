/*jshint esnext: true*/

//Array of stocks at the start of the game and upon reset
const initialStocks = [{
        name: "Apple Inc.",
        ticker: "AAPL",
        price: 200
    },
    {
        name: "Alphabet Inc.",
        ticker: "GOOG",
        price: 150
    },
    {
        name: "Microsoft Corporation",
        ticker: "MSFT",
        price: 250
    },
    {
        name: "Meta Platforms, Inc.",
        ticker: "META",
        price: 300
    },
    {
        name: "The Bank of New York Mellon Corporation",
        ticker: "BK",
        price: 100
    },
    {
        name: "BlackRock Inc.",
        ticker: "BLK",
        price: 1000
    },
    {
        name: "Bank of America Corporation",
        ticker: "BAC",
        price: 50
    },
    {
        name: "Pfizer Inc.",
        ticker: "PFE",
        price: 30
    },
    {
        name: "Novartis AG",
        ticker: "NVS",
        price: 106
    },
    {
        name: "Electronic Arts Inc.",
        ticker: "EA",
        price: 165
    },
];

//Set Initial values at the beginning of the game and create the stock table
const defaultQuantity = 1;
const initialCashOnHand = 5000;

//For use later in the code
let myHoldings;
let totalProceeds;
let totalProceedsProfit;
let cashOnHand;
let stocks;


function initValues() {
    myHoldings = {};
    totalProceeds = 0;
    totalProceedsProfit = 0;
    cashOnHand = initialCashOnHand;
    stocks = initialStocks.map((stock) => ({
        ...stock
    }));
}

initValues();

//Create a list of stocks for the stock selection section and populates based on the initial stocks array
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

// Get the button elements and add event listeners to them.  Create constant declarations linked to HTML IDs for use in later code
document.addEventListener("DOMContentLoaded", function () {
    let currentSelectedStock;

    updateMyHoldingsUI();

    const buttons = document.getElementsByTagName("button");
    const stockSelectElement = document.getElementById("stock-select");
    const cashOnHandElement = document.getElementById("cash-on-hand");
    const priceElement = document.getElementById("price");
    const quantityElement = document.getElementById("quantity");
    const costElement = document.getElementById("total-cost");
    const potentialAdjustedCashElement = document.getElementById("potential-adjusted-cash");
    const proceedButtonElement = document.getElementById("proceed-button");
    const sellButtonElement = document.getElementById("sell-button");

    //Disable the proceed and sell buttons until valid selections and quantities are applied
    proceedButtonElement.disabled = true;
    sellButtonElement.disabled = true;

    for (const button of buttons) {
        button.addEventListener("click", function () {
            const dataType = this.getAttribute("data-type");
            switch (dataType) {
                case "sell":
                    calculateProceeds();
                    break;
                case "proceed":
                    adjustPortfolio(currentSelectedStock);
                    updateMyHoldingsUI();
                    updateCashUI(currentSelectedStock);
                    break;
                case "increment":
                    incrementDayCount();
                    break;
                case "update-prices":
                    updatePrices();
                    break;
                case "reset":
                    reset();
                    break;
                default:
                    alert(`Unknown Command`);
                    throw `Unknown Command: Aborting`;
            }
        });
    }

    populateStockSelectList(stockSelectElement);

    /**
     * Add listener to select dropdown, push the stock names to an option from the stock table, calculate cost
     * and display future cash if you go ahead with the trade
     */
    stockSelectElement.addEventListener("change", function () {
        const selectedStock = this.value;
        if (selectedStock === "") {
            currentSelectedStock = undefined;
            resetBuySection();
            return;
        }

        const stock = stocks.find((stock) => stock.name === selectedStock);
        currentSelectedStock = stock;
        priceElement.innerText = stock.price;

        quantityElement.value = defaultQuantity;
        quantityElement.innerText = defaultQuantity;
        const cost = calculateCost(defaultQuantity, currentSelectedStock);
        costElement.innerText = cost;
        const potentialAdjustedCashValue = (cashOnHand - cost).toFixed(2);
        potentialAdjustedCashElement.innerText = potentialAdjustedCashValue;

        proceedButtonElement.disabled = potentialAdjustedCashValue < 0;
    });

    /**
     * Adds a listener to the quantity input.  If a valid stock is selected from the dropdown, and a quantity of 1+ is selected,
     * then the cost of the trade will be calculated based on the price of that stock
     * and the cash-on-hand remaining will be calculated prior to proceeding with the trade
     */
    quantityElement.addEventListener("change", function () {
        if (currentSelectedStock !== undefined) {
            const selectedQuantity = this.value;
            const cost = calculateCost(selectedQuantity, currentSelectedStock);
            costElement.innerText = cost;
            const potentialAdjustedCashValue = (cashOnHand - cost).toFixed(2);
            potentialAdjustedCashElement.innerText = potentialAdjustedCashValue;

            proceedButtonElement.disabled = potentialAdjustedCashValue < 0;
        }
    });

    cashOnHandElement.innerText = initialCashOnHand;
});

/**
 * Resets all populated elements to blank or their original value and disables the proceed and sell buttons.
 */
function resetBuySection() {
    const stockSelectElement = document.getElementById("stock-select");
    stockSelectElement.selectedIndex = 0;
    const priceElement = document.getElementById("price");
    priceElement.innerText = "";
    const quantityElement = document.getElementById("quantity");
    quantityElement.innerText = 1;
    const costElement = document.getElementById("total-cost");
    costElement.innerText = "";
    const potentialAdjustedCashElement = document.getElementById("potential-adjusted-cash");
    potentialAdjustedCashElement.innerText = "";
    const proceedButtonElement = document.getElementById("proceed-button");
    proceedButtonElement.disabled = true;
    const sellButtonElement = document.getElementById("sell-button");
    sellButtonElement.disabled = true;
}

function resetSellSectionUI() {
    const dayCountElement = document.getElementById("day-count");
    dayCountElement.innerText = 1;
    myHoldings = {};
    updateMyHoldingsUI();
    const totalProceedsElement = document.getElementById("total-proceeds");
    totalProceedsElement.innerText = "";
    const totalProceedsProfitElement = document.getElementById("total-proceed-profit");
    totalProceedsProfitElement.innerText = "";
}

/**
 * Select stocks from the dropdown by iterating through the objects list and appending an option to the select list
 */
function populateStockSelectList(stockSelectHtmlElement) {
    stocks.forEach((stock) => {
        const option = document.createElement("option");
        option.innerHTML = stock.name;
        stockSelectHtmlElement.appendChild(option);
    });
}


/**
 * Calculates the purchase cost per stock (price*quantity) but includes an alert on the quantity and stock parameters
 */
function calculateCost(quantity, stock) {
    if (!stock || !quantity || isNaN(quantity) || quantity <= 0) {
        alert("Please enter a valid number for quantity.");
        return;
    }
    return (quantity * stock.price).toFixed(2);
}


/**
 * Calculates the sale proceeds per stock and updates the cash on hand while removing the holding from the portfolio
 */
function calculateProceeds() {
    resetBuySection();
    for (const ticker in myHoldings) {
        const holdingArray = myHoldings[ticker];
        for (const holding of holdingArray) {
            const checkbox = document.getElementById(holding.uniqueId);
            if (checkbox.checked) {
                const currentPrice = stocks.find(
                    (stock) => stock.ticker === ticker
                ).price;
                const moneyReceived = holding.quantity * currentPrice;
                cashOnHand += parseFloat(moneyReceived);
                holdingArray.splice(holdingArray.indexOf(holding), 1);
            }
        }
    }
    updateMyHoldingsUI();
    document.getElementById("cash-on-hand").innerText = cashOnHand.toFixed(2);
    totalProceeds = 0;
    totalProceedsProfit = 0;
}

/**
 * Pushes purchases to the myHoldings array and adjusts cash on hand after taking into
 * account the cost of purchases.
 */
function adjustPortfolio(stock) {
    const quantity = parseInt(document.getElementById("quantity").value);
    const boughtOn = parseInt(document.getElementById("day-count").innerText);

    if (!myHoldings[stock.ticker]) {
        myHoldings[stock.ticker] = [];
    }

    myHoldings[stock.ticker].push({
        name: stock.name,
        tradePrice: stock.price,
        quantity: quantity,
        boughtOn: boughtOn,
        uniqueId: Math.random().toString(36),
    });

    cashOnHand -= calculateCost(quantity, stock);
}

/**
 * Creates a HTML table and populates the company, ticker, original trade price
 * quantity of stock bought, the day it was traded on, and the unrealised gain
 * based on the updated prices.  A gain is highlighted in gree, loss in red.
 */
function updateMyHoldingsUI() {
    let html = `
          <div style="overflow-y: auto; max-height: 250px;">
              <table>
                  <thead>
                      <tr>
                          <th></th>
                          <th>Company</th>
                          <th>Ticker</th>
                          <th>Trade Price</th>
                          <th>Quantity</th>
                          <th>Trade Day</th>
                          <th>Unrealised Gain/Loss</th>
                      </tr>
                  </thead>
                  <tbody>
      `;

    for (const ticker in myHoldings) {
        const currentPrice = stocks.find((stock) => stock.ticker === ticker).price;
        const rows = myHoldings[ticker].map((holding) => {
            let unrealizedGainLoss = calculateGainLoss(
                holding.tradePrice,
                holding.quantity,
                currentPrice
            );
            unrealizedGainLoss =
                unrealizedGainLoss < 0 ?
                `<span style="color: red;">${unrealizedGainLoss}</span>` :
                `<span style="color: green;">${unrealizedGainLoss}</span>`;
            return `
                  <tr>
                      <td><input type="checkbox" class="holding-checkbox" id=${holding.uniqueId} onchange="handleCheckboxChange('${holding.uniqueId}-${ticker}')"></td>
                      <td>${holding.name}</td>
                      <td>${ticker}</td>
                      <td>${holding.tradePrice}</td>
                      <td>${holding.quantity}</td>
                      <td>${holding.boughtOn}</td>
                      <td>${unrealizedGainLoss}</td>
                  </tr>
              `;
        });
        html += rows.join("");
    }

    html += `
                  </tbody>
              </table>
          </div>
      `;

    document.getElementById("my-holdings").innerHTML = html;
    document.getElementById("total-proceeds").innerText = "";
    document.getElementById("total-proceed-profit").innerText = "";
}

/**
 * As the trades are processed in lots, a unique ID is added along with the ticker to distinguish
 * between each trade.  If the check boxes are checked, this calculates the proceeds for selling that lot, 
 * along with the total profit based on the updated prices.  The sell button is disabled until 
 * at least one checkbox is checked.  Profits per lot are highlighted in green, losses in red.
 */
function handleCheckboxChange(holdingCombinationId) {
    const [uniqueId, ticker] = holdingCombinationId.split("-");
    const sellButtonElement = document.getElementById("sell-button");
    const totalProceedsElement = document.getElementById("total-proceeds");
    const totalProceedsProfitElement = document.getElementById("total-proceed-profit");
    totalProceedsElement.innerText = "";
    totalProceedsProfitElement.innerText = "";

    const currentCheckbox = document.getElementById(uniqueId);

    let atLeastOneChecked = false;
    for (const ticker in myHoldings) {
        const holdingArray = myHoldings[ticker];
        for (const holding of holdingArray) {
            const checkbox = document.getElementById(holding.uniqueId);
            if (checkbox.checked) {
                atLeastOneChecked = true;
                break;
            }
        }
        if (atLeastOneChecked) {
            break;
        }
    }

    sellButtonElement.disabled = !atLeastOneChecked;

    const currentPrice = stocks.find((stock) => stock.ticker === ticker).price;
    const selectedHolding = myHoldings[ticker].find(
        (holding) => holding.uniqueId === uniqueId
    );

    const totalSell = selectedHolding.quantity * currentPrice;

    if (currentCheckbox.checked) {
        totalProceeds = (parseFloat(totalProceeds) + parseFloat(totalSell)).toFixed(2);
    }

    totalProceedsElement.innerText = totalProceeds;

    const realisedGainLoss = calculateGainLoss(
        selectedHolding.tradePrice,
        selectedHolding.quantity,
        currentPrice
    );
    if (currentCheckbox.checked) {
        totalProceedsProfit = (
            parseFloat(totalProceedsProfit) + parseFloat(realisedGainLoss)
        ).toFixed(2);
    }

    totalProceedsProfitElement.innerHTML = realisedGainLoss < 0 ?
        `<span style="color: red">${totalProceedsProfit}</span>` :
        `<span style="color: green;">${totalProceedsProfit}</span>`;
}

/**
 * Shows the user the cost per trade and how much cash on hand is available if they were to proceed.
 */
function updateCashUI(stock) {
    document.getElementById("cash-on-hand").innerText = cashOnHand.toFixed(2);
    const potentialAdjustedCashElement = document.getElementById("potential-adjusted-cash");
    const quantity = parseInt(document.getElementById("quantity").value);
    potentialAdjustedCashElement.innerText = (cashOnHand - calculateCost(quantity, stock)).toFixed(2);
}

/**
 * Increases day count by 1 for every click of the button
 */
function incrementDayCount() {
    const dayCountElement = document.getElementById("day-count");
    dayCountElement.innerText = parseInt(dayCountElement.innerText) + 1;
}

/**
 * Use randomised numbers to create updated stock prices per day between +/- 2%.  The updated prices will be 
 * reflected in the portfolio to calculate unrealised/realised gains or losses.  The updated prices will also be used 
 * as the latest price at which you can purchase/sell a stock.
 */
function updatePrices() {
    stocks.forEach((stock) => {
        const changePercent = (Math.random() - 0.5) / 25; //random number between -2% and 2%
        stock.price = Math.round(stock.price * (1 + changePercent) * 100) / 100; //update price and round to 2 decimals
    });

    const rows = document.querySelectorAll(".stock-row");
    rows.forEach((row, index) => {
        row.children[2].innerText = stocks[index].price;
    });

    incrementDayCount();
    resetBuySection();
    updateMyHoldingsUI();
}

/**
 * Calculates the unrealised gain/loss when the updated prices are reflected for every day incremented.
 */
function calculateGainLoss(tradePrice, quantity, currentPrice) {
    return ((currentPrice - tradePrice) * quantity).toFixed(2);
}

/**
 * Resets the stock table back to its original array.
 */
function resetStockTable() {
    const rows = document.querySelectorAll(".stock-row");
    rows.forEach((row, index) => {
        row.children[2].innerText = initialStocks[index].price;
    });
}


/**
 * Resets day count to 0, reinstates original table, resets budget, removes everything from portfolio and rate of return sections
 */
function reset() {
    initValues();
    resetStockTable();
    resetBuySection();
    resetSellSectionUI();
    document.getElementById("cash-on-hand").innerText = initialCashOnHand;
}