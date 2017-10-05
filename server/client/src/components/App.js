import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux'; // for action creators
import * as actions from '../actions';

// BrowserRouter - brains, tells react router how to behave and show the user depending on the circumstances
// Route sets up a rule to determine what's accessible
// WEBPACK is a module loader.  

import Header from './Header';
import Landing from './Landing';
const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>

class App extends Component {
	componentDidMount() {
		this.props.fetchUser();
	}

	render() {
		return (
			<div>
				<BrowserRouter>
					<div className="container">
						<Header />
						<Route exact={true} path="/" component={Landing} />
						<Route exact={true} path="/surveys" component={Dashboard} />
						<Route path="/surveys/new" component={SurveyNew} />
					</div>
				</BrowserRouter>
			</div>
		);
	}
};

// connect('map state to props argument', 'all the different action creators')
export default connect(null, actions)(App); // inside the app component, they are now accessible as PROPS