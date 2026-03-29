import React, { useState } from "react";
import { Stack } from "@mui/material";
import { useRouter } from "next/router";
import { logIn } from "../../auth";
import {
  sweetMixinErrorAlert,
  sweetTopSmallSuccessAlert,
} from "../../sweetAlert";

const Login = () => {
  const router = useRouter();
  const [memberNick, setMemberNick] = useState("");
  const [memberPassword, setMemberPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!memberNick || !memberPassword) {
        await sweetMixinErrorAlert("Please fill in all fields");
        return;
      }
      await logIn(memberNick, memberPassword);
      await sweetTopSmallSuccessAlert("Login successful!", 800);
      await router.push("/");
    } catch (err: any) {
      await sweetMixinErrorAlert(err.message);
    }
  };

  return (
    <Stack className="login-page">
      <div className="login-container">
        {/* Left Panel - Form */}
        <div className="login-form-panel">
          <div className="login-form-content">
            <div className="login-form-wrapper">
              {/* Header */}
              <div className="login-header">
                <h1 className="login-title">Log In</h1>
                <p className="login-subtitle">Enter detailes to log In</p>
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
              <form onSubmit={handleLogin}>
                <div className="form-fields">
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input
                      className="form-input"
                      type="text"
                      placeholder="example@gmail.com"
                      value={memberNick}
                      onChange={(e) => setMemberNick(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Password</label>
                    <div className="password-input-wrapper">
                      <input
                        className="form-input"
                        type={showPassword ? "text" : "password"}
                        placeholder="********"
                        value={memberPassword}
                        onChange={(e) => setMemberPassword(e.target.value)}
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

                  {/* Remember Me & Forgot Password */}
                  <div className="form-options">
                    <label className="remember-me">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                      <span className="custom-checkbox" />
                      <span className="remember-text">Remember me</span>
                    </label>
                    <button type="button" className="forgot-password">
                      Forgot Password?
                    </button>
                  </div>
                </div>

                {/* Login Button */}
                <div className="login-actions">
                  <button className="login-btn" type="submit">
                    LOGIN
                  </button>
                  <p className="signup-link">
                    <span className="signup-text">
                      Don&apos;t have an account?
                    </span>{" "}
                    <span
                      className="signup-action"
                      onClick={() => router.push("/account/join")}
                    >
                      Create Account
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

export default Login;
