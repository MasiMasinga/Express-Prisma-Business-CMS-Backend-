const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

async function updateName(req, res) {
    const { name } = req.body;
    const { id } = req.user;

    if (!name) {
        return res.status(400).json({ message: "Name is required" });
    }

    try {
        const user = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                name: name
            }
        });

        return res.status(200).json({
            message: "Name updated successfully",
            user: {
                id: user.id,
                name: user.name
            }
        });

    } catch (error) {
        return res.status(400).json({ message: "An error occurred" });
    }
};

async function updateEmail(req, res) {
    const { email } = req.body;
    const { id } = req.user;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    try {
        const user = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                email: email
            }
        });

        return res.status(200).json({
            message: "Email updated successfully",
            user: {
                id: user.id,
                email: user.email
            }
        });

    } catch (error) {
        return res.status(400).json({ message: "An error occurred" });
    }
};

async function updatePassword(req, res) {
    const { password } = req.body;
    const { id } = req.user;

    if (!password) {
        return res.status(400).json({ message: "Password is required" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                password: hashedPassword
            }
        });

        return res.status(200).json({
            message: "Password updated successfully",
            user: {
                id: user.id,
                email: user.email
            }
        });

    } catch (error) {
        return res.status(400).json({ message: "An error occurred" });
    }
};

async function deleteUser(req, res) {
    const { id } = req.user;

    try {
        await prisma.user.delete({
            where: {
                id: id
            }
        });

        return res.status(200).json({ message: "User deleted successfully" });

    } catch (error) {
        return res.status(400).json({ message: "An error occurred" });
    }
};

module.exports = {
    updateName,
    updateEmail,
    updatePassword,
    deleteUser
}