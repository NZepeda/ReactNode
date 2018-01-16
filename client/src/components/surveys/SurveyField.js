import React, {Component} from 'react';

class SurveyField extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <label>{this.props.label}</label>
                <input {...this.props.input} style={{marginBottom: '5px'}}/>
                <div className="red-text" style={{marginBottom: '15px'}}>
                    {this.props.meta.touched && this.props.meta.error}
                </div>
            </div>
        )
    }
}

export default SurveyField;