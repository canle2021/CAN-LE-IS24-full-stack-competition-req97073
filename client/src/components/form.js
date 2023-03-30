import React from "react";
import "../styles/form.css";
const InformationForm = ({
  handleChange,
  handleSubmit,
  buttonName,
  product,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Product Name (required)"
        type="text"
        name="productName"
        required
        defaultValue={product !== undefined ? product.productName : undefined}
        onChange={handleChange}

        // incase of edit, this value will be showed in the input as a default value
        // it's very confinient for the users who don't want to re-fill everything when do editting
        // the same with other inputs below.
      />
      <input
        placeholder="Scrum Master Name (required)"
        type="text"
        name="scrumMasterName"
        required
        onChange={handleChange}
        defaultValue={
          product !== undefined ? product.scrumMasterName : undefined
        }
        // defaultValue renders the input value of the old-version data of product before editting
      />
      <input
        placeholder="Product Owner Name (required)"
        type="text"
        name="productOwnerName"
        required
        onChange={handleChange}
        defaultValue={
          product !== undefined ? product.productOwnerName : undefined
        }
      />
      <small>Developers list. Developer 1 must be filled:</small>
      <input
        placeholder="Developer 1"
        type="text"
        name="developer1"
        required
        onChange={handleChange}
        defaultValue={product !== undefined ? product.developers[0] : undefined}
      />
      <input
        placeholder="Developer 2"
        type="text"
        name="developer2"
        onChange={handleChange}
        defaultValue={
          product !== undefined && product.developers[1]
            ? product.developers[1]
            : undefined
        }
      />
      <input
        placeholder="Developer 3"
        type="text"
        name="developer3"
        onChange={handleChange}
        defaultValue={
          product !== undefined && product.developers[3]
            ? product.developers[2]
            : undefined
        }
      />
      <input
        placeholder="Developer 4"
        type="text"
        name="developer4"
        onChange={handleChange}
        defaultValue={
          product !== undefined && product.developers[3]
            ? product.developers[3]
            : undefined
        }
      />
      <input
        placeholder="Developer 5"
        type="text"
        name="developer5"
        onChange={handleChange}
        defaultValue={
          product !== undefined && product.developers[4]
            ? product.developers[4]
            : undefined
        }
      />
      {buttonName !== "edit" ? (
        <div>
          {" "}
          <small>Start date:</small>
          <input
            type="date"
            name="startDate"
            required
            onChange={handleChange}
          />
        </div>
      ) : null}

      <select
        name="methodology"
        required
        onChange={handleChange}
        defaultValue={product !== undefined ? product.methodology : "default"}
      >
        <option value={"*default*"} required>
          Methodology
        </option>
        <option value="agile" required>
          Agile
        </option>
        <option value="waterfall" required>
          Waterfall
        </option>
      </select>

      <input
        id="submitButton"
        type="submit"
        value="Save"
        name="confirmButton"
      ></input>
    </form>
  );
};

export default InformationForm;
