import express from 'express';
import { User, Post, Comment } from '../../models/index.js';

const router = express.Router();

router.get('/', (req, res) => {
    User.findAll({
        include: [
            {
                model: Post,
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
            },
        ],
    })
        .then((users) => {
            res.json(users);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.get('/:id', (req, res) => {
    User.findOne({
        where: {
            id: req.params.id,
        },
        include: [
            {
                model: Post,
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
            },
        ],
    })
        .then((user) => {
            if (!user) {
                res.status(404).send('User not found');
            } else {
            res.json(user);
            }
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/', (req, res) => {
    User.create(req.body)
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username,
        },
    })
    .then((dbUserData) => {
        if (!dbUserData) {
          res.status(400).json({ message: 'No user with that username!' });
          return;
        }

        const validPassword = dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
          res.status(400).json({ message: 'Incorrect password!' });
          return;
        }

        req.session.save(() => {
          req.session.user_id = dbUserData.id;
          req.session.username = dbUserData.username;
          req.session.loggedIn = true;

          res.json({ user: dbUserData, message: "You're logged in!" });
        });
      })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end()
            });
    }
    else {
        res.status(404).end();
    }
});

router.put('/:id', (req, res) => {
    User.findOne({
        where: {
            id: req.params.id,
        },
    })
        .then((user) => {
            if (!user) {
                res.status(404).send('User not found');
            } else {
                user.update(req.body)
                    .then((updatedUser) => {
                        res.json(updatedUser);
                    })
                    .catch((err) => {
                        res.send(err);
                    });
            }
        })
        .catch((err) => {
            res.send(err);
        });
});

router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id,
        },
    })
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            res.send(err);
        });
});

export default router;