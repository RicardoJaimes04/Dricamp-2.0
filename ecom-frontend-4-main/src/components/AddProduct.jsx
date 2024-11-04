import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    releaseDate: "",
    available: false,
  });
  const [image, setImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    // setProduct({...product, image: e.target.files[0]})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("imageFile", image);
    formData.append(
      "product",
      new Blob([JSON.stringify(product)], { type: "application/json" })
    );

    axios
      .post("http://localhost:8080/api/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Product added successfully:", response.data);
        alert("Product added successfully");
      })
      .catch((error) => {
        console.error("Error adding product:", error);
        alert("Error adding product");
      });
  };

  return (
    <div className="container">
    <div className="center-container">
      <form className="row g-3 pt-5" onSubmit={submitHandler}>
        <div className="col-md-6">
          <label className="form-label">
            <h6>Nombre</h6>
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Nombre del producto"
            onChange={handleInputChange}
            value={product.name}
            name="name"
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">
            <h6>Medida</h6>
          </label>
          <input
            type="text"
            name="brand"
            className="form-control"
            placeholder="Ingresa la unidad de medida"
            value={product.brand}
            onChange={handleInputChange}
            id="brand"
          />
        </div>
        <div className="col-12">
          <label className="form-label">
            <h6>Descripcion</h6>
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Agregar  descripcion"
            value={product.description}
            name="description"
            onChange={handleInputChange}
            id="description"
          />
        </div>
        <div className="col-5">
          <label className="form-label">
            <h6>Precio</h6>
          </label>
          <input
            type="number"
            className="form-control"
            placeholder="Ejemplo: 4500"
            onChange={handleInputChange}
            value={product.price}
            name="price"
            id="price"
          />
        </div>
     
           <div className="col-md-6">
          <label className="form-label">
            <h6>Categoria</h6>
          </label>
          <select
            className="form-select"
            value={product.category}
            onChange={handleInputChange}
            name="category"
            id="category"
          >
            <option value="">Select category</option>
            <option value="Verduras">Verduras</option>
            <option value="Lacteos">Lacteos</option>
            <option value="Pulpas">Pulpas</option>
            <option value="Frutas">Frutas</option>
            <option value="Carnes">Carnes</option>
            <option value="Aceites">Aceites</option>
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label">
            <h6>Stock</h6>
          </label>
          <input
            type="number"
            className="form-control"
            placeholder="Stock disponible"
            onChange={handleInputChange}
            value={product.quantity}
            name="quantity"
            // value={`${stockAlert}/${quantity}`}
            id="quantity"
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">
            <h6>Fecha de vencimiento</h6>
          </label>
          <input
            type="date"
            className="form-control"
            value={product.releaseDate}
            name="releaseDate"
            onChange={handleInputChange}
            id="releaseDate"
          />
        </div>
        {/* <input className='image-control' type="file" name='file' onChange={(e) => setProduct({...product, image: e.target.files[0]})} />
    <button className="btn btn-primary" >Add Photo</button>  */}
        <div className="col-md-4">
          <label className="form-label">
            <h6>Imagen</h6>
          </label>
          <input
            className="form-control"
            type="file"
            onChange={handleImageChange}
          />
        </div>
        <div className="col-12">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name="available"
              id="gridCheck"
              checked={product.available}
              onChange={(e) =>
                setProduct({ ...product, available: e.target.checked })
              }
            />
            <label className="form-check-label">Disponible</label>
          </div>
        </div>
        <div className="col-12">
          <button
            type="submit"
            className="btn btn-primary"
            // onClick={submitHandler}
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default AddProduct;
