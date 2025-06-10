from flask import Flask, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

# Define the Moralis API URL
MORALIS_API_URL = "https://deep-index.moralis.io/api/v2/erc20/price?chain=eth&address=0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
MORALIS_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjJ5ZDMwLWJWYWJwZ1YyYTZndTNrMzg1M05lMyIsInVvY2tldCI6ImIzNzUxN2U3LWVkY2UtNDI1Mi04NTY5LWJiMjcwNzU3NTVlMyIsIm9yZ0lkIjoiMzY1Iiwib3JnUm9sZSI6IlNlcnZlciIsImlhdCI6MTcxMTQ1NDY2MywiZXhwIjoxNzEzNjEwNjYzfQ.oRz0-4R9JvQ6M5Vz3mLwQyzjAYvzhIMDJkMSIS"
USD_TO_KSH = 129  # Fixed exchange rate


@app.route('/get_eth_price')
def get_eth_price():
    try:
        print("Fetching ETH price from Moralis...")  # Add this line

        # Fetch ETH price in USD from Moralis
        headers = {"X-API-Key": MORALIS_API_KEY}  # Corrected headers
        print(f"Request Headers: {headers}")
        response = requests.get(MORALIS_API_URL, headers=headers)

        print(f"Response Status Code: {response.status_code}") # Add this line
        print(f"Response Text: {response.text}") # Add this line

        if response.status_code == 200:
            data = response.json()
            print(f"Data from Moralis: {data}")  # Add this line
            eth_price_usd = data.get("usdPrice", 0)
            print(f"ETH Price in USD: {eth_price_usd}")  # Add this line

            # Convert to KSh
            eth_price_ksh = eth_price_usd * USD_TO_KSH

            return jsonify({"eth_price_ksh": eth_price_ksh})
        else:
            print("Failed to fetch Ethereum price from Moralis")
            return jsonify({"error": "Failed to fetch Ethereum price"}, 500)

    except Exception as e:
        print(f"An exception occurred: {str(e)}") #Add this line
        return jsonify({"error": str(e)}, 500)


if __name__ == '__main__':
    app.run(debug=True, port=5000)