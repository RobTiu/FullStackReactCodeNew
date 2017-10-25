// surveyfield contains logic to render a single label and text input
// SurveyForm shows a form for a user to add input
import React from 'react';

export default ({ input, label, meta: {error, touched} }) => {
  // ...input takes all the paramaters from the argument. i.e. input.onBlur, etc that has been given by the react-form Field component
	return (
			<div>	
        <label>{label}</label>
				<input {...input} style={{ marginBottom: '5px'}} />
        <div className="red-text" style={{ marginBottom: '20px '}}>
          {touched && error}
        </div>
			</div>
		);
}