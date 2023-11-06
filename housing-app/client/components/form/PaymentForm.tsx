import React from 'react';
import '../../css/components/form/Paymentform.css'

interface PaymentFormProps {
  handlePayment: () => void;
}
const PaymentForm: React.FC<PaymentFormProps> = ({ handlePayment }) => {
  return (
    <div className="payment-form">
      <h2>Betalning</h2>
      <input type="text" placeholder="Namn på bankkortet" />
      <input type="text" placeholder="Kortnummer" />
      <div className="row">
        <input type="text" placeholder="Utgångsdatum" />
        <input type="text" placeholder="Säkerhetskod" />
      </div>
        <div className="paybtnwrap">
          <button className="payment-button" onClick={handlePayment}>Betala</button>
        </div>
    </div>
  );
};

export default PaymentForm;