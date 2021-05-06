import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import CheckoutPanel from './CheckoutPanel';
import { useHistory } from "react-router-dom";
import { savePaymentMethod } from '../actions/cartActions';

export default function PayScreen({ websitename, showWebsiteList }) {
    
    const [paymentMethod, setPaymentMethod] = useState('Bank Transfer')
    const history = useHistory();
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        let path = `/-/${websitename}/${showWebsiteList}/confirmorder`;
        history.push(path);
        
    };
    
    return (
        <div>
            <CheckoutPanel step1 step2 ></CheckoutPanel>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Payment Method</h1>
                </div>
                <div>
                    <div>
                        <input type="radio" id="banktransfer" value="Bank Transfer" name="paymentMethod" required checked onChange={(e) => setPaymentMethod(e.target.value)}>
                        </input>
                        <label htmlFor="paypal">Bank Transfer</label>
                    </div>
                    <div>
                        <input type="radio" id="cash" value="Cash" name="cash" required checked onChange={(e) => setPaymentMethod(e.target.value)}>
                        </input>
                        <label htmlFor="stripe">Cash on Delivery</label>
                    </div>
                    <button>Continue</button>
                </div>
            </form>
        </div>
    )
}
