import React from 'react';
import { useNavigate } from 'react-router-dom';
import './pricingpage.css';

const PricingPage = () => {
    const navigateTo = useNavigate();

  const handleSubscribe = (plan) => {
    // Navigate to signup page with selected plan
    // history.push('/signup', { selectedPlan: plan });
    navigateTo('/signup', { state: { selectedPlan: plan } });
  };

  return (
    <div className="pricing-container">

      <main className="pricing-options">
        <div className="pricing-card">
          <h2>FREE</h2>
          <p className="price">00.00$</p>
          <ul>
            <li>CAN PLAN FOR UPCOMING 7 DAYS</li>
            <li>CAN'T REQUEST NOTIFICATION</li>
            <li>CAN PLAN UP TO 7 PLANS</li>
          </ul>
          <button onClick={() => handleSubscribe('free')}>SIGN UP</button>
        </div>
        <div className="pricing-card">
          <h2>STANDARD</h2>
          <p className="price">29.89$</p>
          <ul>
            <li>CAN PLAN FOR UPCOMING 11 DAYS</li>
            <li>CAN'T REQUEST NOTIFICATION</li>
            <li>CAN PLAN UP TO 11 PLANS</li>
          </ul>
          <button onClick={() => handleSubscribe('standard')}>SUBSCRIBE</button>
        </div>
        <div className="pricing-card">
          <h2>PREMIUM</h2>
          <p className="price">45.99$</p>
          <ul>
            <li>CAN PLAN FOR UPCOMING 45 DAYS</li>
            <li>CAN REQUEST NOTIFICATION</li>
            <li>CAN PLAN UP TO 45 PLANS</li>
          </ul>
          <button onClick={() => handleSubscribe('premium')}>SUBSCRIBE</button>
        </div>
      </main>
    </div>
  );
};

export default PricingPage;