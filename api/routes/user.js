import express, { Router } from 'express';
import User from '../models/user';

//      ../user
const userRoutes = Router();

userRoutes.post('/register', async (req, res) => {
    try {
        await User.findOne({email: req.body.email})
            .then((user) => {
                if (user !== null) {
                    throw new Error('User with such email already exists')
                }
            });

        let user = new User(req.body);

        await user.save()
            .catch((e) => {throw e});

        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (err) {
        res.status(400).send(err.message)
    }
});

userRoutes.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findByCredentials(email, password)
            .catch((e) => {throw new Error('Login failed! Check authentication credentials');});

        const token = await user.generateAuthToken();

        res.send({ user, token })
    } catch (err) {
        res.status(400).send(err.message)
    }
});

export default userRoutes;
