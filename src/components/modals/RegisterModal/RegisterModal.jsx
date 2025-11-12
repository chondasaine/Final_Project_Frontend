import "../ModalWithForm/ModalWithForm.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";

function RegisterModal({
  isOpen,
  handleCloseModal,
  onRegister,
  handleSwitchToLogin,
  registerError,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [userNameError, setUserNameError] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    setEmail("");
    setPassword("");
    setUserName("");
    setEmailError("");
    setPasswordError("");
    setUserNameError("");
  }, [isOpen]);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
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

  function canSubmit() {
    return (
      emailRegex.test(email) &&
      password.length >= 6 &&
      userName.trim().length > 0 &&
      !emailError &&
      !passwordError &&
      !userNameError
    );
  }

  const handleRegisterFormSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit()) return;
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
          aria-invalid={!!emailError}
          aria-describedby="register-email-error"
        />
        {emailError && (
          <span
            id="register-email-error"
            className="modal__error"
            role="alert"
            aria-live="assertive"
          >
            {emailError}
          </span>
        )}
      </label>
      <label htmlFor="register-password" className="modal__label">
        Password
        <input
          id="register-password"
          type="password"
          className="modal__input"
          placeholder="Enter password"
          required
          value={password}
          onChange={handlePasswordChange}
          aria-invalid={!!passwordError}
          aria-describedby="register-password-error"
        />
        {passwordError && (
          <span
            id="register-password-error"
            className="modal__error"
            role="alert"
            aria-live="assertive"
          >
            {passwordError}
          </span>
        )}
      </label>
      <label htmlFor="username-register" className="modal__label">
        Username
        <input
          id="username-register"
          type="text"
          className="modal__input"
          placeholder="Enter your username"
          required
          value={userName}
          onChange={handleUserNameChange}
          aria-invalid={!!userNameError}
          aria-describedby="register-username-error"
        />
        {userNameError && (
          <span
            id="register-username-error"
            className="modal__error"
            role="alert"
            aria-live="assertive"
          >
            {userNameError}
          </span>
        )}
      </label>
      <div className="modal__action">
        {registerError && (
          <span
            className="modal__form-error"
            role="alert"
            aria-live="assertive"
          >
            {registerError}
          </span>
        )}
        <button type="submit" className="modal__button" disabled={!canSubmit()}>
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
