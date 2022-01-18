import express from 'express';
import { Post, User, Comment } from '../../models/index.js';
import withAuth from '../../utils/auth.js';

const router = express.Router();

router.get('/', (req, res) => {
    Post.findAll({
        include: [
            {
                model: Comment,
                include: [
                    {
                        model: User,
                        as: 'commentAuthor',
                    },
                ],
            },
        ],
    })
        .then((posts) => {
            res.json(posts);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id,
        },
        include: [
            {
                model: Comment,
                include: [
                    {
                        model: User,
                        as: 'commentAuthor',
                    },
                ],
            },
        ],
    })
        .then((post) => {
            if (!post) {
                res.status(404).send('Post not found');
            } else {
                res.json(post);
            }
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/', withAuth, (req, res) => {
    Post.create({
        title: req.body.title,
        body: req.body.body,
        userId: req.session.user_id,
    })
        .then((post) => {
            res.json(post);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.put('/:id', withAuth, (req, res) => {
    Post.update(req.body, {
        where: {
            id: req.params.id,
        },
    })
        .then((post) => {
            res.json(post);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id,
        },
    })
        .then((post) => {
            res.json(post);
        })
        .catch((err) => {
            res.send(err);
        });
});

export default router;