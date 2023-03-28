const productsDataPath = "../data/productsData.json";

const fs = require("fs");
// "fs is file system, this tool will help to read and write in memmory json file: productsData.jon"
const saveProductData = (data) => {
  try {
    const stringifyData = JSON.stringify(data, null, 2);
    //   null, 2 to have a better format when saving to the file
    fs.writeFileSync(productsDataPath, stringifyData);
  } catch (error) {
    console.log("save product data helper error: ", error);
  }
};
// saveProductData function to save new object
const getProductsData = () => {
  try {
    const jsonData = fs.readFileSync(productsDataPath);
    return JSON.parse(jsonData);
  } catch (error) {
    console.log("get products data helper error: ", error);
  }
};
//  getProductsData function to read json file
module.exports = {
  saveProductData,
  getProductsData,
};
