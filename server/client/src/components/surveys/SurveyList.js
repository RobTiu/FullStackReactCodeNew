import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';

class SurveyList extends Component {
  // lifecycle method call this action only when this component is rendered
  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderSurveys() {
    return this.props.surveys.reverse().map(survey => {
      return (
        <div className="card darken-1" key={survey._id}>
          <div className="card-content">
            <span className="card-title">{survey.title}</span>
            <p>
              {survey.body}
            </p>
            <p className="right">
              Sent On: {new Date(survey.dateSent).toLocaleDateString()}
            </p>
          </div>
          <div className="card-action">
            <a>Yes: {survey.yes}</a>
            <a>No: {survey.no}</a>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div> 
        {this.renderSurveys()}
      </div>
    );
  }
}

/*function mapStateToProps(state) {
  return {surveys: state.surveys}
}

function mapStateToProps({ surveys }) {
  return {surveys: surveys}
}*/

function mapStateToProps({ surveys }) {
  return {surveys}
}

// mapStateToProps will contain the data that has been provided to us by the action creator 'fetchSurveys'
// the second argument you pass is the action INSIDE an object that we can call and grab the list of surveys from mongoose
export default connect(mapStateToProps, {fetchSurveys})(SurveyList);