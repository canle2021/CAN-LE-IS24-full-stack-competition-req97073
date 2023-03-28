"use strict";
const { v4: uuidv4 } = require("uuid");
const { saveProductData, getProductsData } = require("../helpers/helpers.js");

/**********************************************************/
/*   post :create new product
/**********************************************************/

const createProduct = async (req, res) => {
  const body = req.body;

  // supposed the posting method wil have a req.body with this format:
  //{
  //     "productName": "Agriculture and Food",
  //     "scrumMaster": "Kaia Propper"
  //     "productOwner": "Janka Brown",
  //     "developerNames": ["Pepita Lemmanbie",
  //                        "Hedvige Tuberfield",
  //                        "Annecorinne Spurett",
  //                        "Cacilie Donet",
  //                        "Edouard Moir""]
  //     "startDate": "2022/12/23"
  //     "methodology": "waterfall"
  // }

  const newProduct = {
    _id: uuidv4(),
    ...body,
  };
  if (
    !body.productName ||
    !body.scrumMaster ||
    !body.productOwner ||
    !body.developerNames ||
    !body.startDate ||
    !body.methodology
  ) {
    return res.status(400).json({
      status: 400,
      data: {},
      message: "Sorry. Please provide all the required information ",
    });
  }

  if (body.developerNames.length > 5) {
    return res.status(400).json({
      status: 400,
      data: {},
      message: "Sorry. Developer Names should be up to 5 ",
    });
  }
  try {
    let existingProducts = await getProductsData();
    existingProducts[newProduct._id] = newProduct;
    // this method will overwrite the productsData.js's old version + add new object.
    saveProductData(existingProducts);
    return res.status(200).json({
      status: 200,
      data: newProduct._id,
      message: ` The product with id: ${newProduct._id} was successfully added`,
    });
  } catch (error) {
    console.log("Add product error:", error);
    return res.status(500).json({
      status: 500,
      message: ` Sorry, the product with id: ${newProduct._id} was NOT successfully added for some reason`,
    });
  }
};

module.exports = {
  createProduct,
};
