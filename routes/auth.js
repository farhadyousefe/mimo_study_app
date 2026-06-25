import express from 'express';
import {user, validateUser} from "../models/user.js"
import debug from 'debug';
import bcrypt from 'bcrypt';


//2. Initialize debuggers (namespaced for modular logging)
const dbDebug = debug('app:db');
const appDebug = debug('app:startup');
const httpDebug = debug('app:http'); // lowercase helps
// select debug color manually
dbDebug.color = 2;
appDebug.color = 3;
httpDebug.color = 5;

//3. Create router instance
const router = express.Router();

router.post('/', async (req, res) => {
    httpDebug("add/register request is recieved")
    const {error, value} = validateUser(req.body);
    if(error) {
        httpDebug("error in uploaded data", error.message)
        return res.status(400).send(`Bad Request: ${error.message}`)
    }
    let registeredUser = await user.findOne({email: req.body.email})
    if(registeredUser){
        dbDebug("user is registered!")
        return res.status(400).send("User is registered")
    }
    const salt = await bcrypt.genSalt(10);
    value.password = await bcrypt.hash(value.password, salt)
    let newUser = new user(value)
    try {
        newUser = await newUser.save();
        dbDebug('New user is saved');

        const addedUser = newUser.toObject();
        delete addedUser.password;

        httpDebug("New user is registered")
        return res.status(201).send(addedUser)

    } catch (err) {
        dbDebug('erro in registring new user', err.message)
        return res.status(500).send("Internal Server Error")
    }
});
