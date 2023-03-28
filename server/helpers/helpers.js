const productsDataPath = "../data/productsData.json";

const fs = require("fs");
// "fs is file system, this tool will help to read and write in memmory json file: productsData.jon"
const saveProductData = (data) => {
  const stringifyData = JSON.stringify(data, null, 2);
  //   null, 2 to have a better format when saving to the file
  fs.writeFileSync(productsDataPath, stringifyData);
};
// saveProductData function to save new object
const getProductsData = () => {
  const jsonData = fs.readFileSync(productsDataPath);
  return JSON.parse(jsonData);
};
//  getProductsData function to read json file
module.exports = {
  saveProductData,
  getProductsData,
};
