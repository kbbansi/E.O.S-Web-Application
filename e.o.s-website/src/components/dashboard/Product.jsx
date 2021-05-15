import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import firebase from "firebase";

export default function Product(props) {
  const server_url = "https://eos-adinkrah-enterprise-api.herokuapp.com/";
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState();
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [intializeFirebase, setInitializeFirebase] = useState(false);
  const [productUrl, setProductUrl] = useState("");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [alreadyFetched, setAlreadyFetched] = useState(false);

  var firebaseConfig = {
    apiKey: "AIzaSyAviqsGCZo-ucTF_OKGdqP6BWIck46YJHg",
    authDomain: "sampleecom-11eb1.firebaseapp.com",
    projectId: "sampleecom-11eb1",
    storageBucket: "sampleecom-11eb1.appspot.com",
    messagingSenderId: "124265359312",
    appId: "1:124265359312:web:a33fa11b20d6675f827bd5",
    measurementId: "G-THW1JGN64V",
  };

  const fetchProducts = () => {
    axios
      .get(`${server_url}product`)
      .then((res) => {
        setProducts(res.data.message);
      })
      .catch((e) => console.log(e));
  };

  const fetchCategories = () => {
    axios
      .get(`${server_url}category`)
      .then((res) => {
        setCategories(res.data.message);
      })
      .catch((e) => console.log(e.data));
  };

  const uploadImage = (e) => {
    if (!intializeFirebase) {
      firebase.initializeApp(firebaseConfig);
      firebase.analytics();
      setInitializeFirebase(true);
      fetchCategories();
    }
    let blobFile = e.target.files[0];
    let fileName = e.target.files[0].name;
    var storageRef = firebase.storage().ref().child(fileName);

    storageRef.put(blobFile).then((snapshot) => {
      console.log("Uploaded a blob or file");
      storageRef.getDownloadURL().then((url) => {
        console.log(url);
        setProductUrl(url);
      });
    });
  };

  useEffect((e) => {
    if (!alreadyFetched) {
      fetchCategories();
      fetchProducts();
      setAlreadyFetched(true);
    }
  });

  const addProduct = (e) => {
    e.preventDefault();
    const data = {
      productName,
      price,
      description,
      stock,
      categoryID: parseInt(category),
      productImage: productUrl,
    };
    axios
      .post(`${server_url}product/create`, data)
      .then((res) => console.log(res.data))
      .catch((e) => console.log(e.data));
  };

  const addCategory = (e) => {
    e.preventDefault();
    const data = { categoryName, description: categoryDescription };
    axios
      .post(`${server_url}category/create`, data)
      .then((res) => {
        console.log(res.data);
        fetchCategories();
      })
      .catch((e) => console.log(e.data));
  };

  return (
    <div className="main-panel">
      <Navbar />
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8">
              <div className="card">
                <div className="header">
                  <h4 className="title">Add Product</h4>
                </div>
                <div className="content">
                  <form onSubmit={addProduct}>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Product Name</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Product Name"
                            name="productName"
                            onChange={(e) => setProductName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Product Price</label>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Enter Price"
                            name="price"
                            onChange={(e) => setPrice(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>Description</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Product Description"
                            name="description"
                            onChange={(e) => setDescription(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>Stock</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Product Stock"
                            name="stock"
                            onChange={(e) => setStock(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            onChange={(e) => setCategory(e.target.value)}
                          >
                            <option selected>Open this select menu</option>
                            {categories.map((category) => (
                              <option value={category.id}>
                                {category.categoryName}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label htmlFor="product-image">Product Image</label>
                          <input
                            type="file"
                            name="product_image"
                            id="product_img"
                            onChange={uploadImage}
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-info btn-fill pull-right"
                    >
                      Add Product
                    </button>
                    <div className="clearfix"></div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-md-4 card">
              <div className="header">
                <h4 className="title">Add Category</h4>
              </div>
              <div className="content">
                <form onSubmit={addCategory}>
                  <div className="row">
                    <div className="form-group col-md-12">
                      <label>Category Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Product Description"
                        name="categoryName"
                        onChange={(e) => setCategoryName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-md-12">
                      <label>Category Description</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Product Description"
                        name="categoryDescription"
                        onChange={(e) => setCategoryDescription(e.target.value)}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-info btn-fill pull-right"
                  >
                    Add Category
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="header">
                  <h4 className="title">List of Products</h4>
                  <p className="category">Here is a subtitle for this table</p>
                </div>
                <div className="content table-responsive table-full-width">
                  <table className="table table-hover table-striped">
                    <thead>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Description</th>
                      <th>Created On</th>
                    </thead>
                    <tbody>
                      {products.map((product, i) => (
                        <tr>
                          <td>{i + 1}</td>
                          <td>{product.productName}</td>
                          <td>{product.price}</td>
                          <td>{product.stock}</td>
                          <td>{product.description}</td>
                          <td>{product.createdOn}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="container-fluid">
          <nav className="pull-left">
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Company</a>
              </li>
              <li>
                <a href="#">Portfolio</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
            </ul>
          </nav>
          <p className="copyright pull-right">
            &copy; <script>document.write(new Date().getFullYear())</script>{" "}
            <a href="http://www.creative-tim.com">Creative Tim</a>, made with
            love for a better web
          </p>
        </div>
      </footer>
    </div>
  );
}
