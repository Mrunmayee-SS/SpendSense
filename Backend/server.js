const express = require('express');
const cors = require('cors');
const dbConnect = require('./dbConnect');
const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for all routes by default

const path = require('path');
const userRoute = require('./routes/usersRoute');
const transactionsRoute = require('./routes/transactionsRoute');

app.use('/api/users/', userRoute);
app.use('/api/transactions/', transactionsRoute);

// 404 handler for undefined API routes
app.use('/api', (req, res) => {
    res.status(404).json({ message: "API endpoint not found" });
});

const port = 8080;

if (process.env.NODE_ENV === 'production') {
    // Serve static files from the "build" directory
    app.use(express.static(path.join(__dirname)));

    // Handle client-side routing, return index.html for all other routes
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'index.html'));
    });
}

app.listen(port, '0.0.0.0', () => console.log(`Node JS Server started at port ${port}!`));
