const mongoose = require('mongoose');
<<<<<<< HEAD
=======
const bcrypt = require('bcrypt');
>>>>>>> authentication working
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name: String,
    last_name: String,
<<<<<<< HEAD
    email_address: {
        type: String,
        // match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, `Please fill valid email address`],
        validate: (email) => email.length > 6
    },
    hubs: [{
        type: Schema.Types.ObjectId,
        ref: "HueHub"
=======
    email: {
        type: String,
        minLength: 10,
        match: [/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/, `Please fill valid email address`],
        required: true,
        unique: true,
        validate: async input => {
            try{
                const result = await UserModel.findOne({ email: input})
                if(result) throw new Error("email address already in use")
            } catch (error) {
                throw new Error(error)
            }
        }

    },
    password: {
            type: String,
            match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/, 'Please enter a valid password'],
            minLength: 8,
            required: true
    },
    hubs: [{
        type: Schema.Types.ObjectId,
        ref: "Hub"
>>>>>>> authentication working
    }],
}, {
    timestamps: true
});

<<<<<<< HEAD
=======
UserSchema.methods = {
    checkPassword: function(input) {
        console.log(input, this.password)
        return bcrypt.compareSync(input, this.password)
    },
    hashPassword: function(plainTextPassword){
        return bcrypt.hashSync(plainTextPassword, 10)
    } 
}

UserSchema.pre('save', function(next) {  
    if (!this.password) {    
        console.log('models/user.js =======NO PASSWORD PROVIDED=======')    
        next()  
    } else {    
        console.log('models/user.js hashPassword in pre save');    
        this.password = this.hashPassword(this.password)    
        next()  
    }
})

>>>>>>> authentication working
const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;