import express from 'express';
import session from 'express-session';
import exphbs from 'express-handlebars';
import path from 'path';
import sequelize from './config/connection.js';
import dotenv from 'dotenv/config';
import SequelizeStore from 'connect-session-sequelize';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dir = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

const sess = {
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        secure: false,
    },
};

app.use(session(sess));

import helpers from './utils/helpers.js'
const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dir, 'public')));

import controllers from './controllers/index.js';
app.use(controllers);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
});