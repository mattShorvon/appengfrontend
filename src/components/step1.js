import React from 'react';
import "../css/forms.css"

function Step1(props) {
    if (props.currentStep !== 1) {
      return null
    } 
    return(

            <form className="form_padding">
                <div>
                    <p className="h4 text-center mb-4"
                       data-testid="firstStepHeader"
                    >
                        First, we need a few details from you...</p>
                    <p className="grey-text text-center"> (Don't worry, your details are safe with us!)</p>
                </div>
                <label className="grey-text">
                First Name:
              </label>
              <input type="text" id="firstName" name ="firstName" className="form-control" data-testid= "firstName"
                     value={props.firstName} onChange={props.handleChange} />
              <br />
                <label htmlFor="defaultFormCardNameEx" className="grey-text">
                Last Name:
              </label>
              <input type="text" id="lastName" name="lastName" className="form-control" data-testid= "lastName"
                     value={props.lastName} onChange={props.handleChange} />

            <br />
            <label htmlFor="defaultFormCardNameEx" className="grey-text">
                Email:
            </label>
            <input type="text" id="email" name="email" className="form-control" data-testid= "email"
                   value={props.email} onChange={props.handleChange} />

            <br />
            <label htmlFor="defaultFormCardNameEx" className="grey-text">
                Address:
            </label>
            <input type="text" id="address" name="address" className="form-control" data-testid= "address"
                   value={props.address} onChange={props.handleChange} />

            <br />
            <label htmlFor="defaultFormCardNameEx" className="grey-text">
                Postcode:
            </label>
            <input type="text" id="postcode" name="postcode" className="form-control" data-testid= "postcode"
                   value={props.postcode} onChange={props.handleChange} />

            <br />
            <label htmlFor="defaultFormCardNameEx" className="grey-text">
                Phone number:
            </label>
            <input type="text" id="phoneNumber" name="phoneNumber" className="form-control" data-testid= "phoneNumber"
                   value={props.phoneNumber} onChange={props.handleChange} />

            </form>
      
    );
  }


  export default Step1;