import "../ModalWithForm/ModalWithForm.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";

function LoginModal({
  isOpen,
  onLogin,
  handleCloseModal,
  handleSwitchToRegister,
}) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [authError, setAuthError] = useState("");
  const isPasswordValid = password.length > 6;

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
    setAuthError("");
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (value.length <= 6) {
      setPasswordError("Invalid password");
    } else {
      setPasswordError("");
    }
    setAuthError("");
  };

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
      setAuthError("");
      setEmailError("");
      setPasswordError("");
    }
  }, [isOpen]);

  function canSubmit() {
    return (
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
      password.length > 6 &&
      emailError === "" &&
      passwordError === ""
    );
  }

  const handleLoginFormSubmit = (e) => {
    e.preventDefault();
    setAuthError("");
    onLogin({ email, password }).catch((err) => {
      console.error("Login error:", err);
      setAuthError("Email or password is incorrect");
    });
  };

  return (
    <ModalWithForm
      title="Sign in"
      isOpen={isOpen}
      handleCloseModal={handleCloseModal}
      onSubmit={handleLoginFormSubmit}
    >
      <label htmlFor="email" className="modal__label">
        Email
        <input
          id="login-email"
          type="text"
          className="modal__input"
          placeholder="Enter email"
          required
          value={email}
          onChange={handleEmailChange}
          aria-invalid={!!emailError}
          aria-describedby="email-error"
        />
        {emailError && (
          <span id="email-error" className="modal__error">
            {emailError}
          </span>
        )}
      </label>
      <label htmlFor="password" className="modal__label">
        Password
        <input
          id="rlogin-password"
          type="password"
          className="modal__input"
          placeholder="Enter password"
          required
          value={password}
          onChange={handlePasswordChange}
        />
        {passwordError && (
          <span id="password-error" className="modal__error">
            {passwordError}
          </span>
        )}
        {authError && <span className="modal__error">{authError}</span>}
      </label>
      <button type="submit" className="modal__button" disabled={!canSubmit()}>
        Sign in
      </button>
      <button
        type="button"
        className="modal__button-secondary"
        onClick={handleSwitchToRegister}
      >
        or <span className="modal__link">Sign up</span>
      </button>
    </ModalWithForm>
  );
}

export default LoginModal;
