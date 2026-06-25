import mongoose from "mongoose";
import Joi from 'joi';


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    experiencePoints: {
        type: Number,
        default: 0
    },
    streak: {
        currentCount: {
            type: Number,
            default: 0
        },
        lastActiveSession: {
            type: Date,
            default: null
        }
    },
    completedLessons: {
        type: [String],
        default: []
}
})

const user = mongoose.model('User', userSchema)

function validateUser(user) {
    const schema = Joi.object({
        username: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(user)
}


export { user, validateUser }
