import express from 'express';
import { User, Post, Comment } from '../models/index.js';
import withAuth from '../utils/auth.js';

const router = express.Router();

router.get('/', withAuth, (req, res) => {
    Post.findAll({
        where: {
            userId: req.session.user_id,
        },
        include: [{ all: true, nested: true }],
        })
        .then((postData) => {
            const posts = postData.map((post) => post.get({ plain: true }));

            res.render('dashboard', {
                posts,
                loggedIn: true,
            });
        })
        .catch((err) => {
            res.send(err);
        });
});

router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id,
        },
        include: [{ all: true, nested: true }],
    })
        .then((post) => {
            if (!post) {
                res.status(404).send('Post not found');
            } else {
                res.render('edit', {
                    post,
                    loggedIn: true,
                });
            }
        })
        .catch((err) => {
            res.send(err);
        });
});

export default router;