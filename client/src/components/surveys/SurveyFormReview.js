import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import formFields from './formFields';
import * as actions from '../../actions/index';
import {withRouter} from 'react-router-dom';



const SurveyFormReview = (props) => {
    const reviewFields = _.map(formFields, field => {
        return(
            <div key={field.name}>
                <label>{field.label}</label>
                <div>{props.formValues[field.name]}</div>
            </div>
        )
    })
    return (
        <div>
            <h5>Please confirm your entries</h5>
            <div>
                {reviewFields}
            </div>
            <button className="yellow white-text btn-flat" onClick={props.onCancel} style={{marginTop: '15px'}}>Back</button>
            <button className="green white-text btn-flat right" onClick={() => props.submitSurvey(props.formValues, props.history)}>
                Send Survey
                <i className="material-icons right">email</i>
            </button>
        </div>
    )
}

function mapStateToProps(state){
    return {formValues: state.form.surveyForm.values}
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));