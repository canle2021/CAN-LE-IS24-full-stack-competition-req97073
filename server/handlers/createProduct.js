"use strict";
const { v4: uuidv4 } = require("uuid");
const { saveProductData, getProductsData } = require("../helpers/helpers.js");

/**********************************************************/
/*   post: create new product
/**********************************************************/

const createProduct = async (req, res) => {
  const body = req.body;

  // supposed the posting method wil have a req.body with this format:
  //{
  // "productName": "Emergency Management",
  // "productOwnerName": "Mackenzie McPaike",
  // "developers": [
  //   "Scottie Eul",
  //   "Antonin Slewcock",
  //   "Morry Wait",
  //   "Salome Birdall",
  //   "Grenville Hoffner"
  // ],
  // "scrumMasterName": "Baudoin Dombrell",
  // "startDate": "2022/12/21",
  // "methodology": "agile"
  // }

  const newProduct = {
    productId: uuidv4(),
    ...body,
  };
  if (
    !body.productName ||
    !body.productOwnerName ||
    !body.developers ||
    !body.scrumMasterName ||
    !body.startDate ||
    !body.methodology
  ) {
    return res.status(400).json({
      status: 400,
      data: {},
      message: "Sorry. Please provide all the required information ",
    });
  }

  if (body.developers.length > 5) {
    return res.status(400).json({
      status: 400,
      data: {},
      message: "Sorry. Developer Names should be up to 5 ",
    });
  }
  try {
    let existingProducts = await getProductsData();
    existingProducts[newProduct.productId] = newProduct;
    // this method will overwrite the productsData.json's old version + add new object.
    saveProductData(existingProducts);
    return res.status(200).json({
      status: 200,
      data: newProduct.productId,
      message: ` The product with id: ${newProduct.productId} was successfully added`,
    });
  } catch (error) {
    console.log("Add product error:", error);
    return res.status(500).json({
      status: 500,
      message: ` Sorry, the new product was NOT successfully added for some reason`,
    });
  }
};

module.exports = {
  createProduct,
};
