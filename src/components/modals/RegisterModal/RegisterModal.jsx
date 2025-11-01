import "../ModalWithForm/ModalWithForm.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";

function RegisterModal({
  isOpen,
  handleCloseModal,
  onRegister,
  handleSwitchToLogin,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [existingEmailError, setExistingEmailError] = useState("");

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(emailRegex.test(value) ? "" : "Invalid email address");
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(
      value.length >= 6 ? "" : "Password must be at least 6 characters"
    );
  };

  const handleUserNameChange = (e) => {
    const value = e.target.value;
    setUserName(value);
    setUserNameError(value.trim() ? "" : "User name is required");
  };

  const handleExistingEmailError = (e) => {
    if (!email) {
      setExistingEmailError("This email is not available");
    }
  };

  useEffect(() => {
    setEmail("");
    setPassword("");
    setUserName("");
    setAuthError("");
  }, [isOpen]);

  const handleRegisterFormSubmit = (e) => {
    e.preventDefault();
    let hasError = false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      setEmailError("Invalid email address");
      hasError = true;
    } else {
      setEmailError("");
    }
    if (!password.trim() || password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (!userName.trim()) {
      setUserNameError("User name is required");
      hasError = true;
    } else {
      setUserNameError("");
    }

    if (hasError) return;

    onRegister({ email, password, userName });
  };

  return (
    <ModalWithForm
      title="Sign up"
      isOpen={isOpen}
      handleCloseModal={handleCloseModal}
      onSubmit={handleRegisterFormSubmit}
    >
      <label htmlFor="register-email" className="modal__label">
        Email
        <input
          id="register-email"
          type="email"
          className="modal__input"
          placeholder="Enter email"
          required
          value={email}
          onChange={handleEmailChange}
        />
        {emailError && <span className="modal__error">{emailError}</span>}
      </label>
      <label htmlFor="register-password" className="modal__label">
        Password
        <input
          id="register-password"
          type="password"
          className="modal__input"
          placeholder="Enter password"
          required
          onChange={handlePasswordChange}
        />
        {passwordError && <span className="modal__error">{passwordError}</span>}
      </label>
      <label htmlFor="name" className="modal__label">
        Username
        <input
          type="text"
          className="modal__input"
          id="username-register"
          placeholder="Enter your username"
          required
          onChange={handleUserNameChange}
          value={userName}
        />
        {userNameError && <span className="modal__error">{userNameError}</span>}
      </label>
      <div>
        {existingEmailError && (
          <span className="modal__error">{existingEmailError}</span>
        )}
        <button
          type="submit"
          onClick={handleExistingEmailError}
          className="modal__button"
        >
          Sign up
        </button>
        <button
          type="button"
          className="modal__button-secondary"
          onClick={handleSwitchToLogin}
        >
          or <span className="modal__link">Sign in</span>
        </button>
      </div>
    </ModalWithForm>
  );
}

export default RegisterModal;
