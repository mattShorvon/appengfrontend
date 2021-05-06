import React from 'react';

function Step4(props) {
    if (props.currentStep !== 4) {
        return null
    }
    return(
        <React.Fragment>
            <form className="form_padding">
            <div className="form-group"
                 style={{textAlign: "center"}}>
                <p className="h4 text-center mb-4" data-testid="fourthStepHeader">Add a short description about yourself!</p>
                <p>This will create a section called 'About me' on your webpage,
                that the customer can see</p>
                <textarea style={{minWidth: "300px", minHeight: "100px", overflowWrap: "break-word"}}
                       className="form-control"
                       id="aboutMeText"
                       name="aboutMeText"
                       type="text"
                       placeholder="Add description here"
                       data-testid = "aboutMe"
                       value={props.aboutMeText}
                       onChange={props.handleChange}
                />
            </div>
            </form>
        </React.Fragment>
    );
}

export default Step4;