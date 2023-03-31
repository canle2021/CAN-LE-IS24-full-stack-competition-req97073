"use strict";
const { getProductsData } = require("../helpers/helpers.js");

/**********************************************************/
/*   post: search by developer Name
/**********************************************************/

const developerNameSearch = async (req, res) => {
  const body = req.body;
  console.log("body", body);
  // supposed the posting method wil have a req.body with this format:
  //{
  // "developerName": "AAA"
  // }

  if (!body.developerName) {
    return res.status(400).json({
      status: 400,
      data: {},
      message: "Sorry. Please provide all the required information ",
    });
  }
  // validate all information is provided
  try {
    let existingProducts = await getProductsData();
    const arrayOfProductsData = Object.values(existingProducts);
    // convert {} data to an array
    let resultArray = [];
    arrayOfProductsData.forEach((product) => {
      product.developers.forEach((developer) => {
        if (
          developer.toLowerCase().includes(body.developerName.toLowerCase())
        ) {
          resultArray.push(product);
        }
      });
    });
    // search base on lower case.
    if (resultArray.length < 1) {
      return res.status(400).json({
        status: 400,
        data: {},
        message: `Sorry. Could not find a list of product(s) with developer: ${body.developerName}`,
      });
    }
    return res.status(200).json({
      status: 200,
      data: resultArray,
      message: ` The list of product(s) with developer: ${body.developerName} was successfully found`,
    });
  } catch (error) {
    console.log("Search developer:", error);
    return res.status(500).json({
      status: 500,
      message: ` Sorry, can not find the list of product(s) with developer: ${body.developerName} for some reason`,
    });
  }
};

module.exports = {
  developerNameSearch,
};
