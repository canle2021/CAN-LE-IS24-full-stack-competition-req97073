"use strict";

const { getProductsData } = require("../helpers/helpers.js");
/**********************************************************/
/*   get :  all products
/**********************************************************/

const getAllProductsData = async (req, res) => {
  try {
    let existingProducts = await getProductsData();
    const arrayOfProductsData = Object.values(existingProducts);
    let numberOfEmptyObjects = 0;

    if (arrayOfProductsData.length < 1) {
      return res.status(204).json({
        status: 204,
        message: "Sorry. There is no product to retrieve!",
        data: {},
      });
    }
    //  to check products array has a length = 0

    arrayOfProductsData.forEach((product) => {
      if (Object.keys(product).length === 0) {
        numberOfEmptyObjects += 1;
      }
    });
    if (numberOfEmptyObjects == arrayOfProductsData.length) {
      return res.status(204).json({
        status: 204,
        message: "Sorry. There is no product to retrieve!",
        data: {},
      });
    }
    //  to check products array has all empty objects
    return res.status(200).json({
      status: 200,
      message: `You sucessfully retrieve all products' data!`,
      data: arrayOfProductsData,
    });
  } catch (err) {
    console.log(err);
    return res.status(204).json({
      status: 500,
      message: "Sorry. There are some error in get products handler!",
      data: {},
    });
  }
};

module.exports = {
  getAllProductsData,
};
