import React from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import "../css/Test.styles.css";
import "bootstrap/dist/css/bootstrap.css";
import { Button } from "reactstrap";

function Step2_testing(props) {
  if (props.currentStep !== 2) {
    return null;
  }
  return (
    <React.Fragment>
      <Form className="Password-form">
        <h2 style={{ textAlign: "center" }}>
          What would you like your PASSWORD to be?
        </h2>
        <hr></hr>
        <p style={{ textAlign: "center" }}>
          (Please write it down somewhere, you will need it every time you login
          to your website)
        </p>
        <FormGroup>
          <Label>Password</Label>
          <Input
            className="form-control"
            id="password"
            name="password"
            type="password"
            placeholder="Enter password Here"
            value={props.password}
            onChange={props.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Verify Password</Label>
          <Input
            className="form-control"
            id="passwordVerify"
            name="passwordVerify"
            type="password"
            placeholder="Retype Password Here"
            value={props.passwordVerify}
            onChange={props.handleChange}
          />
        </FormGroup>
      </Form>
    </React.Fragment>
  );
}

export default Step2_testing;
