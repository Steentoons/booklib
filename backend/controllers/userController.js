const User = require('../models/userModel')

/* 
    method POST
    Adding a new user
*/
const addUser = async(req, res) => {
    // Validation...
    const { email, password, name } = req.body
    if (!email) {
        return res.status(400).json({ error: 'The email field is required' })
    } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
        return res.status(400).json({ error: 'The email is invalid' })
    } else if (!password) {
        return res.status(400).json({ error: 'The password field is required' })
    } else if (!/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/.test(password)) {
        return res.status(400).json({ error: 'Minimum eight characters, at least one capital letter and one number' })
    } else if (!name) {
        return res.status(400).json({ error: 'The name field is required' })
    }

    // Checking email duplicates...
    const isEmailExist = await User.exists({ email: email })
    if (isEmailExist) {
        return res.status(400).json({ error: 'The email already exists' })
    }

    // Adding user to database...
    const user = new User()
    user.name = name
    user.password = password
    user.email = email

    try {
        user.save()
        return res.status(201).json({ message: 'The user was created successifully' })
    } catch (err) {
        return res.status(503).json({ error: err })
    }
}

/*
    method GET
    getting all users
*/

const getUsers = async(req, res) => {
    // Getting all the users from the database...
    try {
        const users = await User.find()
        res.status(200).json({ users: users })
    } catch (err) {
        return res.status(503).json({ error: 'There was an error when getting the users' })
    }
}

module.exports = {
    addUser,
    getUsers
}