from flask import Flask, request, jsonify
from web3 import Web3

app = Flask(__name__)
w3 = Web3(Web3.HTTPProvider("https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID"))

@app.route('/process_payment', methods=['POST'])
def process_payment():
    data = request.json
    tx = {
        'to': data['to'],
        'value': w3.toWei(data['amount'], 'ether'),
        'gas': 21000,
        'gasPrice': w3.toWei('50', 'gwei'),
    }
    signed_tx = w3.eth.account.sign_transaction(tx, private_key="YOUR_PRIVATE_KEY")
    tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)
    return jsonify({'tx_hash': tx_hash.hex()})
