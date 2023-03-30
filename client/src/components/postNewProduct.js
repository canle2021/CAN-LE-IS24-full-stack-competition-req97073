import React, { useState } from "react";

import InformationForm from "./form";
const PostNewProduct = () => {
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
      values.methodology === "*default*" ||
      values.methodology === undefined
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
    }
    // take all the developer names
    if (developersArray.length > 5) {
      window.alert("The developer number should not be >5.");
      return;
    }
    let objectToBePosted = {
      productName: values.productName,
      scrumMasterName: values.scrumMasterName,
      productOwnerName: values.productOwnerName,
      developers: developersArray,
      startDate: values.startDate,
      methodology: values.methodology,
    };
    // dont forget to fetch after post
    try {
      const posting = await fetch(`/api/create-product`, {
        method: "POST",
        body: JSON.stringify(objectToBePosted),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const converToJson = await posting.json();

      if (converToJson.status === 200) {
        alert(
          `THANK YOU! You successfully add the new product with id ${converToJson.data}
              `
        );
      } else {
        alert(
          `* ADD NEW PRODUCT ERROR ALERT * Sorry! For some reasons, you can not add product ${objectToBePosted.productName} at this time.`
        );
      }
    } catch (err) {
      console.log("add new product error", err);
    }
    console.log("objectToBePosted", objectToBePosted);
  };

  return (
    <InformationForm handleChange={handleChange} handleSubmit={handleSubmit} />
    // pass this props to the InformationForm component
  );
};

export default PostNewProduct;