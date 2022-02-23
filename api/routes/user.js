import express, { Router } from 'express';
import User from '../models/user';
import auth from '../middleware/auth';
import {ShareData} from "../models/shareData";

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
        user.profile = {"name": req.body.name}

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

userRoutes.get('/profile', auth, async (req, res) => {
        let user = await User.findById(req.user._id);

        res.send(user)
});

userRoutes.post('/profile/save', auth, async (req, res) => {
    try {
        let user = await User.findById(req.user._id);

        user.profile = req.body;

        await user.save()
            .then(data => {res.send(data);})
            .catch(err => {res.status(500).send({message: err.message || "Some error occurred while editing profile."});})
    } catch (err) {
        res.status(400).send(err.message)
    }
});

userRoutes.post('/share', auth, async (req, res) => {
    try {
        let user = req.user;
        // let user = await User.findById(req.user._id);

        let shareData = new ShareData;

        // user.profile = req.body;
        shareData._id = user.shareData.length + 1;
        shareData.token = Math.floor(Math.random() * 1000000).toString();

        if (!user.shareData) {
            user.shareData = [];
            user.shareData.push(shareData);
        } else {
            user.shareData.push(shareData);
        }

        await user.save()
            .then(data => {res.send(shareData);})
            .catch(err => {res.status(500).send({message: err.message || "Some error occurred while editing profile."});})
    } catch (err) {
        res.status(400).send(err.message)
    }
});

export default userRoutes;
