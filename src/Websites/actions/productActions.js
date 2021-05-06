import {
  ADD_NEW_PRODUCT,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  REMOVE_NEW_PRODUCT,
  REMOVE_NEW_PRODUCT_FAIL,
} from "../constants/productsConstants";
import data from "../Pages/data";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export const listProductsAndServices = () => async (dispatch) => {
  dispatch({ type: PRODUCT_LIST_REQUEST });
  var token = localStorage.getItem("token");
  var decoded_token = jwt_decode(token);
  var userId = decoded_token.userId;
  try {
    await axios
      .post("https://comp0067.herokuapp.com/getproductsandserviceslist", {
        userId,
      })
      .then((response) => {
        const products = response.data;
        console.log(products);
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: products });
      });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};

export const listProducts = (businessName, itemCategory) => async (
  dispatch
) => {
  // call API in backend
  dispatch({
    type: PRODUCT_LIST_REQUEST,
  });
  console.log(businessName);
  var token = localStorage.getItem("token");
  var decoded_token = jwt_decode(token);
  var userId = decoded_token.userId;
  if (userId === "customer") {
    try {
      await axios
        .post("https://comp0067.herokuapp.com/getproductslistcustomer", {
          businessName,
          itemCategory,
        })
        .then((response) => {
          const products = response.data;
          console.log(products);
          dispatch({ type: PRODUCT_LIST_SUCCESS, payload: products });
        });
    } catch (error) {
      dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
    }
  } else {
    try {
      // const res = await axios.post("http://comp0067.herokuapp.com/getproductslist", {
      //   userId,
      // });
      // console.log(res);
      // await dispatch({ type: PRODUCT_LIST_SUCCESS, payload: res.data });
      await axios
        .post("https://comp0067.herokuapp.com/getproductslist", {
          userId,
          itemCategory,
        })
        .then((response) => {
          const products = response.data;
          console.log(products);
          dispatch({ type: PRODUCT_LIST_SUCCESS, payload: products });
        });
    } catch (error) {
      dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
    }
  }
};

export const addNewProduct = (data) => async (dispatch) => {
  var token = localStorage.getItem("token");
  var decoded_token = jwt_decode(token);
  var userId = decoded_token.userId;
  console.log(data);
  try {
    await axios
      .post("https://comp0067.herokuapp.com/addnewproduct", {
        userId: userId,
        itemId: data.itemId,
        name: data.name,
        itemPicture: data.itemPicture,
        description: data.description,
        price: data.price,
        quantityInStock: data.quantity,
        itemCategory: data.itemCategory,
      })
      .then(
        dispatch({
          type: ADD_NEW_PRODUCT,
          payload: {
            itemId: data.itemId,
            name: data.name,
            photo: data.photo,
            description: data.description,
            price: data.price,
            quantityInStock: data.quantity,
            itemCategory: data.itemCategory,
          },
        })
      );
    alert("New Product Added!");
  } catch (error) {
    dispatch({ type: REMOVE_NEW_PRODUCT_FAIL, payload: error.message });
  }
};

export const removeNewProduct = (product) => async (dispatch) => {
  var token = localStorage.getItem("token");
  var decoded_token = jwt_decode(token);
  var userId = decoded_token.userId;
  try {
    await axios
      .post("https://comp0067.herokuapp.com/removeproduct", {
        userId: userId,
        itemId: product.itemId,
      })
      .then(() => {
        dispatch({ type: REMOVE_NEW_PRODUCT, payload: product.itemId });
      });
    alert("Product Removed!");
  } catch (error) {
    dispatch({ type: REMOVE_NEW_PRODUCT_FAIL, payload: error.message });
  }

  // localStorage.setItem('products', JSON.stringify(getState().products.cartItems));
};
