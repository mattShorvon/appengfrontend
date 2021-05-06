import React, { useEffect, useState } from "react";
import MainNavbar from "./Navbar";
// import { useLocalStorage } from "./util";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AboutMe from "./Pages/AboutMe";
import Products from "./Pages/Products";
import Core from "./Pages/Core";
import SignUp from "./Pages/SignUp";
import Basket from "./Pages/Basket";
import websitelist from "./websitelist.js";
import { useHistory } from "react-router-dom";
import Orders from "./Pages/Orders";
import ChangeProducts from "./Pages/ChangeProducts";
import RemoveProducts from "./Pages/RemoveProducts";
import CheckoutPanel from "./Pages/CheckoutPanel";
import ShippingAddressScreen from "./Pages/ShippingAddress";
import "../css/checkout.css";
import PayScreen from "./Pages/PayScreen";
import ConfirmOrder from "./Pages/ConfirmOrder";
import Services from "./Pages/Services";
import OrderNotice from "./Pages/OrderNotice";
import { findWebsiteName } from "./actions/homeActions";

function Home({ showWebsiteList, websitename }) {
  // const websiteobj = websitelist.find(
  //   (website) => website.name === websitename
  // );
  // const [products] = useState(websiteobj.items);
  // const history = useHistory();
  const dispatch = useDispatch();
  console.log(websitename);
  let history = useHistory();

  useEffect(() => {
    dispatch(findWebsiteName(websitename));
  }, []);

  return (
    <>
      <Router>
        <MainNavbar
          websitename={websitename}
          showWebsiteList={showWebsiteList}
        />
        <Switch>
          <Route
            path={`/-/${websitename}/${showWebsiteList}`}
            exact
            render={() => <Core websitename={websitename} />}
          />
          <Route
            path={`/-/${websitename}/${showWebsiteList}/checkoutpanel`}
            exact
            render={() => <CheckoutPanel />}
          />
          <Route
            path={`/-/${websitename}/${showWebsiteList}/aboutme`}
            render={() => <AboutMe websitename={websitename} />}
          />
          <Route
            exact
            path={`/-/${websitename}/${showWebsiteList}/whatsonoffer`}
          >
            {" "}
            <>
              {" "}
              <Products
                websitename={websitename}
                showWebsiteList={showWebsiteList}
              />{" "}
            </>
          </Route>
          <Route path={`/-/${websitename}/${showWebsiteList}/sign-up`}>
            {" "}
            <SignUp />
          </Route>
          <Route path={`/-/${websitename}/${showWebsiteList}/basket`}>
            {" "}
            <Basket
              websitename={websitename}
              showWebsiteList={showWebsiteList}
            />
          </Route>
          <Route path={`/-/${websitename}/${showWebsiteList}/orders`}>
            {" "}
            <Orders />
          </Route>
          <Route path={`/-/${websitename}/${showWebsiteList}/adjustproducts`}>
            {" "}
            <ChangeProducts />
          </Route>
          <Route path={`/-/${websitename}/${showWebsiteList}/removeproducts`}>
            {" "}
            <RemoveProducts />
          </Route>
          <Route path={`/-/${websitename}/${showWebsiteList}/shipping`}>
            {" "}
            <ShippingAddressScreen
              websitename={websitename}
              showWebsiteList={showWebsiteList}
            />
          </Route>
          <Route path={`/-/${websitename}/${showWebsiteList}/payments`}>
            {" "}
            <PayScreen
              websitename={websitename}
              showWebsiteList={showWebsiteList}
            />
          </Route>
          <Route path={`/-/${websitename}/${showWebsiteList}/confirmorder`}>
            {" "}
            <ConfirmOrder
              websitename={websitename}
              showWebsiteList={showWebsiteList}
            />
          </Route>
          <Route path={`/-/${websitename}/${showWebsiteList}/services`}>
            {" "}
            <Services
              websitename={websitename}
              showWebsiteList={showWebsiteList}
            />
          </Route>
          <Route path={`/-/${websitename}/${showWebsiteList}/ordernotice`}>
            {" "}
            <OrderNotice
              websitename={websitename}
              showWebsiteList={showWebsiteList}
            />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default Home;
