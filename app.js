require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser");

dotenv.config({ path: './config.env' });
const app = express();
const port = process.env.PORT || 5000;
app.use(cookieParser());
app.use(express.json());

require('./db/conn');
app.use(require('./router/auth'));

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    const path = require('path');
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

// Running App
app.listen(port, () => {
    console.log(`Project running at http://localhost:${port}`);
});