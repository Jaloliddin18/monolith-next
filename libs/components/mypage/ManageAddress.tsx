import { useState } from "react";
import { useReactiveVar } from "@apollo/client";
import { useMutation } from "@apollo/client";
import {
  Stack,
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import { userVar } from "../../../apollo/store";
import { UPDATE_MEMBER } from "../../../apollo/user/mutation";
import {
  sweetTopSmallSuccessAlert,
  sweetMixinErrorAlert,
} from "../../sweetAlert";
import { updateUserInfo } from "../../auth";

const countries = [
  "South Korea",
  "United States",
  "United Kingdom",
  "Uzbekistan",
  "Russia",
  "China",
  "Japan",
  "Germany",
  "France",
  "Canada",
  "Australia",
];

const ManageAddress = () => {
  const user = useReactiveVar(userVar);

  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
  });

  const [updateMember] = useMutation(UPDATE_MEMBER);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      const input: any = {
        _id: user._id,
        memberAddress: `${formData.address}, ${formData.city}, ${formData.state}, ${formData.pincode}, ${formData.country}`.trim(),
      };

      const result = await updateMember({
        variables: { input },
      });

      if (result?.data?.updateMember?.accessToken) {
        updateUserInfo(result.data.updateMember.accessToken);
      }

      await sweetTopSmallSuccessAlert("Address updated successfully", 800);
    } catch (err: any) {
      await sweetMixinErrorAlert(err.message);
    }
  };

  const handleCancel = () => {
    setFormData({
      address: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
    });
  };

  return (
    <>
      <Typography className="content-title">Manage Address</Typography>

      <Stack className="personal-info-form">
        <Box className="form-row">
          <Box className="form-field full-width">
            <Typography className="field-label">Address</Typography>
            <textarea
              className="field-input field-textarea"
              placeholder="Shipping address"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              rows={3}
            />
          </Box>
        </Box>

        <Box className="form-row">
          <Box className="form-field">
            <Typography className="field-label">City</Typography>
            <input
              className="field-input"
              placeholder="Add city"
              value={formData.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
            />
          </Box>
          <Box className="form-field">
            <Typography className="field-label">State</Typography>
            <input
              className="field-input"
              placeholder="State/Province"
              value={formData.state}
              onChange={(e) => handleInputChange("state", e.target.value)}
            />
          </Box>
        </Box>

        <Box className="form-row">
          <Box className="form-field">
            <Typography className="field-label">Pincode</Typography>
            <input
              className="field-input"
              placeholder="0 0 0 0 0 0"
              value={formData.pincode}
              onChange={(e) => handleInputChange("pincode", e.target.value)}
            />
          </Box>
          <Box className="form-field">
            <Typography className="field-label">Country</Typography>
            <Select
              className="field-select"
              value={formData.country}
              onChange={(e) => handleInputChange("country", e.target.value)}
              displayEmpty
              renderValue={(value) =>
                value ? value : <span className="select-placeholder">Select country</span>
              }
            >
              {countries.map((country) => (
                <MenuItem key={country} value={country}>
                  {country}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>
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

export default ManageAddress;
