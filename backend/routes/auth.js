const express = require('express');
const User = require('../models/User')
const router = express.Router();

const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');


JWT_SECRET = "Nishuisagoodgir!"


//Route:1 create a user , No Login Required
router.post('/createuser', [
    body('email', 'Email not valid').isEmail(),
    body('password', 'Enter password').isLength({ min: 6 }),
    body('name', 'Enter your name').isLength({ min: 4 }),
],
    async (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }

    //Check the user with email is exists.
    try {
    let user = await User.findOne({email: req.body.email});
    if (user){
        return res.status(400).json({error: "Sorry user already exist"})
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    user = User.create({ 
        name : req.body.name,
        password : secPass,
        email : req.body.email,
    });
    
    // .then(user => res.json(user)).catch(err =>{console.log(err)
    //     res.json({error : "Please enter unique value", message: err.message})})

    const data = {
        user :{
            id: user.id
        }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    res.json({authtoken})

    //res.json(user)

}   catch(error){
    console.error(error.message);
    res.status(500).send("Internal Server Error");
}
})


//Route : 2 Login a user , Authentication
router.post('/login', [
    body('email', 'Email not valid').isEmail(),
    body('password', 'Password cant be blank').exists(),
],
    async (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if (!user){
            return res.status(400).json({error: "Please try to login with correct details"})
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare){
            return res.status(400).json({error: "Please try to login with correct details"})

        }

        const data = {
            user :{
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({authtoken})
    
    }   catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    })

// Route:3 , Get LoggedIn User detail, /api/auth/getuser, login requires
router.post('/getuser', fetchuser , async (req, res)=>{
        try {
            userId = req.user.id;
            const user = await User.findById(userId).select("-password")
            res.send(user)
            
        }
        catch(error){
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
})


module.exports = router
