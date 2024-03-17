const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();


async function registerUser(req, res) {

    const { name, email, password } = req.body;

    console.log(name, email, password);

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    if (!password) {
        return res.status(400).json({ message: "Password is required" });
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (user) {
            return res.status(400).json({ message: "User already exists" });
        };

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword
            }
        });

        return res.status(201).json({
            message: "User created successfully",
            user: {
                id: newUser.id,
                email: newUser.email
            }
        });

    } catch (error) {
        return res.status(400).json({ message: "An error occurred" });
    }
};

async function loginUser(req, res) {
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    if (!password) {
        return res.status(400).json({ message: "Password is required" });
    }

    try {

        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({
            message: "User logged in successfully",
            token: token
        });

    } catch (error) {
        return res.status(400).json({ message: "Invalid Email or Password" });
    }

};

async function forgotPassword(req, res) { };

async function resetPassword(req, res) {
    const { new_password, confirm_password } = req.body;

    if (!new_password) {
        return res.status(400).json({ message: "New Password is required" });
    }

    if (new_password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    if (!confirm_password) {
        return res.status(400).json({ message: "Confirm Password is required" });
    }

    if (new_password !== confirm_password) {
        return res.status(400).json({ message: "Passwords do not match" });
    }

    try {
        const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);
        const hashedPassword = await bcrypt.hash(new_password, 10);
        const updatedUser = await prisma.user.update({
            where: {
                id: decoded.id
            },
            data: {
                password: hashedPassword
            }
        });

        return res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        return res.status(400).json({ message: "Invalid or Expired Token" });
    }
};

async function logout(req, res) {
    return res.status(200).json({ message: "User logged out successfully" });
};

module.exports = {
    registerUser,
    loginUser,
    forgotPassword,
    resetPassword,
    logout
};