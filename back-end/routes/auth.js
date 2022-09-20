const express = require('express');
const auth = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fatchUser = require('../middlewere/fatchUser');

const JWT_SECRET = "irshad007";
const { body, validationResult } = require('express-validator');

// rout 1
auth.post('/create',[
    body('name','Enter a valid Name').isLength({ min: 3 }),
    body('email','Enter a valid Email').isEmail(),
    body('password','Password must be atleast 5 characters').isLength({ min: 5 }),
],async(req, res) => {
  //if there are error return bad request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
//check whether the user with this email exist already
try{
let user = await User.findOne({email: req.body.email});
console.log(user);
if(user){
  return res.status(400).json({error: "Sorry a user with this Email alreay exists"});
}
const salt = await bcrypt.genSalt(10);
const secPass = await bcrypt.hash(req.body.password,salt);
    user = await  User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass
    })
    const data = {
      user:{
        id : user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    console.log(authToken);
    res.json({authToken});
    // res.json(user);
   
}catch(error){
  console.error(error.message);
  res.status(500).send("Some Error Occured");
}
},
);

// rout 2
auth.post('/login',[
    body('email','Enter a valid Email').isEmail(),
    body('password','Password must be atleast 5 characters').exists(),
],async(req, res) => {
  //if there are error return bad request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
//check whether the user with this email exist already
const {email,password} = req.body;
try{
let user = await User.findOne({email});
if(!user){
  return res.status(400).json({error: "Please enter right credietial"});
}
const paasCompare = await bcrypt.compare(password,user.password);
if(!paasCompare){
  return res.status(400).json({error: "Please enter right credietial"});
}
    const data = {
      user:{
        id : user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    console.log(authToken);
    res.json({authToken});
    // res.json(user);
   
}catch(error){
  console.error(error.message);
  res.status(500).send("Some Error Occured");
}
},
);
//  rout 3 with loggin required

auth.post('/getUser',fatchUser,async(req, res) => {
//if there are error return bad request
try{
const  userId = req.user.id;
let user = await User.findById(userId).select("-password");
res.send(user);
}catch(error){
console.error(error.message);
res.status(500).send("Some Error Occured");
}
},
);

module.exports = auth;