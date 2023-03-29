import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
const Table = () => {
  const [productsData, setProductsData] = useState([]);
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
        if (!res.ok) {
          throw new Error("fetching products data error");
        }
        return res.json();
      })
      .then((data) => {
        setProductsData(data.data || []);
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return loading === true ? (
    <ReactLoading
      type={"spinningBubbles"}
      color={"blue"}
      height={50}
      width={50}
    />
  ) : (
    <table>
      <tbody>
        <tr>
          {columnNamesList.map((head, index) => (
            <th key={index}>{head}</th>
          ))}
        </tr>
        {productsData.map((product, index) => (
          <tr key={index}>
            <td>{product.productId}</td>
            <td>{product.productName}</td>
            <td>{product.scrumMasterName}</td>
            <td>{product.productOwnerName}</td>
            <td>
              <ol>
                {product.developers.map((developer, index) => (
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
  );
};

export default Table;
