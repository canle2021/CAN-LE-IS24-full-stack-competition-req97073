import React, { useState, useContext } from "react";
import { AppContext } from "./context/context";
import InformationForm from "./form";
const EditProduct = ({ buttonName, product }) => {
  const { fetchDataAgain, fetchSearchDataAgain } = useContext(AppContext);
  const [values, setValues] = useState({});
  let developersArray = [];
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value.trim();
    // to trim any white space at the the begining
    setValues((values) => ({ ...values, [name]: value }));
    // values is just a temperary variable which is holding an object contents inputs
    // "name" in input form is the key of key-value pair
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // preventDefault to prevent the action of erase everything of the form and get empty objectToBePosted
    if (
      (values.methodology === "*default*" ||
        values.methodology === undefined) &&
      product.methodology === undefined
      // product.methodology === undefined means there was no methodology in old version
    ) {
      window.alert("Please provide the methodology!");
      return;
    }
    // we dont want *default* value is acceptable in methodology
    for (let i = 1; i < 6; i++) {
      if (
        values[`developer${i}`] !== "" &&
        values[`developer${i}`] !== undefined
      ) {
        developersArray.push(values[`developer${i}`]);
      }
      if (
        values[`developer${i}`] === undefined &&
        product.developers[i - 1] !== undefined
        // because i is from 1, so index on developers will start at 0
      ) {
        developersArray.push(product.developers[i - 1]);
      }
    }
    // take all the developer names and push to the array
    // if  you dont want to change any developer's name, it's still in the submitted data
    if (developersArray.length > 5) {
      window.alert("The developer number should not be >5.");
      return;
    }
    // onchange only triggers when something changes in input otherwise the value will be undefine.
    // I want the users don't have to re-input the whole text, but they can submit/keep the old input value if they want.
    let objectToBePosted = {
      productId: product.productId,
      productName:
        values.productName === undefined
          ? product.productName
          : values.productName,
      scrumMasterName:
        values.scrumMasterName === undefined
          ? product.scrumMasterName
          : values.scrumMasterName,
      productOwnerName:
        values.productOwnerName === undefined
          ? product.productOwnerName
          : values.productOwnerName,
      developers: developersArray,
      startDate: product.startDate,
      methodology:
        values.methodology === undefined
          ? product.methodology
          : values.methodology,
    };

    try {
      const posting = await fetch(`/api/update-product`, {
        method: "PUT",
        body: JSON.stringify(objectToBePosted),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const converToJson = await posting.json();

      if (converToJson.status === 200) {
        alert(
          `THANK YOU! You successfully edit the product with id ${converToJson.data}
              `
        );
        fetchDataAgain();
        // get products data again
        fetchSearchDataAgain();
        // incase you want to edit product while searching
      } else {
        alert(
          `* EDIT PRODUCT ERROR ALERT * Sorry! For some reasons, you can not edit the product ${objectToBePosted.productName} at this time.`
        );
        throw new Error(
          `http error code: ${converToJson.status}, message: ${converToJson.message}`
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <InformationForm
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      buttonName={buttonName}
      product={product}
    />
    // pass this props to the InformationForm component
  );
};

export default EditProduct;
