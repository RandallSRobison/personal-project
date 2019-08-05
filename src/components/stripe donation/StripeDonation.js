import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import "./StripeDonation.css";

class StripeDonation extends Component {
  constructor() {
    super();
    this.state = {
      amount: ""
    };
  }

  onToken = token => {
      console.log(token);
    let { amount } = this.state;
    token.card = void 0
    axios
      .post("api/payment", { token, amount })
      .then(res => {
          console.log(res);
        alert(`Thank you so much for your donation!`);
      });
  };

  render() {
    return (
      <div className="main-wrapper">
        <div className="donation-thanks-wrapper">
          <div className="donation-thanks">THANK YOU!</div>
        </div>
        <div className="donation-wrapper">
          <input
            className="donation-input"
            value={this.state.amount}
            type="number"
            placeholder="$ (in cents)"
            onChange={e => this.setState({ amount: +e.target.value })}
            
          />
          <StripeCheckout
            name="Selfless Donation"
            image={imageUrl}
            description="I really appreciate all of them!"
            stripeKey={process.env.REACT_APP_STRIPE_PUBLISH_KEY}
            token={this.onToken}
            amount={this.state.amount}
            currency="USD"
            panelLabel="Submit Donation"
            locale="en"
            allowRememberMe
            billingAddress={false}
            zipCode={false}
          />
        </div>
        <div className="stripe-b2log-parent">
            <Link to="/login">
              <button className="stripe-b2log-btn">Back to Home</button>
            </Link>
          </div>
      </div>
    );
  }
}

export default StripeDonation;

const imageUrl =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4G4Yvua99r1ftoc_8_2lrgTu-qv2kivT1l5UjzK6-MlJkrhgO";
