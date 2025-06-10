async function fetchETHPrice() {
    try {
        // Get the amount entered by the user
        const ethAmount = parseFloat(document.getElementById('cryptoAmount').value) || 1;
        
        // Fetch ETH price from the backend
        const response = await fetch('http://127.0.0.1:5000/eth-price');
        const data = await response.json();
        
        if (data.eth_price_ksh) {
            // Display the price of 1 ETH
            document.getElementById('price-display').textContent =
                `1 Ethereum is approximately ${data.eth_price_ksh.toLocaleString()} KSh`;
            
            // Calculate and display the converted amount
            const convertedAmount = ethAmount * data.eth_price_ksh;
            document.getElementById('result').textContent =
                `${ethAmount} Ethereum is approximately ${convertedAmount.toLocaleString()} KSh`;
        } else {
            document.getElementById('price-display').textContent = 'Error fetching ETH price';
            document.getElementById('result').textContent = 'Failed to convert ETH to KSh';
        }
    } catch (error) {
        console.error('Error fetching ETH price:', error);
        document.getElementById('price-display').textContent = 'Failed to fetch Ethereum price.';
        document.getElementById('result').textContent = 'Error: ' + error.message;
    }
}
