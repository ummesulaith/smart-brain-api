
const express = require('express'),
 bcrypt = require('bcrypt-nodejs'),
 app = express(),
 cors = require('cors'),
 knex = require('knex'),
 register = require("./controllers/register"),
 signin = require("./controllers/signin"),
 profile = require("./controllers/profile"),
 image = require("./controllers/image");

const db1 = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'test',
      database : 'smartbrain'
    }
  });
 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors())

const db = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'banana',
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id: '987',
            hash: '',
            email: 'john@gmail.com'
        }
    ]
}

app.get('/', (req, res) => {
    res.send(db.users)
})

app.post('/signin', (req, res) => {signin.handleSignin(req,res,db1,bcrypt)})

app.post('/register',(req,res)=>{ register.handleRegister(req,res,db1,bcrypt)})

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req,res,db1)})

app.put('/image', (req, res) => {image.handleImage(req,res,db1)
})

app.post('/imageurl',(req,res)=>{ image.handleApiCall(req,res)})

app.listen(3003, () => {
   
})