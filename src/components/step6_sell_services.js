import React, {useEffect} from 'react';
import { Button } from "reactstrap";

function Step6(props) {
    if (props.currentStep !== 6) {
        return null
    }
    return (
        <React.Fragment>
            <form className="form_padding">
                <div className="form-group">
                    <p className="h4 text-center mb-4">
                        That's great! You're almost done.</p>
                    <p className="grey-text text-center" data-testid="serviceConfHeading">Are you selling services?</p>
                    <div style ={{textAlign: "center"}}>
                        <Button className="Button-sizing button" type="button" onClick={props.handleSkip}>No</Button>
                        <Button className="Button-sizing"
                                type="button"
                                color="primary"
                                data-testid="nextBtnServices"
                                onClick={props.handleFirstItem}>Yes</Button>
                    </div>
                </div>
            </form>
        </React.Fragment>
    );
}

export default Step6;