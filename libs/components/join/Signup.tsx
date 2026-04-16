import React, { useState } from "react";
import { Stack } from "@mui/material";

interface SignupProps {
  input: { nick: string; password: string; phone: string; type: string };
  handleInput: (name: string, value: string) => void;
  doSignUp: () => Promise<void>;
  setLoginView: (state: boolean) => void;
  checkUserTypeHandler: (e: any) => void;
}

const Signup = ({
  input,
  handleInput,
  doSignUp,
  setLoginView,
  checkUserTypeHandler,
}: SignupProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) return;
    await doSignUp();
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
              <form onSubmit={handleSubmit}>
                <div className="form-fields">
                  {/* Username */}
                  <div className="form-group">
                    <label className="form-label">Username</label>
                    <input
                      id="signup-nick"
                      name="nick"
                      className="form-input"
                      type="text"
                      placeholder="Enter your username"
                      value={input.nick}
                      onChange={(e) => handleInput("nick", e.target.value)}
                    />
                  </div>

                  {/* Phone */}
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input
                      id="signup-phone"
                      name="phone"
                      className="form-input"
                      type="tel"
                      placeholder="01012345678"
                      value={input.phone}
                      onChange={(e) => handleInput("phone", e.target.value)}
                    />
                  </div>

                  {/* Password */}
                  <div className="form-group">
                    <label className="form-label">Password</label>
                    <div className="password-input-wrapper">
                      <input
                        id="signup-password"
                        name="password"
                        className="form-input"
                        type={showPassword ? "text" : "password"}
                        placeholder="********"
                        value={input.password}
                        onChange={(e) =>
                          handleInput("password", e.target.value)
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

                  {/* Member Type */}
                  <div className="form-group">
                    <label className="form-label">Account Type</label>
                    <label className="remember-me">
                      <input
                        id="signup-account-type-designer"
                        type="checkbox"
                        name="DESIGNER"
                        checked={input.type === "DESIGNER"}
                        onChange={checkUserTypeHandler}
                      />
                      <span className="custom-checkbox" />
                      <span className="remember-text">
                        Register as Designer
                      </span>
                    </label>
                  </div>

                  {/* Terms & Conditions */}
                  <div className="terms-check">
                    <label className="remember-me">
                      <input
                        id="signup-agree-terms"
                        name="agreeTerms"
                        type="checkbox"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                      />
                      <span className="custom-checkbox" />
                      <span className="remember-text">
                        I agree with Terms &amp; Conditions before Signing up.
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
                      onClick={() => setLoginView(true)}
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
            src="/img/login/login1.jpg"
            alt="Luxury furniture"
            className="login-image"
          />
        </div>
      </div>
    </Stack>
  );
};

export default Signup;
