import React, { Component, useContext } from 'react'
import './login.css'
import firebase from '../firebase';
import { Redirect } from 'react-router'
import HeaderLogin from '../Header/HeaderLogin'
import { Card, CardText, CardBody, CardLink, CardTitle, CardSubtitle, Button, Input, Label } from 'reactstrap';

export const options = {
  responsive: true,
  // plugins: {
  //   legend: {
  //     position: 'top',
  //   },
  //   title: {
  //     display: true,
  //     text: 'Chart.js Line Chart',
  //   },
  // },
};

class LoginPage extends Component {
  state = {
    no: '',
    otp: '',
    showOtp: false,
    verify: false
  }

  // Chart.register(ArcElement, Tooltip, Legend);

  configureCaptcha = () => {
    // if(!window.recaptchaVerifier) return;
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.

        this.onSignInSubmit();
        console.log('recaptcha verified')
      },
      defaultCountry: 'IN'
    });

  }

  onSignInSubmit = (e) => {
    e.preventDefault();
    this.configureCaptcha()
    this.setState({ showOtp: true })
    let phNo = this.state.no;

    const phoneNumber = '+91' + phNo;
    console.log(phoneNumber)

    const appVerifier = window.recaptchaVerifier;
    console.log('senet', appVerifier)

    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        console.log("otp sent!!!", confirmationResult);
        // ...
      }).catch((error) => {
        // Error; SMS not sent
        console.log(error)
      });
  }

  onSubmitOtp = (e) => {
    const code = this.state.otp;
    if (!code || !window.confirmationResult) return
    window.confirmationResult.confirm(code).then((result) => {
      // User signed in successfully.
      const user = result.user;
      console.log('MyUser', JSON.stringify(user));

      localStorage.setItem("user", JSON.stringify(user))
      this.setState({ verify: true })
      // window.location.href = '/home'
      // navi
      // ...
    }).catch((error) => {
      alert("Login failed.Please try again.")
      console.log(error)
    });

  }
  render() {
    console.log("inside verify22", this.state.verify)
    return (
      <div style={{ backgroundImage: 'url(https://assets.nflxext.com/ffe/siteui/vlv3/df6621a3-890c-4ca0-b698-90bd5152f3d1/20a59be7-7062-4991-bca0-805e9a7f2716/IN-en-20240107-trifectadaily-perspective_alpha_website_small.jpg)', backgroundRepeat: "no-repeat", height: '100vh' }}>
        <HeaderLogin currMovie={this.setMovie}></HeaderLogin>
        <Card body inverse className={'loginDiv'} style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', padding: '3%', position: 'absolute', top: 'auto', left: '35%', right: '50%', height: '40vh' }}>
          <CardTitle tag="h5" style={{ marginBottom: '10%' }}>
            Login/Signup
          </CardTitle>
          {/* <Line options={options} data={data} />; */}
          <CardText>
            {!this.state.showOtp && <div className="row">
              <div className="col-md-3" style={{ paddingTop: '2%' }}>
                <Label>Phone</Label>
              </div>
              <div className="col-md-9" >
                <Input type="number" placeholder={'Enter Your Number.'} className={'loginInput'} name="token" onChange={(e) => { this.setState({ no: e.target.value }) }} />
              </div>
            </div>}
            {!this.state.showOtp && <Button onClick={this.onSignInSubmit} style={{ marginTop: '10%', backgroundColor: "rgb(255,0,0)", border: 'none' }}>Get OTP</Button>}
          </CardText>
          {this.state.showOtp && <div>
            <Input type="number" placeholder={'Enter Your Otp.'} className={'loginInput'} name="otp"
              onChange={(e) => { this.setState({ otp: e.target.value }) }} />
            <Button onClick={this.onSubmitOtp} style={{ marginTop: '20px', backgroundColor: "rgb(255,0,0)" }}>Submit Otp</Button>
          </div>}
          {this.state.verify ? <Redirect to='/' /> : <Redirect to='/login' />}
          <div id="recaptcha-container"></div>
        </Card>
        <div style={{ background: 'linear-gradient(rgb(0,0,0, 0.8) 10%,rgb(255,255,255, 0),rgb(0,0,0, 0.8))', height: '100vh' }}></div>
      </div>
    )

  }



}


export default LoginPage