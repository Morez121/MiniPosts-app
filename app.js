const express = require('express');
const app = express();

const mongoose = require('mongoose');
require('dotenv/config');

const bodyParser = require('body-parser');
const postsRoute = require('./routes/posts');

// Middleware to parse incoming JSON
app.use(bodyParser.json());

// Route middleware
app.use('/posts', postsRoute);

// Default route
app.get('/', (req, res) => {
    res.send('Homepage');
});

// Mongoose connection using Promises (no deprecated options)
mongoose.connect(process.env.DB_CONNECTOR)
    .then(() => {
        console.log('DB is now connected');
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
        process.exit(1); // Exit the process if connection fails
    });

// Start the server
app.listen(3000, () => {
    console.log('Server is up and running on port 3000...');
});
    