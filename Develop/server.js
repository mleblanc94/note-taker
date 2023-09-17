const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3001;
const notesData = require("./db/db");
const { v4: uuidv4 } = require('uuid');

//Express middlewear

app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Test route for an example

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.get("/api/notes", (req, res) => res.status(200).json(notesData));

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
            note_id: uuidv4(),
        }
        //retrieve the existing notes saved in the JSON
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
      } else {
        // Convert string into JSON object
        const parsedNotes = JSON.parse(data);

        // Add a new review
        parsedNotes.push(newNote);

        // Write updated reviews back to the file
        fs.writeFile('./db/db.json', JSON.stringify(parsedNotes),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info('Successfully updated Notes!')
        );
            }
        });
        const response = {
            status: 'success',
            body: newNote,
          };

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