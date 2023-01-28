// test
import React, { FC } from "react";
import StripeCheckout from "react-stripe-checkout";

const Checkout: FC = () => {
    const onToken = (token: any = null) => {
        console.log(token);
        // fetch("/save-stripe-token", {
        //     method: "POST",
        //     body: JSON.stringify(token),
        // }).then((response) => {
        //     response.json().then((data) => {
        //         alert(`We are in business, ${data.email}`);
        //     });
        // });
    };
    return (
        <StripeCheckout>
            <button style={{ margin: "40px" }}>checkout</button>
        </StripeCheckout>
    );
};

export default Checkout;
