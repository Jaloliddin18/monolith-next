import React, { useState } from "react";
import { Stack } from "@mui/material";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { SIGN_UP } from "../../../apollo/user/mutation";
import { updateStorage, updateUserInfo } from "../../auth";
import {
  sweetMixinErrorAlert,
  sweetTopSmallSuccessAlert,
} from "../../sweetAlert";

const Signup = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [memberNick, setMemberNick] = useState("");
  const [memberPassword, setMemberPassword] = useState("");
  const [memberPhone, setMemberPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [signup] = useMutation(SIGN_UP);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!memberNick || !memberPassword || !memberPhone) {
        await sweetMixinErrorAlert("Please fill in all fields");
        return;
      }
      if (!agreeTerms) {
        await sweetMixinErrorAlert(
          "Please agree to Terms & Conditions"
        );
        return;
      }

      const result = await signup({
        variables: {
          input: {
            memberNick,
            memberPassword,
            memberPhone,
          },
        },
        fetchPolicy: "network-only",
      });

      const jwtToken = result?.data?.signup?.accessToken;
      if (jwtToken) {
        updateStorage({ jwtToken });
        updateUserInfo(jwtToken);
        await sweetTopSmallSuccessAlert("Account created!", 800);
        await router.push("/");
      }
    } catch (err: any) {
      await sweetMixinErrorAlert(err.message);
    }
  };

  return (
    <Stack className="login-page signup-page">
      <div className="login-container">
        {/* Left Panel - Form */}
        <div className="login-form-panel">
          <div className="login-form-content">
            <div className="login-form-wrapper">
              {/* Header */}
              <div className="login-header">
                <h1 className="login-title">Create Account</h1>
                <p className="login-subtitle">
                  Enter details to create account
                </p>
              </div>

              {/* Social Login Buttons */}
              <div className="social-login-buttons">
                <button className="social-btn" type="button">
                  <img
                    src="/icons/GoogleLogo.svg"
                    alt="Google"
                    width={24}
                    height={24}
                  />
                  <span>LogIn with Google</span>
                </button>
                <button className="social-btn" type="button">
                  <img
                    src="/icons/facebook_colorful.svg"
                    alt="Facebook"
                    width={24}
                    height={24}
                  />
                  <span>LogIn with Facebook</span>
                </button>
              </div>

              {/* OR Divider */}
              <div className="login-divider">
                <div className="divider-line" />
                <span className="divider-text">OR</span>
                <div className="divider-line" />
              </div>

              {/* Form Fields */}
              <form onSubmit={handleSignup}>
                <div className="form-fields">
                  {/* Full Name */}
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <div className="form-row">
                      <input
                        className="form-input"
                        type="text"
                        placeholder="First name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                      <input
                        className="form-input"
                        type="text"
                        placeholder="Last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Nick */}
                  <div className="form-group">
                    <label className="form-label">Username</label>
                    <input
                      className="form-input"
                      type="text"
                      placeholder="Enter your username"
                      value={memberNick}
                      onChange={(e) => setMemberNick(e.target.value)}
                    />
                  </div>

                  {/* Phone */}
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input
                      className="form-input"
                      type="tel"
                      placeholder="01012345678"
                      value={memberPhone}
                      onChange={(e) => setMemberPhone(e.target.value)}
                    />
                  </div>

                  {/* Password */}
                  <div className="form-group">
                    <label className="form-label">Password</label>
                    <div className="password-input-wrapper">
                      <input
                        className="form-input"
                        type={showPassword ? "text" : "password"}
                        placeholder="********"
                        value={memberPassword}
                        onChange={(e) =>
                          setMemberPassword(e.target.value)
                        }
                      />
                      <button
                        className="password-toggle"
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <img
                          src="/icons/Eye.svg"
                          alt="Toggle password"
                          width={24}
                          height={24}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Terms & Conditions */}
                  <div className="terms-check">
                    <label className="remember-me">
                      <input
                        type="checkbox"
                        checked={agreeTerms}
                        onChange={(e) =>
                          setAgreeTerms(e.target.checked)
                        }
                      />
                      <span className="custom-checkbox" />
                      <span className="remember-text">
                        I agree with Terms &amp; Conditions before
                        Signing up.
                      </span>
                    </label>
                  </div>
                </div>

                {/* Signup Button */}
                <div className="login-actions">
                  <button className="login-btn" type="submit">
                    SIGN UP
                  </button>
                  <p className="signup-link">
                    <span className="signup-text">
                      Already have an account?
                    </span>{" "}
                    <span
                      className="signup-action"
                      onClick={() => router.push("/account/join")}
                    >
                      LogIn
                    </span>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Right Panel - Image */}
        <div className="login-image-panel">
          <img
            src="/img/furniture/luxury_chair.jpg"
            alt="Luxury furniture"
            className="login-image"
          />
        </div>
      </div>
    </Stack>
  );
};

export default Signup;
