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
        console.log("inside update22")
        this.getLocalStorage();
    }
    getLocalStorage = () => {
        const localData = localStorage?.getItem("user");
        console.log('my user22', Boolean(this.state.user))
        if (localData) {
            this.setState({ user: localData })
        }
    }
    render() {
        const localData = localStorage?.getItem("user") || null;
        if(!localData) return <LoginPage/>
        return (
            this.props.children
        )
    }
}

export default PrivateRoute