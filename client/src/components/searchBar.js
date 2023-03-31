import React, { useState, useContext } from "react";
import "../styles/form.css";
import { AppContext } from "./context/context";
const SearchBar = () => {
  const [values, setValues] = useState({});
  const { setSearchResultArray, setStartSearch } = useContext(AppContext);
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value.trim();
    // to trim any white space at the the begining
    setValues((values) => ({ ...values, [name]: value }));
    // values is just a temperary variable which is holding an object contents inputs
    // "name" in input form is the key of key-value pair
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // preventDefault to prevent the action of erase everything of the form and get
    // an empty objectToBePosted
    setStartSearch(true);
    const objectToBePosted = { ...values };
    // copy values to objectToBePosted
    try {
      let apiAdress = "";
      if (values.searchBy === "scrumMaster") {
        apiAdress = `/api/search-scrum-master`;
      } else if (values.searchBy === "developer") {
        apiAdress = `/api/search-developer`;
      }
      const posting = await fetch(apiAdress, {
        method: "POST",
        body: JSON.stringify(objectToBePosted),
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
    setValues({});
    // reset values after submittion
  };
  const endSearchHandler = () => {
    setStartSearch(false);
  };
  return (
    <div>
      <select name="searchBy" required onChange={handleChange}>
        <option value={"*default*"} required>
          Search by:
        </option>
        <option value="scrumMaster" required>
          Scrum master
        </option>
        <option value="developer" required>
          Developer
        </option>
      </select>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Please choose search by first"
          type="text"
          name={`${values.searchBy === "scrumMaster" ? "scrumMasterName" : ""}${
            values.searchBy === "developer" ? "developerName" : ""
          }`}
          // depending on each search catagory, we transform name to get key words.
          value={`${
            values.searchBy === "scrumMaster"
              ? values.scrumMasterName || ""
              : ""
          }${
            values.searchBy === "developer" ? values.developerName || "" : ""
          }`}
          // depending on each search catagory, we transform values to be posted to the back end.
          required
          onChange={handleChange}
        />

        <input
          id="submitButton"
          type="submit"
          value="Search"
          name="confirmButton"
        ></input>
      </form>
      <button onClick={endSearchHandler}>End search!</button>
    </div>
  );
};

export default SearchBar;
