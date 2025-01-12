import { useState } from 'react';

export default function Home() {
  const [amount, setAmount] = useState('');
  const [txHash, setTxHash] = useState('');

  
  const handlePayment = async () => {
    const response =await fetch('http://127.0.0.1:5000/pay', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: '0xYourAddress', // Replace with the user's address
        amount,
      }),
  })
      const data = await response.json();
      setTxHash(data.txHash);
      console.log(data);
  };

  return (
    <div>
      <h1>Blockchain Payment Gateway</h1>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount in ETH"
      />
      <button onClick={handlePayment}>Pay</button>
      {txHash && <p>Transaction Hash: {txHash}</p>}
    </div>
  );
}