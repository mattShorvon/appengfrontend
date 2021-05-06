import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  EMPTY_CART_METHOD,
} from "../constants/cartConstant";

export const addToCart = (data, qty) => async (dispatch, getState) => {
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      name: data.name,
      image: data.itemPicture,
      price: data.price,
      product: data.itemId,
      qty,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (item) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: item.product });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
};

export const emptyCart = (data) => (dispatch) => {
  dispatch({ type: EMPTY_CART_METHOD, payload: data });
};
