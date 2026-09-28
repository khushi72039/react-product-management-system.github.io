import "./form.css";
import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [prod, setProd] = useState<any[]>([]);

  const [name, setname] = useState("");
  const [price, setprice] = useState("");
  const [description, setdescription] = useState("");
  const [availability, setavailibity] = useState("");

  const [editId, setEditId] = useState<number | null>(null);

  const [loading, setLoading] = useState(false);

  // ===============================
  // GET DATA
  // ===============================
  useEffect(() => {
    Get_Data();
  }, []);

  const Get_Data = async () => {
    try {
      setLoading(true);

      const res = await axios.get("http://localhost:5000/products");

      setProd(res.data);
    } catch (err) {
      console.log(err);
      alert("Unable to load products");
    } finally {
      setLoading(false);
    }
  };


  // ===============================
  // ADD DATA
  // ===============================
  const Add_Data = async () => {
    try {
      if (!name || !price || !description || !availability) {
        return alert("Please enter all product details");
      }

      await axios.post(
        "http://localhost:5000/products",
        {
          name,
          price,
          description,
          availability: availability === "true" ? 1 : 0,
        }
      );

      setname("");
      setprice("");
      setdescription("");
      setavailibity("");

      Get_Data();

    } catch (err) {
      console.log(err);
      alert("Unable to add product");
    }
  };


  // ===============================
  // DELETE DATA
  // ===============================
  const Delete_Data = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:5000/products/${id}`
      );

      Get_Data();

    } catch (err) {
      console.log(err);
      alert("Unable to delete product");
    }
  };


  // ===============================
  // START EDIT
  // ===============================
  const Edit_Data = (product: any) => {
    setEditId(product.id);

    setname(product.name);
    setprice(product.price.toString());
    setdescription(product.description);

    if (product.availability === 1 || product.availability === true) {
      setavailibity("true");
    } else {
      setavailibity("false");
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  // ===============================
  // UPDATE DATA
  // ===============================
  const Update_Data = async () => {
    try {
      if (!name || !price || !description || !availability) {
        return alert("Please enter all product details");
      }

      await axios.put(
        `http://localhost:5000/products/${editId}`,
        {
          name,
          price,
          description,
          availability: availability === "true" ? 1 : 0,
        }
      );

      alert("Product updated successfully!");

      Cancel_Edit();

      Get_Data();

    } catch (err) {
      console.log(err);
      alert("Unable to update product");
    }
  };


  // ===============================
  // CANCEL EDIT
  // ===============================
  const Cancel_Edit = () => {
    setEditId(null);

    setname("");
    setprice("");
    setdescription("");
    setavailibity("");
  };


  return (
    <div className="app">

      {/* ================= HEADER ================= */}

      <header className="top-header">

        <div className="brand-area">

          <div className="brand-icon">
            🛍️
          </div>

          <div>
            <h1>ProductHub</h1>
            <p>Product Management System</p>
          </div>

        </div>

        <div className="header-status">
          <span className="status-dot"></span>
          MySQL Connected
        </div>

      </header>


      {/* ================= MAIN ================= */}

      <main className="main-container">

        {/* ================= HERO ================= */}

        <section className="hero-section">

          <div>
            <p className="small-heading">
              PRODUCT MANAGEMENT
            </p>

            <h2>
              Manage your products
              <span> easily.</span>
            </h2>

            <p className="hero-description">
              Add, view, update and remove products
              from your MySQL database.
            </p>
          </div>

          <div className="total-card">

            <div className="total-icon">
              📦
            </div>

            <div>
              <p>Total Products</p>
              <h3>{prod.length}</h3>
            </div>

          </div>

        </section>


        {/* ================= FORM ================= */}

        <section className="form-section">

          <div className="section-title">

            <div className="title-icon">
              {editId !== null ? "✏️" : "＋"}
            </div>

            <div>
              <h3>
                {editId !== null
                  ? "Update Product"
                  : "Add New Product"}
              </h3>

              <p>
                {editId !== null
                  ? "Edit the product information below"
                  : "Enter product details to add a new product"}
              </p>
            </div>

          </div>


          <div className="form-grid">

            {/* PRODUCT NAME */}

            <div className="input-group">

              <label>Product Name</label>

              <input
                type="text"
                value={name}
                placeholder="e.g. Wireless Headphones"
                onChange={(i) => {
                  setname(i.target.value);
                }}
              />

            </div>


            {/* PRICE */}

            <div className="input-group">

              <label>Price</label>

              <input
                type="number"
                value={price}
                placeholder="e.g. 1999"
                onChange={(i) => {
                  setprice(i.target.value);
                }}
              />

            </div>


            {/* DESCRIPTION */}

            <div className="input-group description-group">

              <label>Description</label>

              <input
                type="text"
                value={description}
                placeholder="Enter product description"
                onChange={(i) => {
                  setdescription(i.target.value);
                }}
              />

            </div>


            {/* AVAILABILITY */}

            <div className="input-group">

              <label>Availability</label>

              <select
                value={availability}
                onChange={(i) => {
                  setavailibity(i.target.value);
                }}
              >

                <option value="">
                  Select availability
                </option>

                <option value="true">
                  Available
                </option>

                <option value="false">
                  Unavailable
                </option>

              </select>

            </div>

          </div>


          {/* BUTTONS */}

          <div className="form-actions">

            {editId !== null ? (
              <>
                <button
                  className="update-button"
                  onClick={Update_Data}
                >
                  ✓ Update Product
                </button>

                <button
                  className="cancel-button"
                  onClick={Cancel_Edit}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                className="add-button"
                onClick={Add_Data}
              >
                ＋ Add Product
              </button>
            )}

          </div>

        </section>


        {/* ================= TABLE ================= */}

        <section className="table-section">

          <div className="table-header">

            <div>
              <h3>Product List</h3>

              <p>
                All products stored in your database
              </p>
            </div>

            <button
              className="refresh-button"
              onClick={Get_Data}
            >
              ↻ Refresh
            </button>

          </div>


          {/* LOADING */}

          {loading ? (

            <div className="empty-state">
              <div className="loading-circle"></div>
              <p>Loading products...</p>
            </div>

          ) : prod.length === 0 ? (

            /* EMPTY */

            <div className="empty-state">

              <div className="empty-icon">
                📦
              </div>

              <h3>No products found</h3>

              <p>
                Add your first product using the form above.
              </p>

            </div>

          ) : (

            /* TABLE */

            <div className="table-wrapper">

              <table>

                <thead>

                  <tr>

                    <th>ID</th>

                    <th>PRODUCT</th>

                    <th>PRICE</th>

                    <th>DESCRIPTION</th>

                    <th>STATUS</th>

                    <th>ACTIONS</th>

                  </tr>

                </thead>

                <tbody>

                  {prod.map((p) => (

                    <tr key={p.id}>

                      {/* ID */}

                      <td>

                        <span className="product-id">
                          #{p.id}
                        </span>

                      </td>


                      {/* PRODUCT */}

                      <td>

                        <div className="product-name">

                          <div className="product-avatar">
                            {p.name
                              ? p.name.charAt(0).toUpperCase()
                              : "P"}
                          </div>

                          <div>
                            <strong>{p.name}</strong>
                            <small>
                              Product #{p.id}
                            </small>
                          </div>

                        </div>

                      </td>


                      {/* PRICE */}

                      <td>

                        <span className="price">
                          ₹{Number(p.price).toLocaleString("en-IN")}
                        </span>

                      </td>


                      {/* DESCRIPTION */}

                      <td>

                        <span className="description">
                          {p.description}
                        </span>

                      </td>


                      {/* STATUS */}

                      <td>

                        {p.availability === 1 ||
                        p.availability === true ? (

                          <span className="badge available">
                            <span></span>
                            Available
                          </span>

                        ) : (

                          <span className="badge unavailable">
                            <span></span>
                            Unavailable
                          </span>

                        )}

                      </td>


                      {/* ACTIONS */}

                      <td>

                        <div className="action-buttons">

                          <button
                            className="edit-button"
                            onClick={() => {
                              Edit_Data(p);
                            }}
                          >
                            ✎ Edit
                          </button>

                          <button
                            className="delete-button"
                            onClick={() => {
                              Delete_Data(p.id);
                            }}
                          >
                            🗑 Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </section>

      </main>


      {/* ================= FOOTER ================= */}

      <footer>

        <p>
          ProductHub • React + Express + MySQL
        </p>

        <span>
          Full CRUD Product Management
        </span>

      </footer>

    </div>
  );
};

export default App;