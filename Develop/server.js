const express = require('express');
const app = express();
const PORT = 3001;

// Test route for an example

app.get('/', (req, res) => {
    res.send('This is a test before I start the real work of creating routes!')
});

app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`);
})