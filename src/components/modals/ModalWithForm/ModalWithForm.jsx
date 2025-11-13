import "./ModalWithForm.css";
import { useEffect } from "react";

function ModalWithForm({
  children,
  title,
  isOpen,
  handleCloseModal,
  onSubmit,
}) {
  useEffect(() => {
    if (isOpen) document.body.classList.add("modal-open");
    else document.body.classList.remove("modal-open");
    return () => document.body.classList.remove("modal-open");
  }, [isOpen]);

  return (
    <div className={`modal ${isOpen ? "modal__opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
        </form>
      </div>
      <button
        type="button"
        className="modal__close"
        onClick={handleCloseModal}
      ></button>
    </div>
  );
}

export default ModalWithForm;
