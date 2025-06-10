async function getExchangeRateInUSD() {
    try {
        const response = await fetch("https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT");
        const data = await response.json();
        return parseFloat(data.price);
    } catch (error) {
        console.error("Error fetching exchange rate:", error);
        return null;
    }
}

async function fetchBTCPrice() {
    try {
        const response = await fetch("http://127.0.0.1:5000/btc-price");
        const data = await response.json();

        if (data.btc_price_ksh) {
            document.getElementById("btc-price").textContent = 
                `BTC Price: KSh ${data.btc_price_ksh.toLocaleString()}`;
        } else {
            console.error("Error fetching BTC price:", data.error);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

// Fetch price when page loads
window.onload = fetchBTCPrice;
   async function convertToKSH() {
       const cryptoType = document.getElementById("cryptoType").value;
       const cryptoAmount = parseFloat(document.getElementById("cryptoAmount").value);

       if (isNaN(cryptoAmount) || cryptoAmount <= 0) {
           document.getElementById("result").innerText = "Please enter a valid amount.";
           return;
       }

       try {
           const response = await fetch(`https://127.0.0.1:5000/convert?crypto=${cryptoType}&amount=${cryptoAmount}`);
           const data = await response.json();

           if (response.ok) {
               document.getElementById("result").innerText = 
                   `${cryptoAmount} ${cryptoType.toUpperCase()} ≈ ${data.kes_price.toLocaleString()} KSh`;
           } else {
               document.getElementById("result").innerText = `Error: ${data.error}`;
           }
       } catch (error) {
           document.getElementById("result").innerText = "Failed to fetch exchange rate.";
       }
   }