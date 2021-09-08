const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db/config');
const { v4: uuidv4 } = require('uuid');
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email',
        pass: 'your-password'
    },
    tls: {
        rejectUnauthorized: false
    }

});
var uuid ;
var options = {};
var info = {
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    confirmPassword:"",
    phoneNumber:""
};
router.post('/signUp', async (req, res) => {
     info = req.body;
    if(info.password == info.confirmPassword) {

        const hash = await bcrypt.hashSync(info.password, 10);

        db.insert({
            firstName: info.firstName, lastName: info.lastName,
            email: info.email, phoneNumber: info.phoneNumber, password: hash
        })
            .into('Users')
            .then(() => {

                uuid = uuidv4();
                options = {
                    from: "your-email",
                    to: info.email,
                    subject: "Bosta verification Code",
                    text: `Dear user Please verify your email by entering this ID :  ${uuid}`
                };
                console.log(options);
                return transporter.sendMail(options, function(error, info){
                    if (error) {
                        console.log("error is "+error);

                    }
                    else {
                        console.log('Email sent: ' + info.response);

                    }
                });
            }).then(()=>{
                console.log('there');
                res.status(200).json('Success')
        })
            .catch(err => res.status(400).json('unable to register'))
    }
    else{
        res.json("Password doesn't match");
    }
});
router.post('/VerifyEmail', (req, res) => {

var id = req.body.id;
 if(id == uuid) {
     db("Users")
         .update({verified: 1})
         .where({email: info.email}).then(rows => {
         // the argument here as you stated
         // describes the number of rows updated
         // therefore if no row found no row will be updated
         if (!rows){
             return res.status(404).json({success:false});
         }
         return res.json({success:true});
     })
         .catch( e => res.status(500).json(e));


 }
 else{
     res.json('The id is wrong,please click on the re-send id button');

 }

});
router.get('/resendID', (req, res) => {

    uuid = uuidv4();

    console.log(options);
    return transporter.sendMail(options, function(error, info){
        if (error) {
            console.log("error is "+error);

        }
        else {
            console.log('Email sent: ' + info.response);

        }
    }).then(()=>{
        console.log('there');
        res.status(200).json('Success')
    }).catch(err => res.status(400).json('unable to register'));
});
module.exports = router;