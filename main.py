from flask import Flask, jsonify
import requests
from flask_cors import CORS  # Enable CORS for frontend access

app = Flask(__name__)
CORS(app)

# Binance API Endpoint
BINANCE_URL = "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT"
ETH_BINANCE_URL = "https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT"


# Fixed Exchange Rate (USD to KSh)
USD_TO_KSH_RATE = 129  # Adjust this if needed

@app.route('/btc-price', methods=['GET'])
def get_btc_price():
    try:
        response = requests.get(BINANCE_URL)
        data = response.json()
        
        # Extract BTC price in USD
        btc_price_usd = float(data['price'])

        # Convert BTC price to KSh
        btc_price_ksh = btc_price_usd * USD_TO_KSH_RATE

        return jsonify({
            "btc_price_usd": btc_price_usd,
            "btc_price_ksh": btc_price_ksh
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# ETH conversion endpoint
@app.route('/eth-price', methods=['GET'])
def get_eth_price():
    try:
        eth_url = "https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT"
        response = requests.get(eth_url)
        data = response.json()
        eth_price_usd = float(data['price'])

        # Convert to KSh
        eth_price_ksh = eth_price_usd * USD_TO_KSH_RATE

        return jsonify({'eth_price_ksh': round(eth_price_ksh, 2)})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
