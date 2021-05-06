import React from "react";
import "../index.css";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import Step4 from "./step4_about_me_text";
import Step5 from "./step5_sell_goods";
import Step6 from "./step6_sell_services";
import Step7 from "./step7_post_social_media";
import Step8 from "./step_done_website_mockup";
import Homepage from "./homepage";
import "../css/Test.styles.css";
import { Button } from "reactstrap";

class Masterform_archive extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 0,
      email: "",
      test: "",
      username: "",
      password: "",
      passwordVerify: "",
      firstName: "",
      lastName: "",
      address: "",
      postcode: "",
      phoneNumber: "",
      businessName: "",
      aboutMeText: "",
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, test, username, password } = this.state;
    alert(`Your registration detail: \n 
           Email: ${email} \n
           Test: ${test} \n
           Username: ${username} \n
           Password: ${password}`);
  };

  handleCreateNewWebsite = () => {
    this.setState({
      currentStep: 1,
    });
  };

  handleCreateGoods = () => {
    this.setState({
      currentStep: 6,
    });
  };

  handleHideButtons = () => {
    this.setState({
      currentStep: 0,
    });
  };

  _next = () => {
    let currentStep = this.state.currentStep;
    currentStep = currentStep + 1;
    this.setState({
      currentStep: currentStep,
    });
  };

  _prev = () => {
    let currentStep = this.state.currentStep;
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    this.setState({
      currentStep: currentStep,
    });
  };

  // previousButton() {
  //   let currentStep = this.state.currentStep;
  //   if(currentStep !==1 && currentStep !==0 && currentStep <5){
  //     return (
  //       <button style={{textAlign: "center"}}
  //         className="btn btn-secondary"
  //         type="button" onClick={this._prev}>
  //       Previous
  //       </button>
  //     )
  //   }
  //   return null;
  // }

  previousButton() {
    let currentStep = this.state.currentStep;
    if (currentStep !== 1 && currentStep !== 0 && currentStep < 5) {
      return (
          <Button className="Button-sizing" type="button" onClick={this._prev}>
            Click to go back
          </Button>
      );
    }
    return null;
  }

  // nextButton(){
  //   let currentStep = this.state.currentStep;
  //   if(currentStep <5 && currentStep !==0){
  //     return (
  //       <button
  //         className="btn btn-primary float-right"
  //         type="button" onClick={this._next}>
  //       Next
  //       </button>
  //     )
  //   }
  //   return null;
  // }

  nextButton() {
    let currentStep = this.state.currentStep;
    if (currentStep < 5 && currentStep !== 0) {
      return (
          <Button
              className="Button-sizing"
              type="button"
              color="primary"
              onClick={this._next}
          >
            Click to keep going
          </Button>
      );
    }
    return null;
  }

  render() {
    return (
        <React.Fragment>
          <Homepage
              handleCreateNewWebsite={this.handleCreateNewWebsite}
              currentStep={this.state.currentStep}
          />
          <form onSubmit={this.handleSubmit}>
            <Step1
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
                firstName={this.state.firstName}
                lastName={this.state.lastName}
                email={this.state.email}
                address={this.state.address}
                postcode={this.state.postcode}
                phoneNumber={this.state.phoneNumber}
            />
            <Step2
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
                password={this.state.password}
                passwordVerify={this.state.passwordVerify}
            />
            <Step3
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
                password={this.state.businessName}
            />
            <Step4
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
                aboutMeText={this.state.aboutMeText}
            />

            <Step5
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
                handleSkip={this._next}
            />

            <Step6
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
                handleSkip={this._next}
            />

            <Step7
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
                handleSkip={this._next}
            />

            <Step8 currentStep={this.state.currentStep} />

            <div style={{ textAlign: "center" }}>
              {this.previousButton()}
              {this.nextButton()}
            </div>
          </form>
        </React.Fragment>
    );
  }
}

export default Masterform_archive;
