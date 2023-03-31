"use strict";
const { saveProductData, getProductsData } = require("../helpers/helpers.js");

/**********************************************************/
/*   put: update product
/**********************************************************/

const updateProduct = async (req, res) => {
  const body = req.body;

  // supposed the posting method wil have a req.body with this format:
  //{
  // "productId": "5c6096c8-7ae8-493d-bee6-2fd5db4584be",
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
  // "startDate": "2023-01-19",
  // "methodology": "agile"
  // }

  if (
    !body.productId ||
    !body.productName ||
    !body.productOwnerName ||
    !body.developers ||
    !body.scrumMasterName ||
    !body.methodology ||
    !body.startDate
  ) {
    return res.status(400).json({
      status: 400,
      data: {},
      message: "Sorry. Please provide all the required information ",
    });
  }
  // validate all information is provided
  if (body.developers.length > 5) {
    return res.status(400).json({
      status: 400,
      data: {},
      message: "Sorry. Developer Names list should be up to 5.",
    });
  }
  // validate developers list only has 5 people
  try {
    let existingProducts = await getProductsData();
    const arrayOfProductsData = Object.values(existingProducts);
    const findProductWillBeEdited = arrayOfProductsData.findIndex(
      (product) => product.productId === body.productId
    );

    if (findProductWillBeEdited == -1) {
      return res.status(400).json({
        status: 400,
        data: {},
        message: `Sorry. The product with id :${body.productId} does not exist!`,
      });
    }
    //  findIndex will return -1 if nothing found.
    // will return error message if can not find the product you want to edit.

    existingProducts[body.productId] = body;
    // this method will overwrite the productsData.json's old version + add new object.
    saveProductData(existingProducts);
    return res.status(200).json({
      status: 200,
      data: body.productId,
      message: ` The product with id: ${body.productId} was successfully updated`,
    });
  } catch (error) {
    console.log("Edit product error:", error);
    return res.status(500).json({
      status: 500,
      message: ` Sorry, the new product was NOT successfully updated for some reason`,
    });
  }
};

module.exports = {
  updateProduct,
};
