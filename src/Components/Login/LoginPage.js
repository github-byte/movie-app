import React, { Component,useContext } from 'react'
import './login.css'
import firebase from '../firebase';
import { Redirect } from 'react-router'
import HeaderLogin from '../Header/HeaderLogin'
import {Card, CardText, CardBody, CardLink, CardTitle, CardSubtitle, Button, Input, Label} from 'reactstrap';
// import { Line } from 'react-chartjs-2';
// import faker from 'faker';

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

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: [],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

class LoginPage extends Component {
  state={
    no:'',
    otp:'',
    showOtp: false,
    verify:false
  }
  
  // Chart.register(ArcElement, Tooltip, Legend);

  configureCaptcha = () =>{
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
     
        this.onSignInSubmit();
        console.log('recaptcha verified')
      },
      defaultCountry:'IN'
    });

  }

  onSignInSubmit = (e) => {
    e.preventDefault();
    this.configureCaptcha()
    let phNo = this.state.no;
    
    const phoneNumber = '+91'+phNo;
    console.log(phoneNumber)

    const appVerifier = window.recaptchaVerifier;
    console.log('senet',appVerifier)
    
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      console.log("otp sent!!!",confirmationResult);
      // ...
    }).catch((error) => {
      // Error; SMS not sent
      console.log(error)
    });
  }

  onSubmitOtp = (e) => {
    const code = this.state.otp;
    if(!code) return
    window.confirmationResult.confirm(code).then((result) => {
      // User signed in successfully.
      const user = result.user;
      console.log('MyUser',JSON.stringify(user));
      this.setState({verify: true})
      // ...
    }).catch((error) => {
      alert("Login failed.Please try again.")
      console.log(error)
    });

  }

  render(){
    return (
    <>
    <HeaderLogin currMovie={this.setMovie}></HeaderLogin>
    <Card body inverse className={'loginDiv'} style={{  backgroundColor: '#333'}}>
    <CardTitle tag="h5">
    Login
    </CardTitle>
    {/* <Line options={options} data={data} />; */}
    <CardText> 
    <div className="row">
    <div className="col-md-3" style={{paddingTop:'2%'}}>
    <Label>Phone</Label>
    </div>
    <div className="col-md-9" >
    <Input type="number" placeholder= {'Enter Your Number.'} className={'loginInput'} name="token"
    onChange={(e)=> {this.setState({no:e.target.value})}}/>
    </div>
    </div>
    <Button onClick={this.onSignInSubmit} style={{marginTop:'20px'}}>Get Otp</Button>
    </CardText>
    <div>
    <Input type="number" placeholder= {'Enter Your Otp.'} className={'loginInput'} name="otp"
    onChange={(e)=>{this.setState({otp:e.target.value})}}/>
    <Button onClick={this.onSubmitOtp} style={{ marginTop: '20px'}}>Submit Otp</Button>
    </div>
    {this.state.verify ? <Redirect to='/home' /> : <Redirect to='/' />}
    <div id="recaptcha-container"></div>
    </Card>
    </>
    )

    }



}

 
export default LoginPage