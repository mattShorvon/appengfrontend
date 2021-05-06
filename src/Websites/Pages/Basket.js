import React, { useContext } from "react";
import "../../css/products.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBTooltip,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBContainer,
  MDBBtn,
} from "mdbreact";
import "mdbreact/dist/css/mdb.css";
import { useHistory } from "react-router-dom";
import { removeFromCart } from "../actions/cartActions";

function Cart({ websitename, showWebsiteList }) {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();
  let history = useHistory();

  const CheckoutHandler = () => {
    let path = `/-/${websitename}/${showWebsiteList}/shipping`;
    history.push(path);
  };

  const columns = [
    {
      label: <strong>Product</strong>,
      field: "product",
    },
    {
      label: <strong>Price</strong>,
      field: "price",
    },
    {
      label: <strong>QTY</strong>,
      field: "qty",
    },
    {
      label: <strong>Remove</strong>,
      field: "button",
    },
  ];

  const rows = [];
  cartItems.map((row) => {
    return rows.push({
      product: [
        <h5 className="mt-3" key={new Date().getDate + 1}>
          <strong>{row.name}</strong>
        </h5>,
        <p key={new Date().getDate} className="text-muted"></p>,
      ],
      price: `$${row.price}`,
      quantity: `${row.qty}`,
      button: (
        <MDBTooltip placement="top">
          <MDBBtn
            color="primary"
            size="sm"
            onClick={() => dispatch(removeFromCart(row))}
          >
            X
          </MDBBtn>
          <div>Remove item</div>
        </MDBTooltip>
      ),
    });
  });

  return (
    <div>
      <h1>Basket</h1>

      <MDBRow className="my-2" center>
        <MDBCard style={{ maxWidth: "100%" }} className="w-100">
          <MDBCardBody>
            <MDBTable className="product-table">
              <MDBTableHead
                className="font-weight-bold"
                color="mdb-color lighten-5"
                columns={columns}
              />
              <MDBTableBody rows={rows} />
            </MDBTable>
          </MDBCardBody>
        </MDBCard>
      </MDBRow>
      <MDBBtn rounded color="primary" rounded onClick={CheckoutHandler}>
        Checkout Now!
      </MDBBtn>
    </div>
  );
}

export default Cart;
