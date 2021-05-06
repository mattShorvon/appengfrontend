import React from 'react';

function Step2(props) {
  if (props.currentStep !== 2) {
    return null
  } 
  return(
    <React.Fragment>
      <form className="form_padding">
    <div>
      <p className="h4 text-center mb-4" data-testid="secondStepHeader">What would you like your PASSWORD to be?</p>
      <p className="grey-text text-center">(Please write it down somewhere, you will need it to administer your website)</p>
      <label htmlFor="password">Password: </label>
      <input
          className="form-control"
          id="password"
          name="password"
          type="password"
          placeholder="Enter password Here"
          data-testid="password"
          value={props.password}
          onChange={props.handleChange}
      />
      <br />
      <label htmlFor="passwordVerify">Verify Password: </label>
      <input
          className="form-control"
          id="passwordVerify"
          name="passwordVerify"
          type="password"
          data-testid="passwordVerify"
          placeholder="Retype Password Here"
          value={props.passwordVerify}
          onChange={props.handleChange}
      />
    </div>
      </form>
    </React.Fragment>
  );
}

export default Step2;