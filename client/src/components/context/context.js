// this file will help to make our variable to be global,
// can be used everywhere in our app.
import React, { useState, createContext } from "react";
export const AppContext = createContext();
export const AppProvider = ({ children }) => {
  const [productsData, setProductsData] = useState([]);
  const [searchResultArray, setSearchResultArray] = useState([]);
  const [startSearch, setStartSearch] = useState(false);
  const [searchValues, setSearchValues] = useState({});
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

  const fetchSearchDataAgain = async () => {
    try {
      let apiAddress = "";
      if (searchValues.searchBy === "scrumMaster") {
        apiAddress = `/api/search-scrum-master`;
      } else if (searchValues.searchBy === "developer") {
        apiAddress = `/api/search-developer`;
      }
      const posting = await fetch(apiAddress, {
        method: "POST",
        body: JSON.stringify(searchValues),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const converToJson = await posting.json();
      if (converToJson.status === 200) {
        setSearchResultArray(converToJson.data);
        // assign found products list with the result array
      } else {
        setSearchResultArray([]);
        // search result shoud be empty if nothing matches

        throw new Error(
          `http error code: ${converToJson.status}, message: ${converToJson.message}`
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <AppContext.Provider
      value={{
        productsData,
        setProductsData,
        fetchDataAgain,
        searchResultArray,
        setSearchResultArray,
        startSearch,
        setStartSearch,
        searchValues,
        setSearchValues,
        fetchSearchDataAgain,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
