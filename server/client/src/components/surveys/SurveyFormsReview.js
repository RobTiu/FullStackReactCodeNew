import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
// use withRouter component to get access to the history object property to navigate pages
import { withRouter } from 'react-router-dom';
// connect the actions in order to save the values
import * as actions from '../../actions';

// the argument { onCancel, formValues } comes from the value 'props'
const SurveyFormsReview = ({ onCancel, formValues, submitSurvey, history }) => {
  const reviewFields = _.map(formFields, field => {
    return (
      <div key={field.name}>
        <label>{field.label}</label>
        <div>
          {formValues[field.name]}
        </div>
      </div>
    );
  });

  return (
    <div>
      <h5>Please confirm entries</h5>
      {reviewFields}
      <button className="yellow darken-3 white-text btn-flat" onClick={onCancel}>
        Back
      </button>
      <button onClick={() => submitSurvey(formValues, history)} className="green btn-flat white-text right">
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );

};

function mapStateToProps(state) {
   // now our component can have access to the form values from SurveyForm.js
  return {
    formValues: state.form.surveyForm.values
  };
}

// connect to the redux store to access all the states of the store
export default connect(mapStateToProps, actions)(withRouter(SurveyFormsReview));