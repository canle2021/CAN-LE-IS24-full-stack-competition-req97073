import React, { useState } from "react";
import "../styles/button.css";
import ReactModal from "react-modal";
import { modalStyles } from "../styles/modalStyle";
const Button = ({ text, onclick }) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };
  const afterOpenModal = () => {};

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>{text}</button>
      <ReactModal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={modalStyles}
      >
        <h2>Add product</h2>
      </ReactModal>
    </div>
  );
};

export default Button;
