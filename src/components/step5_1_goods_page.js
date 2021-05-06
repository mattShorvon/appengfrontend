import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import axios from "axios";

function Step5_1(props) {
  const [realTimeItems, setRealTimeItems] = useState(1);
  const [finalNrItems, setFinalNrItems] = useState(0);
  const [itemsCount, setItemsCount] = useState(0);
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  const [itemPicture, setItemPicture] = useState("");

  //to scroll to top:
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [itemsCount]);

  const skipToServices = () => {
    setFinalNrItems(0);
    setItemsCount(0);
    props.handleSkipToServices();
  };

  const _nextItem = () => {
    let currentGood = itemsCount;
    let finalGoods = finalNrItems;
    let items_c = props.items;

    items_c[currentGood] = {
      itemCount: currentGood,
      itemName: itemName,
      itemDescription: itemDescription,
      itemPrice: itemPrice,
      itemQuantity: itemQuantity,
      itemPicture: itemPicture,
      itemCategory: "Good",
    };

    let checkItem = ["itemName", "itemDescription", "itemPrice", "itemPicture"];

    for (let i = 0; i < checkItem.length; i++) {
      if (!items_c[currentGood][checkItem[i]]) {
        alert(`You've got to add ` + checkItem[i]);
        return;
      } else if (
        currentGood + 1 < finalGoods &&
        checkItem[i] === "itemPicture"
      ) {
        let b = { items: items_c };
        props.handleChange(b);
        console.log(items_c);

        currentGood = currentGood + 1;
        setItemsCount(currentGood);

        // if the item number already exists in the array, display it. Otherwise display empty values
        if (currentGood in items_c) {
          setItemName(items_c[currentGood].itemName);
          setItemDescription(items_c[currentGood].itemDescription);
          setItemPrice(items_c[currentGood].itemPrice);
          setItemQuantity(items_c[currentGood].itemQuantity);
          setItemPicture(items_c[currentGood].itemPicture);
        } else {
          setItemName("");
          setItemDescription("");
          setItemPrice("");
          setItemQuantity("");
          setItemPicture("");
        }
      } else if (checkItem[i] === "itemPicture") {
        let b = { items: items_c };
        props.handleChange(b);
        console.log(items_c);

        setFinalNrItems(0);
        setItemsCount(0);
        props.handleSkipToServices();
      }
    }
  };

  const _previousItem = () => {
    let currentGood = itemsCount;

    if (currentGood > 0) {
      currentGood = currentGood - 1;
      setItemsCount(currentGood);
      let items_c = props.items;
      setItemName(items_c[currentGood].itemName);
      setItemDescription(items_c[currentGood].itemDescription);
      setItemPrice(items_c[currentGood].itemPrice);
      setItemQuantity(items_c[currentGood].itemQuantity);
      setItemPicture(items_c[currentGood].itemPicture);

      console.log(props.items[currentGood]);
      console.log(props.items);
    } else {
      setFinalNrItems(0);
    }
  };

  const _setItem = () => {
    setFinalNrItems(realTimeItems);
  };

  const uploadHandler = (event) => {
    const data = new FormData();
    data.append("file", event.target.files[0]);

    axios
      .post("https://comp0067.herokuapp.com/api/users/upload", data)
      .then((res) => {
        console.log(res.data);
        setItemPicture(res.data.filename);
      });
  };

  if (props.currentStep !== 5.1 && finalNrItems === 0) {
    return null;
  } else if (props.currentStep === 5.1 && finalNrItems === 0) {
    return (
      <React.Fragment>
        <form className="form_padding">
          <div className="form-group">
            <p className="h4 text-center mb-4" data-testid="goodNrHeader">
              How many goods would you like to set up right now?
            </p>
            <p className="text-center">
              {" "}
              Click on the number below and make your selection:{" "}
            </p>
            <p className="text-center">
              {" "}
              (Don't worry, you'll be able to add more or remove existing ones
              later on){" "}
            </p>
            <select
              className="form-control"
              id="dropdown"
              onChange={(event) => {
                setRealTimeItems(event.target.value);
              }}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
            </select>
            <div style={{ textAlign: "center" }}>
              <Button
                className="Button-sizing button"
                type="button"
                onClick={props.handleBackToGoods}
              >
                Go back
              </Button>
              <Button
                className="Button-sizing"
                type="button"
                color="primary"
                data-testid="confirmItemNrBtn"
                onClick={_setItem}
              >
                Continue
              </Button>
            </div>
            <div>Nr of goods is: {realTimeItems}</div>
          </div>
        </form>
      </React.Fragment>
    );
  } else if (
    props.currentStep === 5.1 &&
    finalNrItems > 0 &&
    itemsCount < finalNrItems
  ) {
    return (
      <React.Fragment>
        <form className="form_padding">
          <div>
            <p className="h4 text-center mb-4">Good Number {itemsCount + 1}</p>
            <label htmlFor="defaultFormCardNameEx" className="grey-text">
              Name of Item:
            </label>
            <input
              type="text"
              id="itemName"
              name="itemName"
              className="form-control"
              data-testid="goodName"
              value={itemName}
              onChange={(event) => {
                setItemName(event.target.value);
              }}
            />
            <br />
            <br />
            <label htmlFor="defaultFormCardNameEx" className="grey-text">
              Item Description:
            </label>
            <textarea
              style={{
                minWidth: "300px",
                minHeight: "100px",
                overflowWrap: "break-word",
              }}
              className="form-control"
              id="password"
              name="password"
              type="text"
              placeholder="Add description here"
              data-testid="goodDescription"
              value={itemDescription}
              onChange={(event) => {
                setItemDescription(event.target.value);
              }}
            />

            <br />
            <label htmlFor="defaultFormCardNameEx" className="grey-text">
              Item Price (£):
            </label>
            <input
              type="text"
              id="itemPrice"
              name="itemPrice"
              className="form-control"
              value={itemPrice}
              data-testid="goodPrice"
              onChange={(event) => {
                setItemPrice(event.target.value);
              }}
            />

            <br />
            <label htmlFor="defaultFormCardNameEx" className="grey-text">
              Item Quantity:
            </label>
            <input
              type="text"
              id="itemQuantity"
              name="itemQuantity"
              className="form-control"
              value={itemQuantity}
              data-testid="goodQuantity"
              onChange={(event) => {
                setItemQuantity(event.target.value);
              }}
            />
            <br />

            <p className="grey-text text-center font-weight-bold">
              {" "}
              Item Pictures
            </p>

            <p className="grey-text text-center">
              (Upload the picture by clicking 'Choose file' below.):
            </p>

            <input
              type="file"
              name="file"
              data-testid="goodImage"
              onChange={uploadHandler}
              style={{ color: "rgba(0, 0, 0, 0)" }}
            />
            <div>
              {itemPicture !== "" ? (
                <img src={`https://comp0067.herokuapp.com/${itemPicture}`} />
              ) : (
                ""
              )}
            </div>

            <div style={{ textAlign: "center" }}>
              <p className="grey-text text-center font-weight-bold">
                {" "}
                Have you finished adding all of the information above?
              </p>
              <Button
                className="Button-sizing button"
                type="button"
                color="primary"
                data-testid="nextGoodStepBtn"
                onClick={_nextItem}
              >
                Next goodie that you want to sell
              </Button>
              <br />
              <Button
                className="Button-sizing"
                type="button"
                onClick={_previousItem}
              >
                Go back to previous page
              </Button>
              <Button
                className="Button-sizing"
                type="button"
                color="warning"
                onClick={skipToServices}
              >
                Skip adding goods for now
              </Button>
            </div>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default Step5_1;
