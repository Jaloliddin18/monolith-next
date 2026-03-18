import React, { useState, useEffect, useRef } from "react";
import { useReactiveVar } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client";
import {
  Stack,
  Box,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { userVar } from "../../../apollo/store";
import { GET_MEMBER } from "../../../apollo/user/query";
import { UPDATE_MEMBER } from "../../../apollo/user/mutation";
import { REACT_APP_API_URL } from "../../config";
import {
  sweetTopSmallSuccessAlert,
  sweetMixinErrorAlert,
} from "../../sweetAlert";
import { updateUserInfo } from "../../auth";

const PersonalInfo = () => {
  const user = useReactiveVar(userVar);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    memberNick: "",
    memberFullName: "",
    memberPhone: "",
    memberAddress: "",
    memberDesc: "",
    memberImage: "",
    gender: "male",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  const { data: memberData } = useQuery(GET_MEMBER, {
    variables: { input: user._id },
    skip: !user._id,
    fetchPolicy: "network-only",
  });

  const [updateMember] = useMutation(UPDATE_MEMBER);

  useEffect(() => {
    if (memberData?.getMember) {
      const member = memberData.getMember;
      setFormData({
        memberNick: member.memberNick || "",
        memberFullName: member.memberFullName || "",
        memberPhone: member.memberPhone || "",
        memberAddress: member.memberAddress || "",
        memberDesc: member.memberDesc || "",
        memberImage: member.memberImage || "",
        gender: "male",
      });

      const imgSrc = member.memberImage?.startsWith("/img")
        ? member.memberImage
        : `${REACT_APP_API_URL}/${member.memberImage}`;
      setImagePreview(imgSrc);
    }
  }, [memberData]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    try {
      const input: any = {
        _id: user._id,
        memberNick: formData.memberNick,
        memberFullName: formData.memberFullName,
        memberPhone: formData.memberPhone,
        memberAddress: formData.memberAddress,
        memberDesc: formData.memberDesc,
      };

      if (imageFile) {
        input.memberImage = imageFile;
      }

      const result = await updateMember({
        variables: { input },
      });

      if (result?.data?.updateMember?.accessToken) {
        updateUserInfo(result.data.updateMember.accessToken);
      }

      await sweetTopSmallSuccessAlert("Profile updated successfully", 800);
    } catch (err: any) {
      await sweetMixinErrorAlert(err.message);
    }
  };

  const handleCancel = () => {
    if (memberData?.getMember) {
      const member = memberData.getMember;
      setFormData({
        memberNick: member.memberNick || "",
        memberFullName: member.memberFullName || "",
        memberPhone: member.memberPhone || "",
        memberAddress: member.memberAddress || "",
        memberDesc: member.memberDesc || "",
        memberImage: member.memberImage || "",
        gender: "male",
      });
      setImageFile(null);
      const imgSrc = member.memberImage?.startsWith("/img")
        ? member.memberImage
        : `${REACT_APP_API_URL}/${member.memberImage}`;
      setImagePreview(imgSrc);
    }
  };

  const avatarSrc =
    imagePreview || user.memberImage || "/icons/user_profile.png";

  return (
    <>
      <Typography className="content-title">Personal Information</Typography>

      <Stack className="personal-info-form">
        <Typography className="form-section-title">Upload Profile</Typography>
        <Box className="upload-profile">
          <img
            className="upload-avatar"
            src={"/icons/user_profile.png"}
            alt="Profile"
          />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageUpload}
          />
          <Button
            className="upload-btn"
            onClick={() => fileInputRef.current?.click()}
          >
            Upload Image
          </Button>
        </Box>

        <Box className="form-row">
          <Box className="form-field">
            <Typography className="field-label">Full Name</Typography>
            <input
              className="field-input"
              placeholder="Enter full name"
              value={formData.memberFullName}
              onChange={(e) =>
                handleInputChange("memberFullName", e.target.value)
              }
            />
          </Box>
          <Box className="form-field">
            <Typography className="field-label">Nickname</Typography>
            <input
              className="field-input"
              placeholder="Enter nickname"
              value={formData.memberNick}
              onChange={(e) => handleInputChange("memberNick", e.target.value)}
            />
          </Box>
        </Box>

        <Box className="form-row">
          <Box className="form-field">
            <Typography className="field-label">Mobile Number</Typography>
            <input
              className="field-input"
              placeholder="Enter mobile number"
              value={formData.memberPhone}
              onChange={(e) => handleInputChange("memberPhone", e.target.value)}
            />
          </Box>
          <Box className="form-field">
            <Typography className="field-label">Address</Typography>
            <input
              className="field-input"
              placeholder="Enter address"
              value={formData.memberAddress}
              onChange={(e) =>
                handleInputChange("memberAddress", e.target.value)
              }
            />
          </Box>
        </Box>

        <Box className="gender-section">
          <Typography className="field-label">Gender</Typography>
          <RadioGroup
            row
            value={formData.gender}
            onChange={(e) => handleInputChange("gender", e.target.value)}
          >
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
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

export default PersonalInfo;
