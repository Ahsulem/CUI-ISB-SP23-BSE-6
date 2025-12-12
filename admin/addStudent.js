const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User.js');



const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MIN_PASSWORD_LENGTH = 8;

const addStudent = async (req, res) => {
    try {
        if (!req.user || req.user.role?.toLowerCase() !== 'admin') {
            return res.status(403).json({ error: 'Forbidden: admin access required.' });
        }

        let {name, email, password} = req.body;
        name = name.trim()
        email = email.trim()
        email = email.toLowerCase()
        password = password.trim()

        if (!name || !email || !password ) {
            return res.status(400).json({ error: 'Name, email, and password are required.' });
        }


        if (!EMAIL_REGEX.test(email)) {
            return res.status(400).json({ error: 'Invalid email format.' });
        }

        if (password.length < MIN_PASSWORD_LENGTH) {
            return res.status(400).json({ error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters long.` });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newStudent = new User({
            name,
            email,
            password: hashedPassword,
            role: 'student',
            assignedClasses: [],
            createdAt: new Date(),
        });

        const createdUser = await newStudent.save();

        const responseUser = {
            _id: createdUser._id,
            name: createdUser.name,
            email: createdUser.email,
            role: createdUser.role,
            assignedClasses: createdUser.assignedClasses
        };

        return res.status(201).json({
            message: 'Student added successfully.',
            student: responseUser
        });

    } catch (error) {
        console.error('Error adding student:', error.message);
        return res.status(500).json({ error: 'Error Creating new Student' });
    }
}

module.exports = addStudent;