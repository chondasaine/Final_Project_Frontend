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
  const [signInError, setSignInError] = useState("");

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
    setSignInError("");
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (value.length <= 6) {
      setPasswordError("Invalid password");
    } else {
      setPasswordError("");
    }
    setSignInError("");
  };

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
      setEmailError("");
      setPasswordError("");
      setSignInError("");
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

  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();
    setSignInError("");

    try {
      await onLogin({ email, password });
    } catch (err) {
      console.error("Login failed:", err.message);
      setSignInError("Email or password is incorrect");
    }
  };

  return (
    <ModalWithForm
      title="Sign in"
      isOpen={isOpen}
      handleCloseModal={handleCloseModal}
      onSubmit={handleLoginFormSubmit}
    >
      <label htmlFor="login-email" className="modal__label">
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
          <span
            id="email-error"
            className="modal__error"
            role="alert"
            aria-live="assertive"
          >
            {emailError}
          </span>
        )}
      </label>
      <label htmlFor="login-password" className="modal__label">
        Password
        <input
          id="login-password"
          type="password"
          className="modal__input"
          placeholder="Enter password"
          required
          value={password}
          onChange={handlePasswordChange}
          aria-invalid={!!passwordError}
          aria-describedby="password-error"
        />
        {passwordError && (
          <span
            id="password-error"
            className="modal__error"
            role="alert"
            aria-live="assertive"
          >
            {passwordError}
          </span>
        )}
      </label>
      <div className="modal__action">
        {signInError && (
          <span className="modal__error" role="alert" aria-live="assertive">
            {signInError}
          </span>
        )}
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
      </div>
    </ModalWithForm>
  );
}

export default LoginModal;
