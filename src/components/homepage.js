import React from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

function Homepage(props) {
  if (props.currentStep !== 0) {
    return null;
  }
  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <h1 data-testid="welcomePageHeader">Welcome!</h1>
        <p>Are you ready to create a website for your business?</p>
        <p>Well, we're here to help! Let's get started.</p>
        <div
          style={{ width: "auto", height: "50px", display: "inline-block" }}
        />

        <Link to="/login" className="btn btn-success">Click here to login</Link>

        <Button
          className="Button-sizing"
          type="button"
          color="primary"
          data-testid="firstNextBtn"
          onClick={props.handleCreateNewWebsite}
        >
          CLICK HERE TO CREATE A NEW WEBSITE
        </Button>
      </div>
    </div>
  );
}

export default Homepage;
