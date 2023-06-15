const mongoose = require("mongoose");

const userSchema = mongoose.Schema
(
    {
        username :
        {
            type : String,
            required : [true, "username is required"],
            trim : true,
            unique : true
        },
        email :
        {
            type : String,
            required : [true, "Email is required"],
            trim : true,
            unique : true,
            validate :
            {
                validator :(v)=>
                {
                    const validEmailExpression = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; 
                    return validEmailExpression.test(v);
                },
                message : (props)=> `${props.message} is not a valid email address`
            }
        },
        password :
        {
            type : String,
            required : [true,"Password is required"],
            trim: true
        },
        createdPOn :
        {
            type : Date,
            default : Date.now
        }

    }
)

module.exports = mongoose.model("userSchema",userSchema);