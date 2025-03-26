import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
{
    email: {
        type: String,
        required: true,
        unique: true

    },
    FullName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    profilePic: {
        type: String,
        default: ""
    },
},

    {timestamps:true}    

);

const User = mongoose.model("User",UserSchema);


export default User;

