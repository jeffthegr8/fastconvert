async function convertETH() {
    const ethInput = document.getElementById("ethAmount").value;
    const resultDisplay = document.getElementById("ethResult");

    try {
        // Replace this with your actual API call (e.g., from Moralis)
        const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd");
        const data = await response.json();
        const ethUsdPrice = data.ethereum.usd;

        // Example conversion rate: 1 USD = 129 KSH
        const kshRate = 129;
        const ethKshPrice = ethUsdPrice * kshRate;

        const converted = (ethInput * ethKshPrice).toLocaleString();
        resultDisplay.textContent = `KSH: ${converted}`;
    } catch (error) {
        resultDisplay.textContent = "Failed to fetch ETH price.";
        console.error(error);
    }
}
