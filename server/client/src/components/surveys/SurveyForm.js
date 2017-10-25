// SurveyForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import { Link } from 'react-router-dom'
import validateEmails from '../../utils/validateEmails'
import formFields from './formFields';

class SurveyForm extends Component {
	renderFields() {
    // TODO: FIGURE OUT WHAT LODASH DOES
		return _.map(formFields, ({ label, name }) => {
      return <Field key={name} component={SurveyField} type="text" label={label} name={name} />
		});
	}
	render() {
		// handleSubmit is a function that is provided to us automatically by the reduxForm helper wired at the bottom
		return (
			<div>				
				<form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}					
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
					<button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
				</form>
			</div>
		);
	}
}

function validate(values) {
  const errors = {}
  errors.recipients = validateEmails(values.recipients || '');

  _.each(formFields, ({ name, noValueError }) => {
    if (!values[name]) {
      errors[name] = noValueError;
    }
  });
  return errors;
}

// redux form allows other components to access form values
export default reduxForm({
  validate: validate,
	form: 'surveyForm',
  // prevent the form from losing form inputs when the component is 
  // unmounted when switching between SurveyNew and SurveyFormsReview
  destroyOnUnmount: false
})(SurveyForm);