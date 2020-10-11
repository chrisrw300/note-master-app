const fs = require('fs');
const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 3001;

const app = express();

//takes POST data and converts it to key/value pairs
app.use(express.urlencoded({extended: true}));
//parse incoming JSON data
app.use(express.json());
//for css, js, and other public files
app.use(express.static('public'));



app.listen(PORT, () => {
    console.log('API server now on port' + PORT);
})