const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3001;

//Express middlewear

app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Test route for an example

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
    console.log('IT WORKED FOR NOTES!!!')
});

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
})