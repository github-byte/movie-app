const router = require('express').Router();
let Login = require('../login.model');
const express =require('express');
const crypto = require('crypto')


require('dotenv').config();


const accountSid =process.env.ACCOUNT_SID
const authToken =process.env.AUTH_TOKEN
const client=require('twilio')(accountSid, authToken);
const smsKey = process.env.SMS_SECRET_KEY

const app= express();
app.use(express.json());


router.route('/add').post((req, res) => {
  console.log("Hello")
  const phoneNo=req.body.login;

  console.log('loginMy',phoneNo);
  const otp = Math.floor(100000 + Math.random()*900000)
  const ttl = 2*60*1000;
  const expires = Date.now() + ttl;
  const data =`${phoneNo}.${otp}.${expires}`
  const hash = crypto.createHmac('sha256',smsKey).update(data).digest('hex')
  const fullHash = `${hash}.${expires}`

  client.messages.create({
    body: `Your one Time Login Password for watchReels is ${otp}`,
    from: +13344633753,
    to: phoneNo
  }).then((messages) =>console.log(messages)).catch(err => console.log(err))

  res.status(200).send({phoneNo, hash:fullHash})


  // const user = new Login({
  //   phoneNo
  // });

  // user.save()
  // .then(() => res.json('User added'))
  // .catch(err => res.status(400).json('Error: ' + err));



});





module.exports=router