const asyncHandler = require ('express-async-handler');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');


const registerUser = asyncHandler(async (req,res) => {
    const { name , email , phoneNumber , password , confirmPassword} = req.body;

    const userExists = await User.findOne({email});

    if(userExists){
        res.status(400)
        throw new Error ('Email Already Reagistered')
    }

    if(!name || !email || !password || !phoneNumber || !confirmPassword){
        res.status(400)
        throw new Error('Please Provide all values!')
    }

    if(phoneNumber.length != 10){
        res.status(400)
        throw new Error('Please Enter Valid Mobile Number!')
    }

    if(password.length <= 6 && confirmPassword.length <= 6){
        res.status(400)
        throw new Error('Password must be more than 6 character.')
    }
    
    if(password === confirmPassword){
        const user = new User({
            name , email , phoneNumber , password , confirmPassword
        })
    
        try {
            const savedUser = await user.save()
            res.status(201).json({
                _id : user._id,
                name : user.name,
                email : user.email,
                token: generateToken(user._id)
            })
        } catch (error) {
            res.status(400).json(error)
        }
    }else{
        res.status(400);
        throw new Error('Password not Matched')
    }

})



const loginUser = asyncHandler(async (req,res) => {
    const {  email ,  password } = req.body;

    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password))){
        res.status(200).json({
            _id : user._id,
            name : user.name,
            email : user.email,
            token: generateToken(user._id)
        });
    }else{
        res.status(400);
        throw new Error('Invalid Email or Password')
    }



})

module.exports = {registerUser , loginUser};