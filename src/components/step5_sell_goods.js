import React, {useEffect} from 'react';
import { Button } from "reactstrap";

function Step5(props) {

    if (props.currentStep !== 5) {
        return null
    }
    return(
        <React.Fragment>
            <form className="form_padding">
            <div className="form-group">
                <p className="h4 text-center mb-4" data-testid="fifthStepHeader">
                    Next we will ask you about the kinds of goods and services that you will be
                    providing through the website. We will first ask about goods:</p>
                <p className="grey-text text-center">Are you selling goods?</p>
                <div style ={{textAlign: "center"}}>
                <Button className="Button-sizing button" type="button" onClick={props.handleSkip}>No</Button>
                <Button className="Button-sizing"
                        type="button"
                        color="primary"
                        data-testid="nextBtnItems"
                onClick={props.handleFirstService}>Yes</Button>
                </div>
            </div>
            </form>
        </React.Fragment>
    );
}

export default Step5;