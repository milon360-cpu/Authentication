const userSchema = require("../Models/Models");
const bcrypt = require('bcrypt');
const saltRounds = 10;


// Register user
exports.registerUser = async(req,res)=>
{
    const user = await userSchema.findOne({email : req.body.email})
    try
    {
        if(!user)
        {
                bcrypt.hash(req.body.password, saltRounds, async(err, hash)=> 
                {
                    if(!err)
                    {
                        const newUser = new userSchema
                        (
                            {
                              username : req.body.username,
                              email : req.body.email,
                              password : hash  
                            }
                        )

                        await newUser.save();
                        res.status(201).send 
                        (
                            {
                                success : true,
                                message : "Create single user",
                                status : 201,
                                data : newUser
                            }
                        )
                    }
                    else 
                    {   
                        res.status(500).send 
                        (
                            {
                                success : false,
                                message : err.message,
                                status : 500
                            }
                        )
                    }
                });
        }
        else 
        {
            res.status(500).send 
            (
                {
                    success : false,
                    message : "user already exist",
                    status : 500,
                    email : req.body.email
                }
            )
        }
    }
    catch(err)
    {
        res.status(500).send 
        (
            {
                success : false,
                message : err.message,
                status : 500,
                data: " "
            }
        )
    }
}

//Login user

exports.loginUser = async(req,res)=>
{
    const user = await userSchema.findOne({email:req.body.email});
    try 
    {
        if(user)
        {
            bcrypt.compare(req.body.password, user.password, (err, result)=> 
            {
                if(result)
                {
                    res.status(200).send 
                    (
                        {
                            success : true,
                            message : "Login successfully",
                            status : 200,
                            data : user
                        }
                    )
                }
                else 
                {
                    res.status(500).send 
                    (
                        {
                            success : false,
                            message : "invalid Password",
                            status : 500
                        }
                    )
                }
            });
        }
        else 
        {
            res.status(500).send 
            (
                {
                    success : false,
                    message : "Invalid email address",
                    status : 500
                }
            )
        }
    }
     catch (error)
    {
        res.status(500).send 
        (
            {
                success : false,
                message : error.message,
                status : 500,
                data : ''
            }
        )
    }
}   