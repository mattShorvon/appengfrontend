import react, { useState } from "react";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { addNewProduct } from "../actions/productActions";
import axios from "axios";
import "../../css/changeproducts.css";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function ChangeProducts() {
  const [name, setName] = useState("");
  const [itemPicture, setPhoto] = useState("");
  const [description, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [itemCategory, setItemCategory] = useState("Good");

  const dispatch = useDispatch();
  const onNameChange = (e) => setName(e.target.value);
  const onPhotoChange = (e) => setPhoto(e.target.value);
  const uploadHandler = (event) => {
    const data = new FormData();
    data.append("file", event.target.files[0]);

    axios
      .post("https://comp0067.herokuapp.com/api/users/upload", data)
      .then((res) => {
        console.log(res.data);
        setPhoto(res.data.filename);
      });
  };
  const onDescChange = (e) => setDesc(e.target.value);
  const onPriceChange = (e) => setPrice(e.target.value);
  const onQuantityChange = (e) => setQuantity(e.target.value);
  const onItemCategoryChange = (e) => setItemCategory(e.target.value);

  const CommitPost = () => {
    if (name && itemPicture && description && price && quantity) {
      dispatch(
        addNewProduct({
          itemId: getRandomInt(1000000),
          name,
          itemPicture,
          description,
          price,
          quantity,
          itemCategory,
        })
      );

      setName("");
      setPhoto("");
      setDesc("");
      setPrice("");
      setQuantity("");
    }
  };

  return (
    <div className="centred">
      <form className="enquiriesform">
        <div>
          <p className="h4 text-center mb-4">
            Do you want to add a new product or service?
          </p>
          <p className="grey-text text-center">
            Please fill our the form below then click 'submit', we'll take care
            of the rest!
          </p>
          <label htmlFor="itemCategory">Category: </label>
          <br />
          <select
            id="itemCategory"
            name="itemCategory"
            value={itemCategory}
            onChange={onItemCategoryChange}
          >
            <option value="Good">Good</option>
            <option value="Service">Service</option>
          </select>
          <br />
          <label htmlFor="firstname">Name: </label>
          <input
            className="form-control"
            id="firstname"
            name="firstname"
            type="firstname"
            placeholder="Enter Here"
            value={name}
            onChange={onNameChange}
          />
          <label htmlFor="lastname">Description: </label>
          <input
            className="form-control"
            id="lastname"
            name="lastname"
            type="lastname"
            placeholder="Enter here"
            value={description}
            onChange={onDescChange}
          />
          <label htmlFor="password">Price: </label>
          <input
            className="form-control"
            id="email"
            name="email"
            type="email"
            placeholder="Enter here"
            value={price}
            onChange={onPriceChange}
          />
          <label htmlFor="password">Picture: </label>
          {/* <input
            className="form-control"
            id="email"
            name="email"
            type="email"
            placeholder="Enter here"
            value={itemPicture}
            onChange={onPhotoChange}
          /> */}
          <label htmlFor="quantity">Quantity: </label>
          <input
            className="form-control"
            id="quantity"
            name="quantity"
            type="quantity"
            placeholder="Enter Here"
            value={quantity}
            onChange={onQuantityChange}
          />
          <label htmlFor="password">Picture: </label>
          <input
            type="file"
            name="file"
            data-testid="goodImage"
            style={{ color: "rgba(0, 0, 0, 0)" }}
            onChange={onPhotoChange}
          />
          {/* <div>
              {photo !== '' ?
                  <img src={`https://comp0067.herokuapp.com/${photo}`}/>  : ''}
          </div> */}
          <br />
          <input
            type="file"
            name="file"
            data-testid="goodImage"
            // value={itemPicture}
            onChange={uploadHandler}
            style={{ color: "rgba(0, 0, 0, 0)" }}
          />
          {/* <div>
            {itemPicture !== "" ? <img src={`https://comp0067.herokuapp.com/${itemPicture}`} /> : ""}
          </div> */}
          <br />
          <button className="formbutton" type="button" onClick={CommitPost}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChangeProducts;
