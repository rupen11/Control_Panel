import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Controlsystem = () => {
  const [getProductData, setGetProductData] = useState([]);
  const getRes = async (req, res) => {
    try {
      const resProduct = await fetch("/productData", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const resData = await resProduct.json();
      setGetProductData(resData);
    } catch (error) {
      console.log("Sorry " + error);
    }
  };
  useEffect(() => {
    getRes();
  }, []);
  let name, value;
  /////////////////////
  const [product, setProduct] = useState({
    customerid: "",
    customername: "",
    email: "",
    contact: "",
    productname: "",
    productprice: "",
    productquantity: "",
    totalamount: "",
  });

  const getProductInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setProduct({ ...product, [name]: value });
  };

  const productSend = async (e) => {
    e.preventDefault();
    try {
      const {
        customerid,
        customername,
        email,
        contact,
        productname,
        productprice,
        productquantity,
        totalamount,
      } = product;
      const productdata = await fetch("/productData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerid,
          customername,
          email,
          contact,
          productname,
          productprice,
          productquantity,
          totalamount,
        }),
      });
      // console.log(productdata);
      if (productdata.status === 200) {
        // console.log("Record Saved");
        window.alert("Record Saved Successfully");
      } else {
        // console.log("Record Not Saved");
        window.alert("Record Not Saved");
      }
      await getRes();
      setProduct({
        customerid: "",
        customername: "",
        email: "",
        contact: "",
        productname: "",
        productprice: "",
        productquantity: "",
        totalamount: "",
      });
    } catch (error) {
      // console.log("Error to product data " + error);
    }
  };

  ///////////////////// Update
  const [productupdate, setProductupdate] = useState({
    customerid: "",
    customername: "",
    email: "",
    contact: "",
    productname: "",
    productprice: "",
    productquantity: "",
    totalamount: "",
  });

  const getProductUpdateInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setProductupdate({ ...productupdate, [name]: value });
  };

  const productUpdateSend = async (e) => {
    e.preventDefault();
    try {
      const {
        customerid,
        customername,
        email,
        contact,
        productname,
        productprice,
        productquantity,
        totalamount,
      } = productupdate;
      const productdata = await fetch("/updateProductData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerid,
          customername,
          email,
          contact,
          productname,
          productprice,
          productquantity,
          totalamount,
        }),
      });
      if (productdata.status === 200) {
        window.alert("Record Updated");
        setProductupdate({
          customerid: "",
          customername: "",
          email: "",
          contact: "",
          productname: "",
          productprice: "",
          productquantity: "",
          totalamount: "",
        });
      } else {
        window.alert("Record Not Updated");
      }
      await getRes();
    } catch (error) {
      // console.log("Error to product update data " + error);
    }
  };

  ///////////////////// Delete
  const [productdelete, setProductdelete] = useState({
    customerid: "",
  });

  const getDeleteProductInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setProductdelete({ ...productdelete, [name]: value });
  };

  const productDeleteSend = async (e) => {
    e.preventDefault();
    try {
      const { customerid } = productdelete;
      const productdata = await fetch("/deleteProductData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerid,
        }),
      });
      // console.log(productdata);
      if (productdata.status === 200) {
        // console.log("Record Deleted");
        window.alert("Record Deleted");
      } else {
        // console.log("Record Not Deleted");
        window.alert("Record Not Deleted");
      }
      await getRes();
    } catch (error) {
      // console.log("Error to product delete data " + error);
    }
  };

  ////////////////// Search
  const [productsearch, setProductsearch] = useState({
    customerid: "",
  });

  const getSearchProductInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setProductsearch({ ...productsearch, [name]: value });
  };

  const [productsearchdata, setProductsearchdata] = useState({
    customerid: "",
    customername: "",
    email: "",
    contact: "",
    productname: "",
    productprice: "",
    productquantity: "",
    totalamount: "",
  });

  const productSearchSend = async (e) => {
    e.preventDefault();
    let searchresultshow = document.querySelector(".searchresult");
    try {
      const { customerid } = productsearch;
      const productdata = await fetch("/searchProductData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerid,
        }),
      });
      let status = productdata.status;
      if (status === 400) {
        window.alert("Record Not Found");
      } else if (status === 200) {
        const data = await productdata.json();
        setProductsearchdata({
          ...productsearchdata,
          customerid: data.customerid,
          customername: data.customername,
          email: data.email,
          contact: data.contact,
          productname: data.productname,
          productprice: data.productprice,
          productquantity: data.productquantity,
          totalamount: data.totalamount,
        });
        searchresultshow.classList.add("active");
      } else {
        window.alert("Record Not Found");
      }
    } catch (error) {
      // console.log("Error to product search data " + error);
    }
  };

  const closeresult = () => {
    let searchresult = document.querySelector(".searchresult");
    searchresult.classList.remove("active");
  };
  return (
    <>
      <div id="control">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="control-panel">
                <i className="fa fa-database"></i>
                <h4>Product Data</h4>
              </div>
              <div className="control-section table-wrapper-scroll-y my-custom-scrollbar">
                <table
                  id="table"
                  className="table table-dark table-striped table-hover"
                >
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Customer Name</th>
                      <th>Mail ID</th>
                      <th>Contact</th>
                      <th>Product Name</th>
                      <th>Product Price</th>
                      <th>Product Quantity</th>
                      <th>Total Amount</th>
                    </tr>
                  </thead>
                  <tbody id="tbody">
                    {getProductData.map((element, key) => {
                      return (
                        <tr>
                          <td>{element.customerid}</td>
                          <td>{element.customername}</td>
                          <td>{element.email}</td>
                          <td>{element.contact}</td>
                          <td>{element.productname}</td>
                          <td>{element.productprice}</td>
                          <td>{element.productquantity}</td>
                          <td>{element.totalamount}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="crud">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="control-panel">
                <i className="fa fa-gears"></i>
                <h4>Control Panel</h4>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="insert">
                <h2>Insert Data</h2>
                <form method="post" id="myInsertForm">
                  <div className="row">
                    <div className="col-md-4">
                      <label htmlFor="id">Customer ID</label>
                      <input
                        type="text"
                        name="customerid"
                        className="myInput"
                        required="required"
                        value={product.customerid}
                        onChange={getProductInput}
                      />

                      <label htmlFor="name">Customer Name</label>
                      <input
                        type="text"
                        name="customername"
                        className="myInput"
                        required="required"
                        value={product.customername}
                        onChange={getProductInput}
                      />

                      <label htmlFor="emailid">Email ID</label>
                      <input
                        type="email"
                        name="email"
                        className="myInput"
                        required="required"
                        value={product.email}
                        onChange={getProductInput}
                      />
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="contact">Contact</label>
                      <input
                        type="text"
                        name="contact"
                        className="myInput"
                        required="required"
                        value={product.contact}
                        onChange={getProductInput}
                      />

                      <label htmlFor="pname">Product Name</label>
                      <input
                        type="text"
                        name="productname"
                        className="myInput"
                        required="required"
                        value={product.productname}
                        onChange={getProductInput}
                      />

                      <label htmlFor="pprice">Product Price</label>
                      <input
                        type="text"
                        name="productprice"
                        className="myInput"
                        required="required"
                        value={product.productprice}
                        onChange={getProductInput}
                      />
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="pqty">Product Quantity</label>
                      <input
                        type="text"
                        name="productquantity"
                        className="myInput"
                        required="required"
                        value={product.productquantity}
                        onChange={getProductInput}
                      />
                      <label htmlFor="tamount">Total Amount</label>
                      <input
                        type="text"
                        name="totalamount"
                        className="myInput"
                        value={product.totalamount}
                        required="required"
                        onChange={getProductInput}
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btninsert"
                    onClick={productSend}
                  >
                    Insert
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="update">
                <h2>Update Data</h2>
                <form method="post" id="myUpdateForm">
                  <div className="row">
                    <div className="col-md-4">
                      <label htmlFor="id">Customer ID</label>
                      <input
                        type="text"
                        name="customerid"
                        className="myInput"
                        required="required"
                        value={productupdate.customerid}
                        onChange={getProductUpdateInput}
                      />

                      <label htmlFor="name">Customer Name</label>
                      <input
                        type="text"
                        name="customername"
                        className="myInput"
                        required="required"
                        value={productupdate.customername}
                        onChange={getProductUpdateInput}
                      />

                      <label htmlFor="emailid">Email ID</label>
                      <input
                        type="email"
                        name="email"
                        className="myInput"
                        required="required"
                        value={productupdate.email}
                        onChange={getProductUpdateInput}
                      />
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="contact">Contact</label>
                      <input
                        type="text"
                        name="contact"
                        className="myInput"
                        required="required"
                        value={productupdate.contact}
                        onChange={getProductUpdateInput}
                      />

                      <label htmlFor="pname">Product Name</label>
                      <input
                        type="text"
                        name="productname"
                        className="myInput"
                        required="required"
                        value={productupdate.productname}
                        onChange={getProductUpdateInput}
                      />

                      <label htmlFor="pprice">Product Price</label>
                      <input
                        type="text"
                        name="productprice"
                        className="myInput"
                        required="required"
                        value={productupdate.productprice}
                        onChange={getProductUpdateInput}
                      />
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="pqty">Product Quantity</label>
                      <input
                        type="text"
                        name="productquantity"
                        className="myInput"
                        required="required"
                        value={productupdate.productquantity}
                        onChange={getProductUpdateInput}
                      />
                      <label htmlFor="tamount">Total Amount</label>
                      <input
                        type="text"
                        name="totalamount"
                        className="myInput"
                        value={productupdate.totalamount}
                        required="required"
                        onChange={getProductUpdateInput}
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btnupdate"
                    onClick={productUpdateSend}
                  >
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="delete">
                <h2>Delete Data</h2>
                <form method="post" id="myDeleteForm">
                  <label htmlFor="id">Customer ID</label>
                  <input
                    type="text"
                    name="customerid"
                    className="myInput"
                    required="required"
                    value={productdelete.customerid}
                    onChange={getDeleteProductInput}
                  />
                  <button
                    type="submit"
                    className="btndelete"
                    onClick={productDeleteSend}
                  >
                    Delete
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="search">
                <h2>Search Data</h2>
                <form action="/searchdata" method="post" id="mySearchForm">
                  <label htmlFor="id">Customer ID</label>
                  <input
                    type="text"
                    name="customerid"
                    className="myInput"
                    required="required"
                    value={productsearch.customerid}
                    onChange={getSearchProductInput}
                  />
                  <button
                    type="submit"
                    className="btnsearch"
                    onClick={productSearchSend}
                  >
                    Search
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="searchresult">
        <div className="overly">
          <h4>Search Result</h4>
          <span className="close" onClick={closeresult}>
            &times;
          </span>
          <div className="search-border"></div>
          <div className="productresult">
            <div className="resultbox">
              <label>customerid</label>
              <span>{productsearchdata.customerid}</span>
            </div>
            <div className="resultbox">
              <label>customer name</label>
              <span>{productsearchdata.customername}</span>
            </div>
            <div className="resultbox">
              <label>email</label>
              <span>{productsearchdata.email}</span>
            </div>
            <div className="resultbox">
              <label>contact</label>
              <span>{productsearchdata.contact}</span>
            </div>
            <div className="resultbox">
              <label>product name</label>
              <span>{productsearchdata.productname}</span>
            </div>
            <div className="resultbox">
              <label>product price</label>
              <span>{productsearchdata.productprice}</span>
            </div>
            <div className="resultbox">
              <label>product quantity</label>
              <span>{productsearchdata.productquantity}</span>
            </div>
            <div className="resultbox">
              <label>total amount</label>
              <span>{productsearchdata.totalamount}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Controlsystem;
