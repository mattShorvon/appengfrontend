import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutPanel from "./CheckoutPanel";
import "../../css/checkout.css";
import { useHistory } from "react-router-dom";
import { emptyCart } from "../actions/cartActions";
import axios from "axios";

export default function ConfirmOrder({ websitename, showWebsiteList }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const cart = useSelector((state) => state.cart);
  const toPrice = (num) => Number(num.toFixed(2));
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippingPrice = toPrice(5);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const submitOrder = (e) => {
    // TODO: insert into here something that sends the data of the order to the orders table in the database
    // The 'total price' is the one that needs to be stored also I imagine

    e.preventDefault();
    let path = `/-/${websitename}/${showWebsiteList}/ordernotice`;
    history.push(path);
    axios.post("https://comp0067.herokuapp.com/submitorder", {
      cart,
      websitename,
    });
    // dispatch(emptyCart(cart));
  };
  return (
    <div>
      <CheckoutPanel step1 step2 step3></CheckoutPanel>
      <div className="row-new top">
        <div className="col-2-new">
          <ul className="no-bulletpoints">
            <li>
              <div className="card-new card-body">
                <div>
                  <h2>Shipping</h2>
                  <p>
                    <strong>Name:</strong> {cart.shippingAddress.fullName}{" "}
                    <br />
                    <strong>Email:</strong> {cart.shippingAddress.email} <br />
                    <strong>Address:</strong> {cart.shippingAddress.address}{" "}
                    <br />
                    <strong>City:</strong> {cart.shippingAddress.city} <br />
                    <strong>PostalCode</strong>{" "}
                    {cart.shippingAddress.postalCode} <br />
                    <strong>Country</strong> {cart.shippingAddress.country}{" "}
                    <br />
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className="card-new card-body">
                <div>
                  <h2>Payment</h2>
                  <p>
                    <strong>Method:</strong> {cart.paymentMethod}
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className="card-new card-body">
                <h2>Items</h2>
                <ul>
                  {cart.cartItems.map((item) => {
                    return (
                      <li key={item.id}>
                        <div className="row-new">
                          <div className="min-30">
                            {item.name} <br />
                            {item.desc}
                          </div>
                          <div>
                            {item.qty} x ${item.price} = $
                            {item.qty * item.price}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1-new">
          <div className="card-new card-body">
            <ul>
              <h2>Order Summary</h2>

              <li>
                <div className="row-new">
                  <div>Items</div>
                  <div>${cart.itemsPrice}</div>
                </div>
              </li>
              <li>
                <div className="row-new">
                  <div>Shipping</div>
                  <div>${cart.shippingPrice}</div>
                </div>
                <li>
                  <div className="row-new">
                    <div>Tax</div>
                    <div>${cart.taxPrice}</div>
                  </div>
                </li>
                <div>
                  <br></br>
                  <div>
                    {" "}
                    <strong>Order Total</strong>
                  </div>
                  <div>${cart.totalPrice}</div>
                </div>
              </li>
            </ul>
          </div>
          <button
            type="button"
            className="primary block"
            disabled={cart.length === 0}
            onClick={submitOrder}
          >
            Place Order Now!
          </button>
        </div>
      </div>
    </div>
  );
}
