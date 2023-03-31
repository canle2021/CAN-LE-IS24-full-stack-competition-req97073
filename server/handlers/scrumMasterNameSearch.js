"use strict";
const { getProductsData } = require("../helpers/helpers.js");

/**********************************************************/
/*   post: find Scrum Master Name
/**********************************************************/

const scrumMasterNameSearch = async (req, res) => {
  const body = req.body;
  // supposed the posting method wil have a req.body with this format:
  //{
  // "scrumMasterName": "AAA"
  // }

  if (!body.scrumMasterName) {
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
      if (
        product.scrumMasterName
          .toLowerCase()
          .includes(body.scrumMasterName.toLowerCase())
      ) {
        resultArray.push(product);
      }
    });
    // search base on lower case.
    if (resultArray.length < 1) {
      return res.status(400).json({
        status: 400,
        data: {},
        message: `Sorry. Could not find a list of product(s) with scurm master: ${body.scrumMasterName}`,
      });
    }
    return res.status(200).json({
      status: 200,
      data: resultArray,
      message: ` The list of product(s) with scurm master: ${body.scrumMasterName} was successfully found`,
    });
  } catch (error) {
    console.log("Search by scrum master:", error);
    return res.status(500).json({
      status: 500,
      message: ` Sorry, can not find the list of product(s) with scurm master: ${body.scrumMasterName} for some reason`,
    });
  }
};

module.exports = {
  scrumMasterNameSearch,
};
