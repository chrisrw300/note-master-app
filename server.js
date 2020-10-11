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

//connect HTML pages
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, "public/assets/index.html"));
});
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});
app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "./db/db.json"));
});
app.get('/api/notes/:id', (req, res) => {
    let savedNotesArray = JSON.parse(fs.readFileSync("./db/db/json"));
});

//posts to array, displays on page
app.post('/api/notes', (req, res) => {
    let savedNotesArray = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    let newNotes = req.body;
    let uniqueNoteId = (savedNotesArray.length).toString();
    newNotes.id = uniqueNoteId;
    savedNotesArray.push(newNotes);

    fs.writeFileSync('./db/db.json', JSON.stringify(savedNotesArray));
    console.log('Note saved', newNotes);
    res.json(savedNotesArray);
});

app.listen(PORT, () => {
    console.log('API server now on port' + PORT);
})