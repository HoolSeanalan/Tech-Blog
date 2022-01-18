import express from 'express';
import Comment from '../../models/Comment.js';
import withAuth from '../../utils/auth.js';

const router = express.Router();

router.get('/', (req, res) => {
    Comment.findAll()
        .then((comments) => {
            res.json(comments);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/', withAuth, (req, res) => {
    Comment.create({
        comment: req.body.comment,
        userId: req.user.id,
        postId: req.body.postId,
    })
        .then((comment) => {
            res.json(comment);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id,
        },
    })
        .then((comment) => {
            res.json(comment);
        })
        .catch((err) => {
            res.send(err);
        });
});

export default router;