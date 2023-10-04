const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3001;
const { v4: uuidv4 } = require('uuid');

//Express middlewear
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Variable to establish absolute file path vs relative
dbFilePath = path.join(__dirname, 'db', 'db.json');

// Function to update the variable when the db.json file changes
const updateNotes = () => {
    fs.readFile(dbFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            notesData = JSON.parse(data);
        }
    });
}

// Initialize notesData variable
let notesData = [];

// Initial updates of the variable when the application starts
updateNotes();

// Sends static files
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.get("/api/notes", (req, res) => {
    res.status(200).json(notesData);
    console.log(notesData);
});

app.post('/api/notes', (req, res) => {
    //log that a post request was received
    console.log(`${req.method} request received to add a note to the application`)
    //Destructing the request 
    const { title, text } = req.body;
    //Check to see that a title and text are available
    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        }
        
        // Add a new note
        notesData.push(newNote);

        // Write updated notes back to the file
        fs.writeFile(dbFilePath, JSON.stringify(notesData), (writeErr) => {
            if (writeErr) {
                console.error(writeErr);
            } else {
                console.info('Successfully updated Notes!');
                updateNotes();
            }
        });
        const response = {
            status: 'success',
            body: newNote,
        }

        console.log(response);
        res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting review');
  }
});

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
})