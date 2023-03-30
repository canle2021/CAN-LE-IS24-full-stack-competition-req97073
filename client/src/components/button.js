import React, { useState } from "react";
import "../styles/button.css";
import ReactModal from "react-modal";
// we use ReactModal dependency
import { modalStyles } from "../styles/modalStyle";
import EditProduct from "./editProduct";
import PostNewProduct from "./postNewProduct";
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
        //   all the configs of ReactModal dependency
        ariaHideApp={false}
        // the appElement should not be hidden
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={modalStyles}
      >
        {text === "Add product" ? <h2>Add product</h2> : null}
        {text === "edit" ? <h2>Edit product</h2> : null}

        <PostNewProduct />
      </ReactModal>
    </div>
  );
};

export default Button;
