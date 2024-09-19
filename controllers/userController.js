const asyncHandler = require("express-async-handler");
const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


//@desc register user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler( async(req, res ) => {

    const { username, email, password } = req.body;
    const users = await User.find();
    if(!username || !email || !password ){
        res.status(400);
        throw new Error("All Fields Are Required");
    }

    const userExist = await User.findOne({email});
    if(userExist){
        res.status(400);
        throw new Error("Users is already registered");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
        username, email, password: hashedPassword
    });
    res.status(201).json({ _id: newUser.id, email: newUser.email });
});

//@desc login user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler( async(req, res ) => {

    const { email, password } = req.body;

    if( !email || !password ){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const user = await User.findOne({ email });
    // compare with hash 
    if(user && (await bcrypt.compare(password, user.password))){

        const accessToken = jwt.sign({
            user : {
                username : user.username,
                email: user.email,
                id : user.id,
            },
        }, process.env.ACCESS_TOKEN_SECRETE, { expiresIn : "1d" });

        res.status(200).json(accessToken);
    }
    else{
        res.status(401);
        throw new Error("email or password is not valid")
    }
});

//@desc Get currentUser info.
//@route GET /api/users/current
//@access private
const currentUser = asyncHandler( async(req, res ) => {

    const user = await User.findById(req.user.id);
    if(!user){
        res.status(400);
        throw new Error("User Not Found");
    }
    res.status(200).json({
        username : user.username,
        email: user.email,
        id : user.id,
    });
});

//@desc Get all users
//@route GET /api/users
//@access public
const getUsers = asyncHandler( async(req, res ) => {

    const users = await User.find();
    if(!users){
        res.status(400);
        throw new Error("Users Not Found");
    }
    res.status(200).json(users);
});

//@desc Get single user
//@route GET /api/users/:id
//@access public
const getUser = asyncHandler( async(req, res ) => {

    const user = await User.findById(req.params.id);
    if(!user){
        res.status(400);
        throw new Error("Users Not Found");
    }
    res.status(200).json(user);
});

//@desc update user
//@route GET /api/users/:id
//@access public
const editUser = asyncHandler( async(req, res ) => {

    const userExist = await User.findById(req.params.id);
    if(!userExist){
        res.status(400);
        throw new Error("Users Not Found");
    }
    const updatedUser = await User.findByIdAndUpdate(
        req.params.id, req.body
    );
    res.status(201).json(updatedUser);
});

//@desc Delete user
//@route GET /api/users/:id
//@access public
const deleteUser = asyncHandler( async(req, res ) => {

    const userExist = await User.findById(req.params.id);
    if(!userExist){
        res.status(400);
        throw new Error("Users Not Found");
    }
    const deletedUser = await User.findByIdAndDelete(
        req.params.id, req.body
    );
    res.status(200).json(deletedUser);
});


module.exports = { getUser, getUsers, registerUser, editUser, deleteUser, loginUser, currentUser }