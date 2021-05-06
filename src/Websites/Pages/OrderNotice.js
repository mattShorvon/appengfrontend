import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { emptyCart } from "../actions/cartActions";
import axios from "axios";

export default function OrderNotice({ websitename, showWebsiteList }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const toPrice = (num) => Number(num.toFixed(2));
  const [paypal, setPaypal] = useState("");
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippingPrice = toPrice(5);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  useEffect(() => {
    axios
      .post("http://localhost:5000/getpaypal", { websitename })
      .then((response) => {
        setPaypal(response.data[0].paypal);
        console.log(response.data[0].paypal);
      });
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    let path = `/-/${websitename}/${showWebsiteList}/whatsonoffer`;
    history.push(path);
    dispatch(emptyCart(cart));
  };
  return (
    <>
      <div>
        <h3>Order Complete! Please Send the final amount of:</h3>
        <h2>{cart.totalPrice}</h2>
        <h3>To {websitename}'s paypal account using the following link: </h3>
        <a href={`https://www.paypal.com/paypalme/${paypal}`}>
          Click here to get taken to {websitename}'s paypal page
        </a>
        <h3>Once on this page, click 'send' to send them the amount</h3>
        <br />
        <br />
        <button onClick={submitHandler}>
          Click here to return to offers to see whats in stock!
        </button>
      </div>
    </>
  );
}
