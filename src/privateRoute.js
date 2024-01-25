import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import LoginPage from './Components/Login/LoginPage';

/**
* @author
* @class PrivateRoute
**/

class PrivateRoute extends Component {
    state = {
        user: null
    }
    componentDidMount() {
        this.getLocalStorage();
    }
    getLocalStorage = () => {
        const localData = localStorage?.getItem("user");
        if (localData) {
            this.setState({ user: localData })
        }
    }
    render() {
        console.log('my user233', Boolean(this.state.user))
        return (
            this.state.user ? this.props.children : <Redirect to="/login"/>
        )
    }
}

export default PrivateRoute