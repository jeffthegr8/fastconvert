from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route("/")
def home():
    return {"message": "CORS is enabled for Flask!"}

if _name_ == "_main_":
    app.run(host="0.0.0.0", port=5000, debug=True)
from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

# Binance API URL
BINANCE_URL = "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT"

# Fixed exchange rate
EXCHANGE_RATE = 129  # 1 USD = 129 KSh

@app.route('/convert', methods=['GET'])
def convert_btc():
    try:
        # Fetch BTC price in USD from Binance API
        response = requests.get(BINANCE_URL)
        data = response.json()
        btc_price_usd = float(data["price"])

        # Convert to KSh
        btc_price_ksh = btc_price_usd * EXCHANGE_RATE

        # Return JSON response
        return jsonify({

            "btc_price_usd": btc_price_usd,
            "btc_price_ksh": btc_price_ksh
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '_main_':
    app.run(debug=True)


