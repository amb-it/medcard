import express, { Router } from 'express';
import User from '../models/user';

//      ../user
const userRoutes = Router();

userRoutes.post('/register', async (req, res) => {
    try {
        let user = await User.findOne({email: req.body.email});

        if (user) {
            throw new Error('User with such email already exists');
        }

        user = new User(req.body);
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send(error.message)
    }
});

userRoutes.post('/login', async(req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findByCredentials(email, password);
        if (!user) {
            throw new Error('Login failed! Check authentication credentials');
        }

        const token = await user.generateAuthToken();
        res.send({ user, token })
    } catch (error) {
        res.status(400).send(error.message)
    }
});

export default userRoutes;
