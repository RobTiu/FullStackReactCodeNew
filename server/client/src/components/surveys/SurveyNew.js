// Survey New shows Survey Form and SurveyFormReview
import React, { Component } from 'react';
import SurveyForm from './SurveyForm';
import { reduxForm } from 'redux-form';
import SurveyFormsReview from './SurveyFormsReview';

class SurveyNew extends Component {
  constructor(props) {
    super(props);

    this.state = { showFormReview: false };
  }

  renderContent() {
    if (!this.state.showFormReview) {
      return (<SurveyForm 
        onSurveySubmit={() => this.setState({ showFormReview: true })} 
      />);
    }

    return (
      <SurveyFormsReview 
        onCancel={() => this.setState({ showFormReview: false })}
      />
    );
  }

	render() {
		return (
			<div>
				{this.renderContent()}
			</div>
		);
	}
}
// adding this here will allow us to destroy the form when the SurveyNew component is
// unmounted because we did not pass in the option destroyOnUnmount: false
export default reduxForm({
  form: 'surveyForm'
})(SurveyNew);