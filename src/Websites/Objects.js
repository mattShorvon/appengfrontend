import React, { Component, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useLocation,
  Switch,
} from "react-router-dom";
import MasterForm from "../index";
import Websitelist from "./websitelist.js";
import Home from "./Home";
import LoginRedux from "./login_redux";
import { createStore } from "redux";
import rootReducer from "../Store/Reducers";
import { ReUserState } from "./actions/userActions";
import { store, persistor } from "./store";
import axios from "axios";
import jwt_decode from "jwt-decode";
import AboutMe from "./Pages/AboutMe";

const SignUpForm = () => {
  return <MasterForm />;
};

class SiteBuilderHome extends React.Component {
  render() {
    return <div>This is the home page</div>;
  }
}

class SiteBuilderAbout extends React.Component {
  render() {
    return <div>This is the about page</div>;
  }
}

function SiteBuilderLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <body>
      <div className="login-form">
        <h1>Login Form</h1>
        <form action="auth" method="POST">
          <input type="text" name="username" placeholder="Username" required />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <input type="submit" />
        </form>
      </div>
    </body>
    // <>
    //   <div className="Login">
    //     <Form onSubmit={handleSubmit}>
    //       <Form.Group size="lg" controlId="email">
    //         <Form.Label>Email</Form.Label>
    //         <Form.Control
    //           autoFocus
    //           type="email"
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //         />
    //       </Form.Group>
    //       <Form.Group size="lg" controlId="password">
    //         <Form.Label>Password</Form.Label>
    //         <Form.Control
    //           type="password"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //         />
    //       </Form.Group>
    //       <Button block size="lg" type="submit" disabled={!validateForm()}>
    //         Login
    //       </Button>
    //     </Form>
    //   </div>
    // </>
  );
}

const WebsiteSelect = ({ match }) => {
  let location = useLocation();
  console.log(location);
  const [loading, setLoading] = useState(true);
  const [websitelist, setWebsiteList] = useState([]);
  useEffect(() => {
    axios
      .post("https://comp0067.herokuapp.com/websitelist")
      .then((response) => setWebsiteList(response.data), setLoading(false));
  }, []);

  // console.log(websitepromise);
  // const websitelist = websitepromise.data;
  console.log(websitelist);
  let showWebsiteList = true;

  if (location.pathname === "/-") {
    showWebsiteList = true;
  } else {
    showWebsiteList = false;
  }
  if (showWebsiteList === true) {
    if (loading) {
      return (
        <div>
          <h1>loading</h1>
        </div>
      );
    } else {
      return (
        <>
          <ul>
            {websitelist.map(({ businessName, userId }) => (
              <li key={userId}>
                <Link
                  // to={`${location.pathname}/${website.businessName}/${showWebsiteList}`}
                  to={`${match.url}/${businessName}/${showWebsiteList}`}
                  onClick={() => {
                    axios
                      .post("https://comp0067.herokuapp.com/logincustomer")
                      .then((result) => {
                        console.log(result.data.token);
                        localStorage.setItem("token", result.data.token);
                        var decoded_token = jwt_decode(result.data.token);
                        console.log(decoded_token);
                        window.location.reload();
                      });
                  }}
                >
                  {businessName}
                </Link>
              </li>
            ))}
          </ul>
          {console.log("next to route")}
          <Route
            // path={`${location.pathname}/:businessName/:showWebsiteList`}
            // render={(websitelist) => <Website websitelist={websitelist} />}
            path={`${match.url}/:businessName/:showWebsiteList`}
            component={Website}

            // render={(websitelist) => <Website websitelist={websitelist} />}
          />
          <hr />
        </>
      );
    }
  } else {
    if (loading) {
      return (
        <div>
          <h1>loading</h1>
        </div>
      );
    } else {
      return (
        <Route
          path={`${match.url}/:businessName/:showWebsiteList`}
          component={Website}
          // render={(websitelist) => <Website websitelist={websitelist} />}
        />
      );
    }
  }
};

const Website = (match) => {
  // console.log(match.params.businessName);
  // console.log(match);
  console.log(match);
  // const website = websitelist.find(
  //   (website) => website.businessName === match.params.businessName
  // );
  return (
    <>
      <Home
        websitename={match.match.params.businessName}
        showWebsiteList={match.match.params.showWebsiteList}
      />
      {/* <div>
        <h1> {match.match.params.businessName}</h1>
      </div> */}
      {/* <Route
            path="/aboutme"
            render={() => <AboutMe name={match.params.name} />}
          /> */}
    </>
  );
};

class NavigationComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthentication: false,
      showComponent: true,
      location: window.location.pathname,
    };
    // if (
    //   window.location.pathname === "/" ||
    //   window.location.pathname === "/about" ||
    //   window.location.pathname === "/-" ||
    //   window.location.pathname === "/signup" ||
    //   window.location.pathname === "/login"
    // ) {
    //   this.setState({ showComponent: true });
    // } else {
    //   this.setState({ showComponent: false });
    // }

    // Store is created here. The store is the globalised state.
    // this store is screwing with the other store! Need to get rid.
    // this.store = createStore(
    //   rootReducer,
    //   window.__REDUX_DEVTOOLS_EXTENSION__ &&
    //     window.__REDUX_DEVTOOLS_EXTENSION__()
    // );
    this.store = store;
    this.setShowComponent = this.setShowComponent.bind(this);
  }

  async componentDidMount() {
    if (
      this.state.location === "/" ||
      this.state.location === "/about" ||
      this.state.location === "/-" ||
      this.state.location === "/signup"
    ) {
      console.log(this.state.location);
      this.setState({ showComponent: true });
    } else {
      console.log(this.state.location);
      this.setState({ showComponent: false });
    }
    if (localStorage.getItem("token")) {
      // here the action is dispatched to the reducer.
      this.store.dispatch(ReUserState(true));
      this.setState({ isAuthentication: true });
    } else {
      this.store.dispatch(ReUserState(false));
      this.setState({ isAuthentication: false });
    }

    // await this.store.subscribe(() => {
    //   //  console.log('app.js',this.store.getState()['Users']['isAuthenticated']);
    //   this.setState({
    //     isAuthentication: this.store.getState()["Users"]["isAuthenticated"],
    //   });
    // });
  }

  logout = () => {
    console.log("logout");
    localStorage.removeItem("token");
    this.store.dispatch(ReUserState(false));
    this.setState({ auth: false });
  };

  setShowComponent(show) {
    this.setState({ showComponent: show });
  }

  render() {
    // if (
    //   window.location.pathname === "/" ||
    //   window.location.pathname === "/about" ||
    //   window.location.pathname === "/-" ||
    //   window.location.pathname === "/signup" ||
    //   window.location.pathname === "/login"
    // ) {
    //   this.setState({ showComponent: true });
    // } else {
    //   this.setState({ showComponent: false });
    // }
    if (this.state.showComponent === true) {
      return (
        <>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About page</Link>
            </li>
            <li>
              <Link to="/-">Website List</Link>
            </li>
            <li>
              <Link to="/signup">Sign up here!</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
          <hr />
          <Switch>
            <Route path="/about">
              <SiteBuilderAbout />
            </Route>
            <Route path="/-" component={WebsiteSelect} />
            <Route path="/signup" component={SignUpForm} />
            <Route
              path="/login"
              render={(props) => (
                <LoginRedux
                  {...props}
                  showComponent={this.state.showComponent}
                  setShowComponent={this.setShowComponent}
                />
              )}
            />
            <Route
              exact
              path="/"
              render={(props) => <SiteBuilderHome {...props} />}
            />
          </Switch>
        </>
      );
    } else {
      return (
        <>
          <Switch>
            <Route path="/about">
              <SiteBuilderAbout />
            </Route>
            <Route path="/-" component={WebsiteSelect} />
            <Route path="/signup" component={SignUpForm} />
            <Route exact path="/">
              <SiteBuilderHome />
            </Route>
          </Switch>
        </>
      );
    }
  }
}

function NavigationComponentnoredux() {
  let location = useLocation();
  console.log(location);
  let showComponent = true;
  if (
    location.pathname === "/" ||
    location.pathname === "/about" ||
    location.pathname === "/-" ||
    location.pathname === "/signup" ||
    location.pathname === "/login"
  ) {
    showComponent = true;
  } else {
    showComponent = false;
  }
  if (showComponent === true) {
    return (
      <>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About page</Link>
          </li>
          <li>
            <Link to="/-">Website List</Link>
          </li>
          <li>
            <Link to="/signup">Sign up here!</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
        <hr />
        <Switch>
          <Route path="/about">
            <SiteBuilderAbout />
          </Route>
          <Route path="/-" component={WebsiteSelect} />
          <Route path="/signup" component={SignUpForm} />
          <Route path="/login" component={LoginRedux} />
          <Route
            exact
            path="/"
            render={(props) => <SiteBuilderHome {...props} />}
          />
        </Switch>
      </>
    );
  }
  return (
    <>
      <Switch>
        <Route path="/about">
          <SiteBuilderAbout />
        </Route>
        <Route path="/-" component={WebsiteSelect} />
        <Route path="/signup" component={SignUpForm} />
        <Route exact path="/">
          <SiteBuilderHome />
        </Route>
      </Switch>
    </>
  );
}

function RouterNavigation() {
  return (
    <>
      <Router>
        <NavigationComponent />
      </Router>
    </>
  );
}

export default RouterNavigation;
