import React from "react";
import "./ModalWithForm.css";

function ModalWithForm({
  children,
  title,
  buttonText,
  handleCloseModal,
  onSubmit,
}) {
  return (
    <div className={`modal ${isOpen ? "modal__opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
      </div>
    </div>
  );
}

export default ModalWithForm;
