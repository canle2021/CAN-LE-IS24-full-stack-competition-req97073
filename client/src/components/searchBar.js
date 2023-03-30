import React, { useState, useContext } from "react";
import "../styles/form.css";
import { AppContext } from "./context/context";
const SearchBar = ({ productsData }) => {
  const [values, setValues] = useState({});
  const { searchWithScrumMaster, setSearchWithScrumMaster, setStartSearch } =
    useContext(AppContext);
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
    try {
      const posting = await fetch(`/api/search-scrum-master`, {
        method: "POST",
        body: JSON.stringify(objectToBePosted),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const converToJson = await posting.json();

      if (converToJson.status === 200) {
        setSearchWithScrumMaster(converToJson.data);
        // assign found products list with the result array
      } else {
        setSearchWithScrumMaster([]);
        // search result shoud be empty if nothing matches

        throw new Error(
          `http error code: ${converToJson.status}, message: ${converToJson.message}`
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
  const endSearchHandler = () => {
    setStartSearch(false);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Scrum Master Name"
          type="text"
          name="scrumMasterName"
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
