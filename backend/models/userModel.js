const mongoose = require('mongoose');
const bcrypt=require("bcrypt");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        index: true,
        unique: true,
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    password: { type: String, required: true },
    repassword: {type:String ,required: true  },
    isAdmin: { type: Boolean, required: true, default: false },

});


userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
         console.log(`${this.password}`);
         this.password = await bcrypt.hash(this.password, 10);
         console.log(`${this.repassword}`);
         this.repassword = await bcrypt.hash(this.repassword, 10);
    }
    next();
});


const User = new mongoose.model("newuser1", userSchema);
export default User;