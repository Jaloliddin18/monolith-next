import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "next-i18next";
import { useReactiveVar } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client";
import { Stack, Box, Typography, Button } from "@mui/material";
import axios from "axios";
import { userVar } from "../../../apollo/store";
import { GET_MEMBER } from "../../../apollo/user/query";
import { UPDATE_MEMBER } from "../../../apollo/user/mutation";
import { REACT_APP_API_URL, REACT_APP_API_GRAPHQL_URL } from "../../config";
import {
  sweetTopSmallSuccessAlert,
  sweetMixinErrorAlert,
} from "../../sweetAlert";
import { getJwtToken, updateStorage, updateUserInfo } from "../../auth";

const PersonalInfo = () => {
  const { t } = useTranslation('common');
  const user = useReactiveVar(userVar);
  const token = getJwtToken();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    memberNick: user.memberNick || "",
    memberFullName: user.memberFullName || "",
    memberPhone: user.memberPhone || "",
    memberAddress: user.memberAddress || "",
    memberDesc: user.memberDesc || "",
    memberImage: user.memberImage || "",
  });
  const [imagePreview, setImagePreview] = useState(
    user.memberImage
      ? user.memberImage.startsWith("/img") || user.memberImage.startsWith("/icons")
        ? user.memberImage
        : `${REACT_APP_API_URL}/${user.memberImage}`
      : ""
  );

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
      });

      if (member.memberImage) {
        const imgSrc =
          member.memberImage.startsWith("/img") ||
          member.memberImage.startsWith("/icons")
            ? member.memberImage
            : `${REACT_APP_API_URL}/${member.memberImage}`;
        setImagePreview(imgSrc);
      }
    }
  }, [memberData]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const image = e.target.files?.[0];
      if (!image) return;

      const form = new FormData();
      form.append(
        "operations",
        JSON.stringify({
          query: `mutation ImageUploader($file: Upload!, $target: String!) {
            imageUploader(file: $file, target: $target)
          }`,
          variables: { file: null, target: "member" },
        })
      );
      form.append("map", JSON.stringify({ "0": ["variables.file"] }));
      form.append("0", image);

      const response = await axios.post(
        `${REACT_APP_API_GRAPHQL_URL}`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "apollo-require-preflight": true,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const uploadedImage = response.data.data.imageUploader;
      setFormData((prev) => ({ ...prev, memberImage: uploadedImage }));
      setImagePreview(`${REACT_APP_API_URL}/${uploadedImage}`);
    } catch (err) {
      console.error("Error, uploadImage:", err);
    }
  };

  const handleSave = async () => {
    try {
      const input: any = { _id: user._id };

      if (formData.memberNick) input.memberNick = formData.memberNick;
      if (formData.memberFullName) input.memberFullName = formData.memberFullName;
      if (formData.memberPhone) input.memberPhone = formData.memberPhone;
      if (formData.memberAddress) input.memberAddress = formData.memberAddress;
      if (formData.memberDesc) input.memberDesc = formData.memberDesc;
      if (formData.memberImage) input.memberImage = formData.memberImage;

      const result = await updateMember({ variables: { input } });

      const jwtToken = result?.data?.updateMember?.accessToken;
      if (jwtToken) {
        await updateStorage({ jwtToken });
        updateUserInfo(jwtToken);
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
      });
      if (member.memberImage) {
        const imgSrc =
          member.memberImage.startsWith("/img") ||
          member.memberImage.startsWith("/icons")
            ? member.memberImage
            : `${REACT_APP_API_URL}/${member.memberImage}`;
        setImagePreview(imgSrc);
      }
    }
  };

  const avatarSrc =
    imagePreview ||
    (user.memberImage
      ? user.memberImage.startsWith("/img") || user.memberImage.startsWith("/icons")
        ? user.memberImage
        : `${REACT_APP_API_URL}/${user.memberImage}`
      : "/general_images/default_profile.png");

  return (
    <>
      <Typography className="content-title">{t('Personal Information')}</Typography>

      <Stack className="personal-info-form">
        <Typography className="form-section-title">{t('Upload Profile')}</Typography>
        <Box className="upload-profile">
          <img className="upload-avatar" src={avatarSrc} alt="Profile" />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpg, image/jpeg, image/png"
            hidden
            onChange={handleImageUpload}
          />
          <Button
            className="upload-btn"
            onClick={() => fileInputRef.current?.click()}
          >
            {t('Upload Image')}
          </Button>
        </Box>

        <Box className="form-row">
          <Box className="form-field">
            <Typography className="field-label">{t('Full Name')}</Typography>
            <input
              className="field-input"
              placeholder={t('Enter full name')}
              value={formData.memberFullName}
              onChange={(e) =>
                handleInputChange("memberFullName", e.target.value)
              }
            />
          </Box>
          <Box className="form-field">
            <Typography className="field-label">{t('Nickname')}</Typography>
            <input
              className="field-input"
              placeholder={t('Enter nickname')}
              value={formData.memberNick}
              onChange={(e) => handleInputChange("memberNick", e.target.value)}
            />
          </Box>
        </Box>

        <Box className="form-row">
          <Box className="form-field">
            <Typography className="field-label">{t('Mobile Number')}</Typography>
            <input
              className="field-input"
              placeholder={t('Enter mobile number')}
              value={formData.memberPhone}
              onChange={(e) =>
                handleInputChange("memberPhone", e.target.value)
              }
            />
          </Box>
          <Box className="form-field">
            <Typography className="field-label">{t('Address')}</Typography>
            <input
              className="field-input"
              placeholder={t('Enter address')}
              value={formData.memberAddress}
              onChange={(e) =>
                handleInputChange("memberAddress", e.target.value)
              }
            />
          </Box>
        </Box>
      </Stack>

      <Stack className="form-actions" direction="row">
        <Button className="save-btn" onClick={handleSave}>
          {t('SAVE')}
        </Button>
        <Button className="cancel-btn" onClick={handleCancel}>
          {t('CANCEL')}
        </Button>
      </Stack>
    </>
  );
};

export default PersonalInfo;
