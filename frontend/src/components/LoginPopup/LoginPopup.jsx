import React, { useContext, useState, useRef, useEffect } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [currentState, setCurrentState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const firstInputRef = useRef(null);

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, [currentState]);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error on change
  };

  const validateForm = () => {
    const newErrors = {};
    if (currentState === "Sign Up" && data.name.trim() === "") {
      newErrors.name = "Name is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      newErrors.email = "Invalid email address";
    }
    if (data.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getPasswordStrength = (password) => {
    if (password.length > 8 && /[A-Z]/.test(password) && /\d/.test(password)) {
      return "Strong";
    } else if (password.length > 5) {
      return "Medium";
    } else {
      return "Weak";
    }
  };

  const onLogin = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      let newUrl = url;
      if (currentState === "Login") {
        newUrl += "/api/user/login";
      } else {
        newUrl += "/api/user/register";
      }
      const response = await axios.post(newUrl, data);
      if (response.data.success) {
        setToken(response.data.token);
        if (rememberMe) {
          localStorage.setItem("token", response.data.token);
        } else {
          sessionStorage.setItem("token", response.data.token);
        }
        toast.success("Login Successfully");
        setShowLogin(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-popup" role="dialog" aria-modal="true" aria-labelledby="login-popup-title">
      <form onSubmit={onLogin} className="login-popup-container" noValidate>
        <div className="login-popup-title">
          <h2 id="login-popup-title">{currentState}</h2>
          <button
            type="button"
            onClick={() => setShowLogin(false)}
            aria-label="Close login popup"
            className="close-button"
          >
            <img src={assets.cross_icon} alt="Close" />
          </button>
        </div>

        <div className="login-popup-inputs">
          {currentState === "Sign Up" && (
            <>
              <input
                ref={firstInputRef}
                name="name"
                onChange={onChangeHandler}
                value={data.name}
                type="text"
                placeholder="Your name"
                aria-invalid={!!errors.name}
                aria-describedby="name-error"
                required
              />
              {errors.name && (
                <p className="error" id="name-error" role="alert">
                  {errors.name}
                </p>
              )}
            </>
          )}

          {currentState === "Login" && (
            <input
              ref={firstInputRef}
              name="email"
              onChange={onChangeHandler}
              value={data.email}
              type="email"
              placeholder="Your email"
              aria-invalid={!!errors.email}
              aria-describedby="email-error"
              required
            />
          )}
          {currentState === "Sign Up" && (
            <input
              name="email"
              onChange={onChangeHandler}
              value={data.email}
              type="email"
              placeholder="Your email"
              aria-invalid={!!errors.email}
              aria-describedby="email-error"
              required
            />
          )}
          {errors.email && (
            <p className="error" id="email-error" role="alert">
              {errors.email}
            </p>
          )}

          <div className="password-wrapper" style={{ position: "relative" }}>
            <input
              name="password"
              onChange={onChangeHandler}
              value={data.password}
              type={showPassword ? "text" : "password"}
              placeholder="Your password"
              aria-invalid={!!errors.password}
              aria-describedby="password-error password-strength"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="password-toggle"
              aria-label={showPassword ? "Hide password" : "Show password"}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#007bff",
                fontWeight: "bold",
              }}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && (
            <p className="error" id="password-error" role="alert">
              {errors.password}
            </p>
          )}

          {currentState === "Sign Up" && data.password && (
            <p id="password-strength" style={{ marginTop: "4px" }}>
              Password strength:{" "}
              <strong>
                {getPasswordStrength(data.password)}
              </strong>
            </p>
          )}
        </div>

        <div className="login-popup-condition" style={{ marginTop: "10px" }}>
          <input
            type="checkbox"
            id="terms"
            required
            aria-required="true"
          />
          <label htmlFor="terms" style={{ marginLeft: "8px", fontSize: "0.9rem" }}>
            By continuing, I agree to the terms of use & privacy policy.
          </label>
        </div>

        <div className="remember-forgot" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px" }}>
          <label style={{ fontSize: "0.9rem" }}>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              style={{ marginRight: "6px" }}
            />
            Remember Me
          </label>

          {currentState === "Login" && (
            <button
              type="button"
              className="forgot-password"
              onClick={() => toast.info("Redirect to forgot password flow")}
              style={{
                background: "none",
                border: "none",
                color: "#007bff",
                cursor: "pointer",
                fontSize: "0.9rem",
                textDecoration: "underline",
                padding: 0,
              }}
            >
              Forgot Password?
            </button>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{ marginTop: "20px" }}
          aria-busy={loading}
        >
          {loading
            ? "Please wait..."
            : currentState === "Sign Up"
            ? "Create Account"
            : "Login"}
        </button>

        <div className="login-popup-switch" style={{ marginTop: "15px", fontSize: "0.9rem" }}>
          {currentState === "Login" ? (
            <p>
              Create a new account?{" "}
              <span
                onClick={() => {
                  setCurrentState("Sign Up");
                  setErrors({});
                  setData({ name: "", email: "", password: "" });
                }}
                style={{ color: "#007bff", cursor: "pointer", textDecoration: "underline" }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setCurrentState("Sign Up");
                    setErrors({});
                    setData({ name: "", email: "", password: "" });
                  }
                }}
              >
                Click here
              </span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span
                onClick={() => {
                  setCurrentState("Login");
                  setErrors({});
                  setData({ name: "", email: "", password: "" });
                }}
                style={{ color: "#007bff", cursor: "pointer", textDecoration: "underline" }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setCurrentState("Login");
                    setErrors({});
                    setData({ name: "", email: "", password: "" });
                  }
                }}
              >
                Login here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPopup;
