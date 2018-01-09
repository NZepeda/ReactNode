import React, {Component} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import {connect} from 'react-redux';
import * as actions from '../actions';

class Payments extends Component{
    render(){
        return(
            <StripeCheckout
                name="Emaily"
                description="User credits" 
                amount={77 * 100} 
                token={token => this.props.handleToken(token)}
                stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY} 
            >
                <button className="btn"> Get Credits</button>
            </StripeCheckout>
        )
    }
}

export default connect(null, actions)(Payments);
