// react-stripe wrapper
import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
	render() {
		return (
			// token is what you get from stripe after verification of credit card.  You put a callback function in token
			<StripeCheckout
				name="Emaily"
				description="$5 for 5 email credits"
				amount={500}
				token={token => this.props.handleToken(token)}
				stripeKey={process.env.REACT_APP_STRIPE_KEY}
			>
				<button className="btn">
					Add credits
				</button>
			</StripeCheckout>
		);
	}
}

export default connect(null, actions)(Payments);