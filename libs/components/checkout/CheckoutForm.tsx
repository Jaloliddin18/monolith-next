import React, { useState } from "react";
import { Stack, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const CheckoutForm = () => {
  const [billingData, setBillingData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardData, setCardData] = useState({
    email: "",
    cardNumber: "",
    expireDate: "",
    cvv: "",
  });
  const [sameAddress, setSameAddress] = useState(true);
  const [saveCard, setSaveCard] = useState(false);
  const [saveCard2, setSaveCard2] = useState(false);

  const handleBillingChange = (field: string, value: string) => {
    setBillingData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCardChange = (field: string, value: string) => {
    setCardData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Stack className="checkout-form">
      {/* Billing Address Section */}
      <Stack className="billing-section">
        <Typography className="section-title">Billing Address</Typography>

        <Stack className="form-fields">
          {/* Full Name */}
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <div className="form-row">
              <input
                id="billing-first-name"
                name="firstName"
                className="form-input"
                type="text"
                placeholder="First Name"
                value={billingData.firstName}
                onChange={(e) =>
                  handleBillingChange("firstName", e.target.value)
                }
              />
              <input
                id="billing-last-name"
                name="lastName"
                className="form-input"
                type="text"
                placeholder="Last name"
                value={billingData.lastName}
                onChange={(e) =>
                  handleBillingChange("lastName", e.target.value)
                }
              />
            </div>
          </div>

          {/* Email */}
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              id="billing-email"
              name="email"
              className="form-input full"
              type="email"
              placeholder="example@gmail.com"
              value={billingData.email}
              onChange={(e) => handleBillingChange("email", e.target.value)}
            />
          </div>

          {/* Address */}
          <div className="form-group">
            <label className="form-label">Address</label>
            <textarea
              id="billing-address"
              name="address"
              className="form-input form-textarea"
              placeholder="Shipping address"
              value={billingData.address}
              onChange={(e) => handleBillingChange("address", e.target.value)}
            />
          </div>

          {/* City + State */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">City</label>
              <input
                id="billing-city"
                name="city"
                className="form-input"
                type="text"
                placeholder="Add city"
                value={billingData.city}
                onChange={(e) => handleBillingChange("city", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">State</label>
              <input
                id="billing-state"
                name="state"
                className="form-input"
                type="text"
                placeholder="Sate/Province"
                value={billingData.state}
                onChange={(e) => handleBillingChange("state", e.target.value)}
              />
            </div>
          </div>

          {/* Pincode + Country */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Pincode</label>
              <input
                id="billing-pincode"
                name="pincode"
                className="form-input"
                type="text"
                placeholder="0 0 0 0 0 0"
                value={billingData.pincode}
                onChange={(e) => handleBillingChange("pincode", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Country</label>
              <div className="select-wrapper">
                <select
                  id="billing-country"
                  name="country"
                  className="form-input form-select"
                  value={billingData.country}
                  onChange={(e) =>
                    handleBillingChange("country", e.target.value)
                  }
                >
                  <option value="" disabled>
                    Select country
                  </option>
                  <option value="US">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="KR">South Korea</option>
                  <option value="UZ">Uzbekistan</option>
                </select>
                <KeyboardArrowDownIcon className="select-icon" />
              </div>
            </div>
          </div>

          {/* Same address checkbox */}
          <label className="checkbox-row">
            <input
              id="billing-same-address"
              name="sameAddress"
              type="checkbox"
              checked={sameAddress}
              onChange={(e) => setSameAddress(e.target.checked)}
              className="checkbox-input"
            />
            <span className="checkbox-label">
              My billing and shipping address are the same
            </span>
          </label>
        </Stack>
      </Stack>

      {/* Payment Method Section */}
      <Stack className="payment-section">
        <Typography className="section-title">Payment Method</Typography>

        <Stack className="payment-fields">
          {/* Payment Options */}
          <div
            className={`payment-option ${paymentMethod === "card" ? "selected" : ""}`}
            onClick={() => setPaymentMethod("card")}
          >
            <div className="payment-option-left">
              <span
                className={`radio-btn ${paymentMethod === "card" ? "radio-selected" : ""}`}
              />
              <span className="payment-option-label">
                Credit / Debit / ATM Card
              </span>
            </div>
            <img
              src="/img/payment_logo/visa_pay.png"
              alt="Visa"
              className="payment-logo"
            />
          </div>

          <div
            className={`payment-option ${paymentMethod === "paypal" ? "selected" : ""}`}
            onClick={() => setPaymentMethod("paypal")}
          >
            <div className="payment-option-left">
              <span
                className={`radio-btn ${paymentMethod === "paypal" ? "radio-selected" : ""}`}
              />
              <span className="payment-option-label">Paypal</span>
            </div>
            <img
              src="/img/payment_logo/pay_pal.png"
              alt="PayPal"
              className="payment-logo"
            />
          </div>

          <div
            className={`payment-option ${paymentMethod === "cod" ? "selected" : ""}`}
            onClick={() => setPaymentMethod("cod")}
          >
            <div className="payment-option-left">
              <span
                className={`radio-btn ${paymentMethod === "cod" ? "radio-selected" : ""}`}
              />
              <span className="payment-option-label">Cash on Delivery</span>
            </div>
          </div>

          {/* Card Fields */}
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              id="payment-email"
              name="paymentEmail"
              className="form-input full"
              type="email"
              placeholder="example@gmail.com"
              value={cardData.email}
              onChange={(e) => handleCardChange("email", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Card Number</label>
            <input
              id="payment-card-number"
              name="cardNumber"
              className="form-input full"
              type="text"
              placeholder="0 0 0 0   0 0 0 0   0 0 0 0   0 0 0 0"
              value={cardData.cardNumber}
              onChange={(e) => handleCardChange("cardNumber", e.target.value)}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Expire Date</label>
              <input
                id="payment-expire-date"
                name="expireDate"
                className="form-input"
                type="text"
                placeholder="DD - YYYY"
                value={cardData.expireDate}
                onChange={(e) => handleCardChange("expireDate", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">CVV</label>
              <input
                id="payment-cvv"
                name="cvv"
                className="form-input"
                type="text"
                placeholder="0000"
                value={cardData.cvv}
                onChange={(e) => handleCardChange("cvv", e.target.value)}
              />
            </div>
          </div>

          {/* Save card checkboxes */}
          <label className="checkbox-row">
            <input
              id="payment-save-card"
              name="saveCard"
              type="checkbox"
              checked={saveCard}
              onChange={(e) => setSaveCard(e.target.checked)}
              className="checkbox-square"
            />
            <span className="checkbox-label">
              Save card details for future payment method.
            </span>
          </label>

          <label className="checkbox-row">
            <input
              id="payment-save-card-2"
              name="saveCard2"
              type="checkbox"
              checked={saveCard2}
              onChange={(e) => setSaveCard2(e.target.checked)}
              className="checkbox-square"
            />
            <span className="checkbox-label">
              Save card details for future payment method.
            </span>
          </label>
        </Stack>

        <button className="continue-btn">CONTINUE</button>
      </Stack>
    </Stack>
  );
};

export default CheckoutForm;
