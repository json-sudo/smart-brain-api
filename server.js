const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');
const profile = require('./controllers/profile');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const db = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'postgres',
        password : 'test',
        database : 'smart-brain'
    }
});

app.get('/', (req, res) => res.send(db.users))
app.post('/register', (req, res) => register.handleRegister(req, res, bcrypt, db));
app.post('/signin', (req, res) => signin.handleSignin(req, res, bcrypt, db));
app.put('/image', (req, res) => image.handleImage(req, res, db));
app.post('/imageURL', (req, res) => image.handleAPICall(req, res));
app.get('/profile/:id', (req, res) => profile.handleProfileRequest(req, res, db));

app.listen(3000, () => console.log('Example app listening on port 3000!'))