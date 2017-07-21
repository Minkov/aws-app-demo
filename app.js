const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();

const port = 80;
const connectionString = "mongodb://192.168.168.44:27017/items-db-aws";

app.set('view engine', 'pug');

let db = null;

MongoClient.connect(connectionString)
    .then((_db) => {
        db = _db;

        return db.collection('items')
            .insertMany([
                { name: 'Cuki' },
                { name: 'Stevie' },
            ]);
    })
    .then(() => {
        app.get('/', (req, res) => {
            db.collection('items')
                .find()
                .toArray()
                .then((items) => {
                    return res.render('home', {
                        context: items,
                    });
                });
        });
    })
    .then(() => {
        app.listen(port, () => console.log(`Running at ${port}`));
    });