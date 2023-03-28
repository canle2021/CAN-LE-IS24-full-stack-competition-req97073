"use strict";
const { saveProductData, getProductsData } = require("../helpers/helpers.js");

/**********************************************************/
/*   delete: product
/**********************************************************/

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  // id will be use after this api, indicate which product's id you want to delete

  try {
    let existingProducts = await getProductsData();
    const arrayOfProductsData = Object.values(existingProducts);
    const findProductWillBeEdited = arrayOfProductsData.findIndex(
      (product) => product.productId === id
    );

    if (findProductWillBeEdited == -1) {
      return res.status(400).json({
        status: 400,
        data: {},
        message: `Sorry. The product with id :${id} does not exist!`,
      });
    }
    // will return error message if can not find the product you want to edit.

    delete existingProducts[id];
    // this method will overwrite the productsData.json's old version by deleting the object.
    saveProductData(existingProducts);
    return res.status(200).json({
      status: 200,
      data: id,
      message: ` The product with id: ${id} was successfully deleted`,
    });
  } catch (error) {
    console.log("Add product error:", error);
    return res.status(500).json({
      status: 500,
      message: ` Sorry, the product with id: ${id} was NOT successfully deleted for some reason`,
    });
  }
};

module.exports = {
  deleteProduct,
};
