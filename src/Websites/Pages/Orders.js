import react from "react";
import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import "../../css/orders.css";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([{}]);
  const [fulfilledOrders, setFulfilledOrders] = useState([{}]);
  const [rerender, setReRender] = useState(0);
  var token = localStorage.getItem("token");
  var decoded_token = jwt_decode(token);
  var userId = decoded_token.userId;

  useEffect(() => {
    fetch("https://comp0067.herokuapp.com/unfulfilledorders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    })
      .then((response) => response.json())
      .then((response) => setOrders(response));
  }, [rerender]);

  useEffect(() => {
    fetch("https://comp0067.herokuapp.com/fulfilledorders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    })
      .then((response) => response.json())
      .then((response) => setFulfilledOrders(response));
  }, [rerender]);
  // function fulfilledButton(orderDate) {
  //   setOrderDateFulfilled(orderDate);
  // }

  return (
    <>
      <div>
        <h1 className="header">Here are your pending orders!</h1>
        <h5 className="header">
          When the order is complete, click 'yes' under 'Has the order been
          fulfilled' and it will move to 'fufilled orders.'
        </h5>
      </div>
      <div className="container">
        <table>
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Address</th>
              <th>Postcode</th>
              <th>Order ID</th>
              <th>Order Date</th>
              <th>Has the order been fulfilled?</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item) => (
              <tr key={item.orderDate}>
                <td>{item.customerName}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.customerAddress}</td>
                <td>{item.customerPostcode}</td>
                <td>{item.orderId}</td>
                <td>{item.orderDate}</td>
                <td>
                  <button
                    onClick={() =>
                      axios
                        .post(
                          `https://comp0067.herokuapp.com/orderchangefulfilledY2N`,
                          {
                            item,
                          }
                        )
                        .then(setReRender(rerender + 1))
                    }
                  >
                    Yes
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h1 className="header">Here are your fulfilled orders!</h1>
        <h5 className="header">
          If the order is not complete, click 'no' under 'Has the order been
          fulfilled' and it will move to 'pending orders.'
        </h5>
      </div>
      <div className="container">
        <table>
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Address</th>
              <th>Postcode</th>
              <th>Order ID</th>
              <th>Order Date</th>
              <th>Has the order been fulfilled?</th>
            </tr>
          </thead>
          <tbody>
            {fulfilledOrders.map((item) => (
              <tr key={item.orderDate}>
                <td>{item.customerName}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.customerAddress}</td>
                <td>{item.customerPostcode}</td>
                <td>{item.orderId}</td>
                <td>{item.orderDate}</td>
                <td>
                  <button
                    onClick={() =>
                      axios
                        .post(
                          `https://comp0067.herokuapp.com/orderchangefulfilledN2Y`,
                          {
                            item,
                          }
                        )
                        .then(setReRender(rerender + 1))
                    }
                  >
                    No
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Orders;

// https://www.pluralsight.com/guides/dynamic-tables-from-editable-columns-in-react-html
// https://github.com/mdn/learning-area/blob/master/html/tables/basic/minimal-table.css
