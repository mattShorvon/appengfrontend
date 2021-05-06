import React, {useEffect} from 'react';
import { Button } from "reactstrap";

function Step7(props) {

    if (props.currentStep !== 7) {
        return null
    }
    return(
            <form className="form_padding">
            <div className="form-group">
                <p className="h4 text-center mb-4">
                    Enter your PayPal account to get paid!</p>
                <p className="grey-text text-center">In order for your customers to be able to pay you, you'll need to set up a PayPal account,
                and enter your PayPal username here.</p>
                <p className="grey-text text-center">If you don't have a PayPal account, not a problem! Just
                    <a href="https://www.paypal.com/uk/webapps/mpp/account-selection" target="_blank"> click here </a>
                    to set one up, then come back here and finish setting up your account.</p>
                <label htmlFor="defaultFormCardNameEx" className="grey-text" >
                    PayPal Account:
                </label>
                <input type="text"
                       id="paypal"
                       name="paypal"
                       className="form-control"
                       data-testid="PayPal Account"
                       value = {props.paypal}
                       onChange={props.handleChange}/>
                <div style={{ textAlign: "center" }}>
                    <br/>
                <Button className="Button-sizing"
                        type="button"
                        color="primary"
                        onClick={props.handleSkip}
                >Done</Button>
                </div>
            </div>
            </form>
    );
}

export default Step7;