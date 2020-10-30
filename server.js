const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const port = 3000;

const budgetModel = require('./models/pb_schema');

let url = 'mongodb://localhost:27017/personal_budget';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', express.static('public'));

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

app.get('/budget', (req, res) => {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => {
            budgetModel.find({})
                .then((data) => {
                    console.log(data);
                    res.json(data);
                    mongoose.connection.close()
                })
                .catch((connectionError) => {
                    console.log(connectionError);
                });
        })
        .catch((connectionError) => {
            console.log(connectionError);
        });
});

app.post('/addbudget', (req, res) => {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => {
            var newBudget = {
                title: req.body.title,
                value: req.body.value,
                color: req.body.color
            };
            budgetModel.insertMany(newBudget)
                .then((data) => {
                    res.json(data);
                    mongoose.connection.close()
                })
                .catch((connectionError) => {
                    console.log(connectionError);
                });
            })
            .catch((connectionError) => {
                console.log(connectionError);
            });
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});