// test
import React, { FC } from "react";
import StripeCheckout from "react-stripe-checkout";

const stripeKey = "pk_test_51MUjlsKYZ8D56wK7G1saa66HUyyS6Lxvyjs7s9XpuxksoLP0rnvWSUorCSRu084Vxu6FV59uz4WuFDAss2dLpTPg00yKtvY5Tg"

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
        <StripeCheckout
        
        token={onToken}
        stripeKey= {stripeKey}
        >
            <button style={{ margin: "40px" }}>checkout</button>
        </StripeCheckout>
    );
};

export default Checkout;
