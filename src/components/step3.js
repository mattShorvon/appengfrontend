import React from 'react';

function Step3(props) {
  if (props.currentStep !== 3) {
    return null
  } 
  return(
      <React.Fragment>
          <form className="form_padding">
        <div className="form-group">
          <p className="h4 text-center mb-4" data-testid="thirdStepHeader">What is the name of your business?</p>
          <p className="grey-text text-center">(This will show up on the website)</p>
          <input
              className="form-control"
              id="businessName"
              name="businessName"
              type="text"
              placeholder="Enter the name of your business here"
              data-testid="businessName"
              value={props.businessName}
              onChange={props.handleChange}
          />
            <br></br>
          <p className="grey-text font-weight-bold text-center">Once you are done giving your business a great name,<br></br>
          click on the 'keep going' button</p>
        </div>
          </form>
      </React.Fragment>
  );
}

export default Step3;