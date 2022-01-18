import express from 'express';
import sequelize from '../config/connection.js';
import { User, Post, Comment } from '../models/index.js';

const router = express.Router();

router.get('/', (req, res) => {
    Post.findAll({
        include: [{ all: true, nested: true }],
    })
        .then((postData) => {
            const posts = postData.map((post) => post.get({ plain: true }));

            res.render('home', {
                posts,
                loggedIn: req.session.loggedIn,
            });
        })
        .catch((err) => {
            res.send(err);
        });
});

router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id,
        },
        include: [{ all: true, nested: true }],
    })
        .then((postData) => {
            if (!postData) {
                res.status(404).send('Post not found');
            } else {
                const post = postData.get({ plain: true });

                res.render('single-post', {
                    post,
                    loggedIn: req.session.loggedIn,
                });
            }
        })
        .catch((err) => {
            res.send(err);
        });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

export default router;