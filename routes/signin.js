require('dotenv').config()
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db/config');
const jwt = require("jsonwebtoken");

router.post('/signin', (req, res) => {
    const {email, password} = req.body;

        db.select('email', 'password','verified').from('Users')
            .where('email', '=', email)
            .then(async (data) => {
                if(data[0].verified) {
                    const isValid = await bcrypt.compareSync(password, data[0].password);
                    if (isValid) {
                        return db.select('id').from('Users')
                            .where('email', '=', email)
                            .then(user => {
                                // console.log(user[0])
                                const userobject = {id: user[0].id};
                                console.log(process.env.ACCESS_TOKEN_SECRET);
                                const accessToken = jwt.sign(userobject, process.env.ACCESS_TOKEN_SECRET);
                                console.log(accessToken);
                                res.json({accessToken: accessToken})
                                // res.json(user[0])
                            })
                            .catch(err => res.status(400).json('unable to get user'))
                    } else {
                        res.status(400).json('wrong credentials')
                    }
                }
                else{
                    res.status(400).json("This account isn't verified yet, please click the resend ID button");
                }
            })
            .catch(err => res.status(400).json('wrong credentials'))



});


module.exports = router;