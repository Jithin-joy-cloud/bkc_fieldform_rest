const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
mongoose.connect('mongodb+srv://test:'+process.env.testPassword+'@testcluster.bjyxr.mongodb.net/?retryWrites=true&w=majority',
);
const userRoutes = require('./api/routes/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use((req, res, next) => {
//     const error = new Error('not found');
//     error.status = 404;
//     next(error);
// }
// );

// app.use((error, req, res, next) => {
//     res.status(error.status || 500);
//     res.json({
//         error : {
//             message : error.message
//         }
//     })
// }
// );

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Orgin', '*');
    res.header('Access-Control-Allow-headers', 'Orgin,X-requested-with,Content-Type-Accept-Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,PUT');
        return res.status(200).json({});

    }
    next();
});

app.use('/user', userRoutes);
module.exports = app;