
// Get the button elements and add event listeners to them
document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");
    let stockSelect = document.getElementById("stock-select");


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

    stockSelect.addEventListener("onChange", function() {
        if (this.getAttribute("data-type") === "stock-select") {
            stockSelectList();
        }
    })

    calculateCost("buy");
    calculateProceeds("sell");
    adjustPortfolio("proceed");
    incrementDayCount("increment");
    reset("reset");
})

/**
 * Build stock list for HTML div with ID "stock"
 */

let stocks = [
    {
        name: 'Apple Inc.',
        ticker: 'AAPL',
        price:  200

    },
    {
        name: 'Alphabet Inc.',
        ticker: 'GOOG',
        price:  150
  
    },
    {
        name: 'Microsoft Corporation',
        ticker: 'MSFT',
        price:  250
  
    },
    {
        name: 'Meta Platforms, Inc.',
        ticker: 'META',
        price:  300
  
    },
    {
        name: 'The Bank of New York Mellon Corporation',
        ticker: 'BK',
        price:  100
  
    },
    {
        name: 'BlackRock Inc.',
        ticker: 'BLK',
        price:  1000
  
    },
    {
        name: 'Bank of America Corporation',
        ticker: 'BAC',
        price:  50
  
    },
    {
        name: 'Pfizer Inc.',
        ticker: 'PFE',
        price:  30
  
    },
    {
        name: 'Novartis AG',
        ticker: 'NVS',
        price:  106
  
    },
    {
        name: 'Electronic Arts Inc.',
        ticker: 'EA',
        price:  165
  
    },
  ];
  
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
  
  for (stock of stocks) {
    let rowHtml = `
      <tr class="stock-row">
        <td>${stock.name}</td>
        <td>${stock.ticker}</td>
        <td>${stock.price}</td>
      </tr>
    `;
    html += rowHtml;  
  }
  html += `
    </tbody>
  </table>
  `;
  
  document.getElementById("table").innerHTML = html;
  
/**
 * Select stocks from the dropdown by iterating through the objects list
 * https://stackoverflow.com/questions/55627529/how-to-get-html-table-data-into-selected-options-via-the-the-javascript-at-run-t
 */

const values = Object.values(stocks);
    values.forEach(value => {
        console.log(value.name);
    }); 

function stockSelectList() {
    const values = Object.values(stocks);
    values.forEach(value => {
        for (let i=0; i < values.length; i++){
            let option = document.createElement("option");
            option.innerHTML=value.name[i];
            stockSelect.appendChild(option)
        }
    });   

}

    

/**
 * Finds the latest price for stock transactions and valuation
 */
function findPrice() {
    
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

