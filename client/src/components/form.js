import React from "react";
import "../styles/form.css";
const InformationForm = ({ handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Product Name (required)"
        type="text"
        name="productName"
        required
        onChange={handleChange}
      />
      <input
        placeholder="Scrum Master Name (required)"
        type="text"
        name="scrumMasterName"
        required
        onChange={handleChange}
      />
      <input
        placeholder="Product Owner Name (required)"
        type="text"
        name="productOwnerName"
        required
        onChange={handleChange}
      />
      <small>Developers list. Developer 1 must be filled:</small>
      <input
        placeholder="Developer 1"
        type="text"
        name="developer1"
        required
        onChange={handleChange}
      />
      <input
        placeholder="Developer 2"
        type="text"
        name="developer2"
        onChange={handleChange}
      />
      <input
        placeholder="Developer 3"
        type="text"
        name="developer3"
        onChange={handleChange}
      />
      <input
        placeholder="Developer 4"
        type="text"
        name="developer4"
        onChange={handleChange}
      />
      <input
        placeholder="Developer 5"
        type="text"
        name="developer5"
        onChange={handleChange}
      />
      <small>Start date:</small>
      <input type="date" name="startDate" required onChange={handleChange} />
      <select
        name="methodology"
        required
        onChange={handleChange}
        defaultValue={"default"}
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
