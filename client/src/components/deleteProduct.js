import React, { useContext } from "react";
import { AppContext } from "./context/context";
const DeleteProduct = ({ product, closeModal }) => {
  const { fetchDataAgain } = useContext(AppContext);
  const handleDelete = async () => {
    try {
      const posting = await fetch(`/api/delete-product/${product.productId}`, {
        method: "DELETE",
        // body: JSON.stringify(objectToBePosted),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const converToJson = await posting.json();

      if (converToJson.status === 200) {
        alert(
          `THANK YOU! You successfully deleted the product with id ${converToJson.data}
              `
        );
        fetchDataAgain();
        // get products data again
      } else {
        alert(
          `* DELETE PRODUCT ERROR ALERT * Sorry! For some reasons, you can not delete the product ${product.productName} at this time.`
        );
        throw new Error(
          `http error code: ${converToJson.status}, message: ${converToJson.message}`
        );
      }
    } catch (err) {
      console.log(err);
    }
    closeModal();
  };

  return (
    <div>
      <h3>Are you going to delete the product with id: {product.productId}?</h3>
      <div>
        <button onClick={handleDelete}>yes</button>
        <button onClick={closeModal}>no</button>
      </div>
    </div>
    // pass this props to the InformationForm component
  );
};

export default DeleteProduct;
