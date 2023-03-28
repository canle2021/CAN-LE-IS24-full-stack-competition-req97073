"use strict";
const fs = require("fs");
const productsData = require("../data/productsData.json");
/**********************************************************/
/*   get :  all products
/**********************************************************/

const getProductsData = async (req, res) => {
  let numberOfEmptyObjects = 0;

  if (productsData.length < 1) {
    return res.status(204).json({
      status: 204,
      message: "Sorry. There is no product to retrieve!",
      data: {},
    });
  }
  //  to check products array has a length = 0

  productsData.forEach((product) => {
    if (Object.keys(product).length === 0) {
      numberOfEmptyObjects += 1;
    }
  });
  if (numberOfEmptyObjects == productsData.length) {
    return res.status(204).json({
      status: 204,
      message: "Sorry. There is no product to retrieve!",
      data: {},
    });
  }
  //  to check products array has all empty objects

  console.log("fs", fs);
  return res.status(200).json({
    status: 200,
    message: `You sucessfully retrieve all products' data!`,
    data: productsData,
  });
};

module.exports = {
  getProductsData,
};
