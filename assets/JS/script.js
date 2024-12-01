
// Get the button elements and add event listeners to them
document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");

    for(let button of buttons){
        button.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "buy") {
                calculatePurchases();
            } else if (this.getAttribute("data-type") === "sell") {
                    calculateSales();
                else if(this.getAttribute("data-type") === "proceed")
                    adjustPortfolio();
            }
        })
    }

    document.getElementById("answer-box").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            adjustPortfolio();
        }
    })

    runGame("addition");
})