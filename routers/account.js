const express = require("express");
const router = express.Router();
const accountModel = require('../models/account');
const PAGE_SIZE = 5;

router.get('/', (req, res, next) => {
    let page = req.query.page;

    if (page) {
        let start = parseInt(page);
        if (start < 1) {
            start = 1;
        }
        accountModel.find({})
            .skip((start - 1) * PAGE_SIZE)
            .limit(PAGE_SIZE)
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json("error");
            })
    } else {
        accountModel.find({})
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json("Error");
            })
    }
})

router.get('/:id', (req, res, next) => {
    let id = req.params.id;
    accountModel.find({
        _id: id
    })
        .then(data => {
            if (data.length == 0) {
                res.json("There is not any account match")
            } else {
                return data;
            }
        })
        .then(data => {
            res.json(data);
        })
})

router.post('/', (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;

    accountModel.find({
        username: username
    })
        .then(data => {
            if (data.length == 0) {
                return accountModel.create({
                    username: username,
                    password: password
                })
            } else {
                res.json("This account is already exist. Please try another!");
            }
        })
        .then(data => {
            res.jsos("Create account successfully!");
        })
        .catch(err => {
            res.json("Can't create account because of server error");
        })
})

router.put('/:id', (req, res, next) => {
    let id = req.params.id;
    let newPassword = req.body.newPassword;

    accountModel.findOne({
        _id: id
    })
        .then(data => {
            if (data.length == 0) {
                res.json("There is not any account match");
            } else {
                return accountModel.findByIdAndUpdate(id, {
                    password: newPassword
                })
            }
        })
        .then(data => {
            res.json("Update password successfully!");
        })
        .catch(err => {
            res.status(500).json("Can't update password. Server error!");
        })
})

router.delete('/:id', (req, res, next) => {
    let id = req.params.id;
    accountModel.deleteOne({
        _id: id
    })
        .then(data => {
            res.json("Delete account successfully!");
        })
        .catch(err => {
            res.status(500).json * ("Can't delete this account. Server error!");
        })
})

module.exports = router;