import React, { useState } from "react";
import "../styles/button.css";
import ReactModal from "react-modal";
// we use ReactModal dependency
import { modalStyles } from "../styles/modalStyle";
import EditProduct from "./editProduct";
import PostNewProduct from "./postNewProduct";
import DeleteProduct from "./deleteProduct";
const Button = ({ buttonName, product }) => {
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
      <button onClick={openModal}>{buttonName}</button>
      <ReactModal
        //   all the configs of ReactModal dependency
        ariaHideApp={false}
        // the appElement should not be hidden
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={modalStyles}
      >
        {buttonName === "Add product" ? <h2>Add product</h2> : null}
        {buttonName === "edit" ? <h2>Edit product</h2> : null}
        {buttonName === "delete" ? <h2>Delete product action</h2> : null}
        {buttonName === "Add product" ? (
          <PostNewProduct buttonName={buttonName} closeModal={closeModal} />
        ) : null}
        {buttonName === "edit" ? (
          <EditProduct
            buttonName={buttonName}
            product={product}
            closeModal={closeModal}
          />
        ) : null}
        {buttonName === "delete" ? (
          <DeleteProduct
            buttonName={buttonName}
            product={product}
            closeModal={closeModal}
          />
        ) : null}
      </ReactModal>
    </div>
  );
};

export default Button;
