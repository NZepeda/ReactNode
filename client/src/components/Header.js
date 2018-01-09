import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {

    logoRedirect() {
        switch(this.props.auth){
            // user is not logged in
            case null || false:
                return '/';
            // if user is logged in, redirect to dashboard
            default: 
                return '/surveys';
        }
    }
    renderContent(){
        console.log(this.props.auth);
        switch(this.props.auth){
            case null:
                return;
            case false:
                return(
                    <li><a href="/auth/google">Login with Google</a></li>
                );
            default:
                return [
                    <li key="1"><Payments /></li>,
                    <li key="3" style={{margin: '0 10px'}}>Credits: {this.props.auth.credits}</li>,
                    <li key="2"><a href="/api/logout">Log Out</a></li>
                ];
        }
    }

    render(){
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link className="left brand-logo" to={this.logoRedirect()}>
                        Emaily
                    </Link>
                    <ul id="nav-mobile" className="right">
                        {this.renderContent()}
                    </ul>
                </div>
          </nav>
        )
    }
}

function mapStateToProps(state){
    return {auth:state.auth}
}

export default connect(mapStateToProps)(Header);