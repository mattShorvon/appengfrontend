import React, {useEffect} from 'react';
import {Button} from "reactstrap";

function Step8(props) {

    if (props.currentStep !== 8) {
        return null
    }
    return(
        <React.Fragment>
            <div className="form-group"
                 style={{textAlign: "center"}}>
                <p className="h4 text-center">
                    Your new and cool website!</p>
                 <Button className="Button-sizing button" type="button" color="primary"onClick={props.register}> Click here to submit</Button>
            </div>
        </React.Fragment>
    );
}

export default Step8;