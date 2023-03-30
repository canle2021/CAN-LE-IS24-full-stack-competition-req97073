// this file will help to make our variable to be global,
// can be used everywhere in our app.
import React, { useState, createContext } from "react";

export const AppContext = createContext();
export const AppProvider = ({ children }) => {
  const [productsData, setProductsData] = useState([]);
  const fetchDataAgain = () => {
    fetch(`/api/get-all-products`)
      .then((res) => {
        if (res.status !== 200) {
          window.location.reload(false);
          throw new Error(
            `http error code: ${res.status}, message: ${res.statusText}`
          );
          // incase of deleting the last product, the page can not renders
          // automatically because of catching an error of fetching empty json data, then
          // window.location.reload(false) will help to refresh the page where the last
          // item was deleted.
        }
        return res.json();
      })
      .then((data) => {
        setProductsData(data.data || []);
      })
      .catch((err) => {
        console.log("fetching data error:", err);
      });
  };
  //   fetchDataAgain() will be called when click Save button
  return (
    <AppContext.Provider
      value={{
        productsData,
        setProductsData,
        fetchDataAgain,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
