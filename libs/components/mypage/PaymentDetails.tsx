import { useState } from "react";
import {
  Stack,
  Box,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import {
  sweetTopSmallSuccessAlert,
  sweetMixinErrorAlert,
} from "../../sweetAlert";

const PaymentDetails = () => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [saveCard, setSaveCard] = useState(false);
  const [formData, setFormData] = useState({
    bankName: "",
    email: "",
    cardHolder: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      await sweetTopSmallSuccessAlert(
        "Payment details saved successfully",
        800,
      );
    } catch (err: any) {
      await sweetMixinErrorAlert(err.message);
    }
  };

  const handleCancel = () => {
    setFormData({
      bankName: "",
      email: "",
      cardHolder: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    });
    setSaveCard(false);
  };

  return (
    <>
      <Typography className="content-title">Add Account</Typography>

      <Stack className="payment-form">
        <RadioGroup
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <Box
            className={`payment-method-option ${paymentMethod === "card" ? "selected" : ""}`}
          >
            <FormControlLabel
              value="card"
              control={
                <Radio
                  sx={{
                    color: "#a86464",
                    "&.Mui-checked": { color: "#a86464" },
                  }}
                />
              }
              label="Credit / Debit / ATM Card"
            />
            <Box className="payment-logos">
              <img
                src="/img/payment_logo/visa_pay.png"
                alt="Visa"
                className="payment-logo"
              />
              <img
                src="/img/payment_logo/master_card.png"
                alt="Mastercard"
                className="payment-logo"
              />
            </Box>
          </Box>

          <Box
            className={`payment-method-option ${paymentMethod === "paypal" ? "selected" : ""}`}
          >
            <FormControlLabel
              value="paypal"
              control={
                <Radio
                  sx={{
                    color: "#a86464",
                    "&.Mui-checked": { color: "#a86464" },
                  }}
                />
              }
              label="Paypal"
            />
            <Box className="payment-logos">
              <img
                src="/img/payment_logo/pay_pal.png"
                alt="PayPal"
                className="payment-logo"
              />
            </Box>
          </Box>
        </RadioGroup>

        <Box className="form-row">
          <Box className="form-field full-width">
            <Typography className="field-label">Bank Name</Typography>
            <input
              className="field-input"
              placeholder="First Name"
              value={formData.bankName}
              onChange={(e) => handleInputChange("bankName", e.target.value)}
            />
          </Box>
        </Box>

        <Box className="form-row">
          <Box className="form-field full-width">
            <Typography className="field-label">Email Address</Typography>
            <input
              className="field-input"
              placeholder="example@gmail.com"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </Box>
        </Box>

        <Box className="form-row">
          <Box className="form-field full-width">
            <Typography className="field-label">
              Name on card / Card Holder
            </Typography>
            <input
              className="field-input"
              placeholder="First Name"
              value={formData.cardHolder}
              onChange={(e) => handleInputChange("cardHolder", e.target.value)}
            />
          </Box>
        </Box>

        <Box className="form-row">
          <Box className="form-field full-width">
            <Typography className="field-label">Card Number</Typography>
            <input
              className="field-input"
              placeholder="0 0 0 0  0 0 0 0  0 0 0 0  0 0 0 0"
              value={formData.cardNumber}
              onChange={(e) => handleInputChange("cardNumber", e.target.value)}
            />
          </Box>
        </Box>

        <Box className="form-row">
          <Box className="form-field">
            <Typography className="field-label">Expire Date</Typography>
            <input
              className="field-input"
              placeholder="DD - YYYY"
              value={formData.expiryDate}
              onChange={(e) => handleInputChange("expiryDate", e.target.value)}
            />
          </Box>
          <Box className="form-field">
            <Typography className="field-label">CVV</Typography>
            <input
              className="field-input"
              placeholder="0000"
              value={formData.cvv}
              onChange={(e) => handleInputChange("cvv", e.target.value)}
            />
          </Box>
        </Box>

        <FormControlLabel
          className="save-card-checkbox"
          control={
            <Checkbox
              checked={saveCard}
              onChange={(e) => setSaveCard(e.target.checked)}
              sx={{ color: "#a86464", "&.Mui-checked": { color: "#a86464" } }}
            />
          }
          label="Save card details for future payment method."
        />
      </Stack>

      <Stack className="form-actions" direction="row">
        <Button className="save-btn" onClick={handleSave}>
          SAVE
        </Button>
        <Button className="cancel-btn" onClick={handleCancel}>
          CANCEL
        </Button>
      </Stack>
    </>
  );
};

export default PaymentDetails;
