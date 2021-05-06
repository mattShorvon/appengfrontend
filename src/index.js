import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Step1 from "./components/step1";
import Step2 from "./components/step2";
import Step3 from "./components/step3";
import Step4 from "./components/step4_about_me_text";
import Step5 from "./components/step5_sell_goods";
import Step5_1 from "./components/step5_1_goods_page";
import Step6 from "./components/step6_sell_services";
import Step6_1 from "./components/step6_1_services_page";
import Step7 from "./components/step7_post_social_media";
import Step8 from "./components/step_done_website_mockup";
import Homepage from "./components/homepage";
import "./css/Test.styles.css";
import { Button } from "reactstrap";
import RouterNavigation from "./Websites/Objects.js";
import { store, persistor } from "./Websites/store";
import { Provider } from "react-redux";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import axios from "axios";
import { PersistGate } from "redux-persist/integration/react";

class MasterForm extends React.Component {
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
      goods: [],
      services: [],
      emailValid: true,
      businessValid: true,
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleChange2 = (e) => {
    const { name, value } = e;
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

  // this function checks if the email is valid:
  async checkEmailAvailability() {
    const datapoint = {
      email: this.state.email,
    };
    const data = await axios.get(
      "http://comp0067.herokuapp.com/api/users/checkmail",
      { params: datapoint }
    );
    let emailValid = data.data.emailValid;
    this.setState({
      emailValid: emailValid,
    });
  }

  async checkBusinessNameAvailability() {
    const datapoint = {
      businessName: this.state.businessName,
    };
    const data = await axios.get(
      "http://comp0067.herokuapp.com/api/users/checkbusiness",
      { params: datapoint }
    );
    console.log(data);
    let businessValid = data.data.businessValid;
    this.setState({
      businessValid: businessValid,
    });
  }

  //The next function takes the form to the next step, but also performs validation on the current step
  //and allows or denies moving forward.

  _next = () => {
    let currentStep = this.state.currentStep;

    //validating first step values:
    if (this.state.currentStep === 1) {
      let step1_values = ["firstName", "lastName", "email", "postcode"];
      for (let i = 0; i < step1_values.length; i++) {
        if (!this.state[step1_values[i]]) {
          alert("Please fill in the " + step1_values[i]);
          return;
        }
        // checks if the email is taken or not:
        else if (step1_values[i] === "email") {
          this.checkEmailAvailability();
          // wait for the checkEmailAvailability to finish
          setTimeout(() => {
            if (this.state.emailValid === false) {
              alert("This email is already taken. Please use another one.");
            }
          }, 100);
        }
        setTimeout(() => {
          if (
            step1_values[i] === "postcode" &&
            this.state.emailValid === true
          ) {
            currentStep = Math.trunc(currentStep) + 1;
            console.log({ currentStep });
            this.setState({
              currentStep: currentStep,
            });
          }
        }, 150);
      }
    }
    //validating the second step values:
    if (this.state.currentStep === 2) {
      let password = this.state.password;
      let passwordVerify = this.state.passwordVerify;
      if (password === "" || passwordVerify === "") {
        alert("Please fill in both fields");
      } else if (password.length < 5) {
        alert("The password needs to have at least 5 characters in length");
      } else if (password !== passwordVerify) {
        alert("The password and password verification must match!");
      } else {
        currentStep = Math.trunc(currentStep) + 1;
        console.log({ currentStep });
        this.setState({
          currentStep: currentStep,
        });
      }
    }

    //validating the third step values:
    if (this.state.currentStep === 3) {
      let businessName = this.state.businessName;
      if (businessName === "") {
        alert("You need to add a business name. Make it something cool!");
      } else if (businessName.length < 3) {
        alert("Your business needs to have at least three letters in it");
      } else if (!businessName.match(/^[A-Za-z0-9_ -']+$/)) {
        alert(
          `Your business name sucks...or at least it doesn't have valid characters. Use letters, numbers spaces or underscores`
        );
      } else {
        //validating the business name
        this.checkBusinessNameAvailability();
        setTimeout(() => {
          if (this.state.businessValid === false) {
            alert(
              "This business name is already taken. Find a different, even cooler one!"
            );
          }
        }, 100);

        setTimeout(() => {
          if (this.state.businessValid === true) {
            currentStep = Math.trunc(currentStep) + 1;
            console.log({ currentStep });
            this.setState({
              currentStep: currentStep,
            });
          }
        }, 150);
      }
    }

    //validating fourth step values:
    if (this.state.currentStep === 4) {
      let description = this.state.aboutMeText;
      if (description === "") {
        alert(
          "Add a short description, even if it's a few words. You can change it later"
        );
      } else {
        currentStep = Math.trunc(currentStep) + 1;
        console.log({ currentStep });
        this.setState({
          currentStep: currentStep,
        });
      }
    }

    //validating fifth step values:
    if (Math.trunc(this.state.currentStep) === 5) {
      currentStep = Math.trunc(currentStep) + 1;
      console.log({ currentStep });
      this.setState({
        currentStep: currentStep,
      });
    }

    //validating sixth step values:
    if (Math.trunc(this.state.currentStep) === 6) {
      currentStep = Math.trunc(currentStep) + 1;
      console.log({ currentStep });
      this.setState({
        currentStep: currentStep,
      });
    }
  };

  _next_0_1 = () => {
    let currentStep = this.state.currentStep;
    currentStep = currentStep + 0.1;
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

  _prev_0_1 = () => {
    let currentStep = this.state.currentStep;
    currentStep = currentStep <= 1 ? 1 : currentStep - 0.1;
    this.setState({
      currentStep: currentStep,
    });
  };

  previousButton() {
    let currentStep = this.state.currentStep;
    if (
      currentStep !== 1 &&
      currentStep !== 0 &&
      currentStep < 9 &&
      currentStep &&
      Number.isInteger(currentStep)
    ) {
      return (
        <Button className="Button-sizing" type="button" onClick={this._prev}>
          Click to go back
        </Button>
      );
    }
    return null;
  }

  nextButton() {
    let currentStep = this.state.currentStep;
    if (
      currentStep < 6 &&
      currentStep !== 0 &&
      currentStep !== 5 &&
      currentStep !== 6 &&
      Number.isInteger(currentStep)
    ) {
      return (
        <Button
          className="Button-sizing"
          type="button"
          color="primary"
          data-testid="mainNextBtn"
          onClick={this._next}
        >
          Click to keep going
        </Button>
      );
    }
    return null;
  }

  Register = () => {
    const firstName = this.state.firstName;
    const lastName = this.state.lastName;
    const email = this.state.email;
    const address = this.state.address;
    const postcode = this.state.postcode;
    const phoneNumber = this.state.phoneNumber;
    const aboutMe = this.state.aboutMeText;
    const password = this.state.password;
    const businessName = this.state.businessName;
    const goods = this.state.goods;
    const services = this.state.services;
    console.log(this.state.goods);

    //pushing the data into the backend:
    const userData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      userAddress: address,
      postcode: postcode,
      phoneNumber: phoneNumber,
      aboutMeDescription: aboutMe,
      dataPassword: password,
      businessName: businessName,
      userGoods: goods,
      userServices: services,
    };

    axios
      .post("http://comp0067.herokuapp.com/api/users/Register", userData)
      .then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  render() {
    return (
      <React.Fragment>
        <Homepage
          handleCreateNewWebsite={this.handleCreateNewWebsite}
          currentStep={this.state.currentStep}
        />

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
          handleFirstService={this._next_0_1}
        />

        <Step5_1
          currentStep={this.state.currentStep}
          handleChange={this.handleChange2}
          handleSkipToServices={this._next}
          handleNextService={this._next_0_1}
          handleBackToGoods={this._prev_0_1}
          items={this.state.goods}
        />

        <Step6
          currentStep={this.state.currentStep}
          handleChange={this.handleChange2}
          handleSkip={this._next}
          handleNextService={this._next_0_1}
          handleBackToGoods={this._prev_0_1}
          handleFirstItem={this._next_0_1}
        />

        <Step6_1
          currentStep={this.state.currentStep}
          handleChange={this.handleChange2}
          handleSkipToServices={this._next}
          handleNextService={this._next_0_1}
          handleBackToGoods={this._prev_0_1}
          items={this.state.services}
        />

        <Step7
          currentStep={this.state.currentStep}
          handleChange={this.handleChange}
          handleSkip={this._next}
        />

        <Step8 currentStep={this.state.currentStep} register={this.Register} />

        <div style={{ textAlign: "center" }}>
          {this.previousButton()}
          {this.nextButton()}
        </div>
      </React.Fragment>
    );
  }
}
export default MasterForm;

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <RouterNavigation />
    </PersistGate>
  </Provider>,
  document.getElementById("root") || document.createElement("div")
);
