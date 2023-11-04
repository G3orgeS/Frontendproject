import React from 'react';

interface PaymentFormProps {
    handlePayment: () => void; 
  }
  
  const PaymentForm: React.FC<PaymentFormProps> = ({ handlePayment }) => {
    return (
      <div className="payment-form">
      <input type="text" placeholder="Namn på bankkortet" />
      <input type="text" placeholder="Kortnummer" />
      <input type="text" placeholder="Utgångsdatum" />
      <input type="text" placeholder="Säkerhetskod" />
      <button className="payment-button" onClick={handlePayment}>Betala</button>
    </div>
  );
};

export default PaymentForm;
