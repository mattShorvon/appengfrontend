import React, { Component } from "react";
import { MDBContainer, MDBCol, MDBRow, MDBCard, MDBCardBody, MDBBtn, MDBNav, MDBNavItem, MDBNavLink, MDBTabPane,
MDBTabContent } from "mdbreact";
import '../../css/products.css'
import 'mdbreact/dist/css/mdb.css'

export default function CheckoutPanel(props) {
  return (
    <div className="row checkout-steps">
      <div className={props.step1 ? 'active': ''} >ShippingInfo</div>
      <div className={props.step2 ? 'active': ''} >Payment</div>
      <div className={props.step3 ? 'active': ''} >Place Order</div> 
    </div>
  );
}






    

