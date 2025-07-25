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
 
</script>
<script>
async function simulateInvestment() {
  const crypto = document.getElementById('crypto').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const dateInput = document.getElementById('date').value;
  const resultDiv = document.getElementById('result');

  resultDiv.innerHTML = "⏳ Loading...";

  if (!crypto || !amount || !dateInput) {
    resultDiv.innerHTML = "⚠️ Please fill in all fields.";
    return;
  }

  try {
    const kshRate = 129; // USD to KSh conversion rate

    // Convert YYYY-MM-DD to DD-MM-YYYY for CoinGecko
    const dateObj = new Date(dateInput);
    const dd = String(dateObj.getDate()).padStart(2, '0');
    const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
    const yyyy = dateObj.getFullYear();
    const formattedDate = `${dd}-${mm}-${yyyy}`;

    // 1. Get historical price
    const historicUrl = `https://api.coingecko.com/api/v3/coins/${crypto}/history?date=${formattedDate}`;
    const historicRes = await fetch(historicUrl);
    const historicData = await historicRes.json();
    const oldUsdPrice = historicData?.market_data?.current_price?.usd;

    if (!oldUsdPrice) {
      resultDiv.innerHTML = "⚠️ No historical data available for that date.";
      return;
    }

    // 2. Get current price
    const currentUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=usd`;
    const currentRes = await fetch(currentUrl);
    const currentData = await currentRes.json();
    const currentUsdPrice = currentData?.[crypto]?.usd;

    if (!currentUsdPrice) {
      resultDiv.innerHTML = "⚠️ Failed to fetch current price.";
      return;
    }

    // Convert to KSh
    const oldKsh = oldUsdPrice * kshRate;
    const currentKsh = currentUsdPrice * kshRate;

    // Calculate investment simulation
    const coinsBought = amount / oldKsh;
    const valueToday = coinsBought * currentKsh;
    const profit = valueToday - amount;

    resultDiv.innerHTML = `
      ✅ You would have bought <strong>${coinsBought.toFixed(4)}</strong> ${crypto}<br>
      📆 On ${dateInput}, 1 ${crypto} = <strong>${oldKsh.toFixed(2)} KSh</strong><br>
      💹 Today, 1 ${crypto} = <strong>${currentKsh.toFixed(2)} KSh</strong><br>
      💰 Your investment would now be worth: <strong>${valueToday.toFixed(2)} KSh</strong><br>
      ${profit >= 0 
        ? `🟢 Profit: <strong>+${profit.toFixed(2)} KSh</strong>` 
        : `🔴 Loss: <strong>${profit.toFixed(2)} KSh</strong>`}
    `;
  } catch (err) {
    console.error(err);
    resultDiv.innerHTML = "⚠️ Error fetching price data. Please try again.";
  }
}
</script>

