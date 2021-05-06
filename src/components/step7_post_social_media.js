//not being used atm:


import React, {useEffect} from 'react';
import { Button } from "reactstrap";

function Step7(props) {

    if (props.currentStep !== 1000) {
        return null
    }
    return(
        <React.Fragment>
            <form className="form_padding">
            <div className="form-group"
                 style={{textAlign: "center"}}>
                <p className="h4 text-center mb-4">
                    Do you want to post your new website to Facebook and Instagram?</p>
                <p>If you don't have an account, not a problem! Just click No</p>
                <p>Otherwise, click Yes and we'll take care of it for you</p>
                <Button className="Button-sizing button" type="button" onClick={props.handleSkip}>No</Button>
                <Button className="Button-sizing"
                        type="button"
                        color="primary">Yes</Button>
            </div>
            </form>
        </React.Fragment>
    );
}

export default Step7;