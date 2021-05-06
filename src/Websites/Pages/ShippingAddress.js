import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutPanel from "./CheckoutPanel";
import "../../css/checkout.css";
import { useHistory } from "react-router-dom";
import { saveShippingAddress } from "../actions/cartActions";

export default function ShippingAddressScreen({
  websitename,
  showWebsiteList,
}) {
  // const cart = useSelector((state) => state.cart)
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  let history = useHistory();

  function ValidateEmail(string) {
    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        string
      )
    ) {
      return false;
    }
    return true;
  }

  const onNameChange = (e) => setFullName(e.target.value);
  const onAddressChange = (e) => setAddress(e.target.value);
  const onPhoneNumberChange = (e) => setPhoneNumber(e.target.value);
  const onPostalCodeChange = (e) => setPostalCode(e.target.value);
  const onCountryChange = (e) => setCountry(e.target.value);
  const onEmailChange = (e) => setEmail(e.target.value);

  const submitHandler = (e) => {
    e.preventDefault();
    if (isNaN(phoneNumber)) {
      alert("Please enter a valid phone number");
      history.go(0);
    } else {
      if (ValidateEmail(email)) {
        alert("Please enter a valid email");
        history.go(0);
      } else {
        dispatch(
          saveShippingAddress({
            fullName,
            email,
            address,
            phoneNumber,
            postalCode,
            country,
          })
        );
      }
    }

    // TODO: dispatch save shipping address
    let path = `/-/${websitename}/${showWebsiteList}/payments`;
    history.push(path);
  };

  return (
    <div>
      <CheckoutPanel step1></CheckoutPanel>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Shipping Info</h1>
        </div>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            placeholder="Enter full name"
            value={fullName}
            onChange={onNameChange}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={onEmailChange}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            placeholder="Enter address"
            value={address}
            onChange={onAddressChange}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            id="phoneNumber"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={onPhoneNumberChange}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="postalCode">Postal Code</label>
          <input
            type="text"
            id="postalCode"
            placeholder="Enter postal code"
            value={postalCode}
            onChange={onPostalCodeChange}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            placeholder="We only Ship within the U.K!"
            value={country}
            onChange={onCountryChange}
            required
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Press Me to Keep Going
          </button>
        </div>
      </form>
    </div>
  );
}
