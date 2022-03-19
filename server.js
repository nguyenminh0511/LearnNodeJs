const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser')
require('dotenv').config();
const PORT = process.env.PORT;

const accountRouter = require("./routers/account");
const AccountModel = require("./models/account");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.json("Hello world!");
})

const checkLogin = (req, res, next) => {
    try {
        let check = jwt.verify(req.cookies.token, "pass");
        if (check) {
            req.userId = check._id;
            next();
        }
    } catch(err) {
        console.log(err);
        res.redirect('/login');
    }
}

const checkAdmin = (req, res, next) => {
    let _id = req.userId;
    AccountModel.find({
        _id : _id
    })
    .then(data => {
        if (data.length > 0) {
            if (data[0].role == 'admin' || data[0].role == 'manager') {
                next();
            } else {
                res.json("NOT PERMITTION");
            }
        } else {
            console.log(data);
            res.status(500).json("Error");
        }
    })
}

app.get('/home', checkLogin, checkAdmin, (req, res, next) => {
    res.sendFile(path.join(__dirname, './views/index.html'));
})

app.get('/login', (req, res, next) => {
    res.sendFile(path.join(__dirname, './views/login.html'));
})

app.post('/login', (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;

    AccountModel.findOne({
        username: username,
        password: password
    })
    .then(data => {
        if (data) {
            let token = jwt.sign({
                _id: data._id
            }, "pass");
            res.json({
                message: 'success',
                token: token
            });
        } else {
            return res.redirect('/login');
        }
        
    })
    .catch(err => {
        res.status(500).json("error");
    })
})

app.use('/api/account/', accountRouter);

app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
})