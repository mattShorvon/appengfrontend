import React, { useEffect, useState } from "react";
import "../../css/checkout.css";
import jwt_decode from "jwt-decode";
import { useSelector } from "react-redux";
import axios from "axios";
import { PRODUCT_LIST_FAIL } from "../constants/productsConstants.js";
import { Layout } from "./Layout.js";
import { Jumbotron as Jumbo, Container } from "react-bootstrap";
import styled from "styled-components";
import Image from "../Photos/testimage.jpg";
// const express = require("express");

const Styles = styled.div`
  .jumbo {
    background: url(${Image}) no-repeat fixed bottom;
    background-size: cover;
    color: #efefef;
    height: 300px;
    position: relative;
    z-index: -2;
  }
  .overlay {
    background-color: #000;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
  }
`;

function AboutMe({ websitename }) {
  const [aboutMe, setAboutMe] = useState([{}]);
  const [status, setStatus] = useState("Submit");

  var token = localStorage.getItem("token");
  var decoded_token = jwt_decode(token);
  var userId = decoded_token.userId;
  const businessName = useSelector((state) => state.home.businessName);

  useEffect(() => {
    if (userId === "customer") {
      axios
        .post("https://comp0067.herokuapp.com/aboutmedatacustomer", {
          businessName,
        })
        .then((response) => setAboutMe(response.data[0]));
    } else {
      axios
        .post("https://comp0067.herokuapp.com/aboutmedata", { userId })
        .then((response) => setAboutMe(response.data[0]));
    }
  }, []);
  // return <div>{console.log(orders[0])}</div>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    const { name, email, message } = e.target.elements;
    let details = {
      name: name.value,
      email: email.value,
      message: message.value,
    };
    let response = await fetch("https://comp0067.herokuapp.com/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(details),
    });
    setStatus("Submit");
    let result = await response.json();
    alert(result.status);
  };

  return (
    <>
      <Styles>
        <Jumbo fluid className="jumbo">
          <Layout>
            <div className="overlay"></div>
            <Container>
              {console.log(aboutMe)}
              <div className="header">
                <h2>About Us</h2>
                <p>{aboutMe.aboutMeDescription}</p>
              </div>
            </Container>
          </Layout>
        </Jumbo>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <form className="form" onSubmit={handleSubmit}>
            <p className="h4 text-center mb-4">Do you have an enquiry?</p>
            <p className="grey-text text-center">
              Please submit it using the form below, we will reply as soon as
              possible!
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <label htmlFor="fullName">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                type="name"
                placeholder="Enter here"
                required
              ></input>
              <br />
              <label htmlFor="Email">Email: </label>
              <input
                type="text"
                id="email"
                name="email"
                type="email"
                placeholder="Enter here"
                required
              ></input>
              <br />
              <label htmlFor="Message">Message: </label>
              <input
                type="text"
                id="message"
                name="message"
                type="message"
                placeholder="Enter here"
                required
              ></input>
              <br />
              <button type="submit">{status}</button>
            </div>
          </form>
        </div>
      </Styles>
    </>
  );
}

export default AboutMe;
