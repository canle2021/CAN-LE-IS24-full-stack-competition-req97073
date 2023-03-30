import React, { useEffect, useState, useContext } from "react";
import ReactLoading from "react-loading";
import Button from "./button";
import "../styles/table.css";
import { AppContext } from "./context/context";
const Table = () => {
  // const [productsData, setProductsData] = useState([]);
  const { productsData, setProductsData } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const columnNamesList = [
    "Product Number",
    "Product Name",
    "Scrum Master",
    "Product Owner",
    "Developer Names",
    " Start Date",
    "Methodology",
  ];
  // this useEffect allows to fetch data once/render
  useEffect(() => {
    fetch(`/api/get-all-products`)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(
            `http error code: ${res.status}, message: ${res.statusText}`
          );
        }
        return res.json();
      })
      .then((data) => {
        setProductsData(data.data || []);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
    // I want this useEffect to be used only once when render
    // eslint-disable-next-line
  }, []);

  return loading === true ? (
    <ReactLoading
      type={"spinningBubbles"}
      color={"blue"}
      height={50}
      width={50}
    />
  ) : (
    <div>
      {productsData.length === 0 ? (
        <h2>There is no product to show.</h2>
      ) : (
        // incase no product in list, we should know about that.
        <div>
          <div id="tableTopLine">
            <p>Total number of products: {productsData.length}</p>
            <Button text="Add product"></Button>
          </div>

          <table id="products">
            <tbody>
              <tr>
                {columnNamesList.map((head, index) => (
                  <th key={index}>{head}</th>
                ))}
              </tr>
              {productsData.map((product, index) => (
                // map method will render each product
                <tr key={index}>
                  <td>{product.productId}</td>
                  <td>{product.productName}</td>
                  <td>{product.scrumMasterName}</td>
                  <td>{product.productOwnerName}</td>
                  <td>
                    <ol>
                      {product.developers.map((developer, index) => (
                        // map method will render each developer's name
                        <li key={index}>{developer}</li>
                      ))}
                    </ol>
                  </td>
                  <td>{product.startDate}</td>
                  <td>{product.methodology}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Table;
