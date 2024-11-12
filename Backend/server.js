const express = require('express');
const dbConnect = require('./dbConnect');
const app = express();
app.use(express.json());
const path = require('path');
const userRoute = require('./routes/usersRoute');
const transactionsRoute = require('./routes/transactionsRoute');

app.use('/api/users/', userRoute);
app.use('/api/transactions/', transactionsRoute);

const port = process.env.PORT || 8080; // Render sets PORT in production

if (process.env.NODE_ENV === 'production') {
    // Serve static files from the "build" directory (assuming a React front end)
    app.use(express.static(path.join(__dirname, 'build')));

    // Serve index.html on all unspecified routes
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'index.html'));
    });
}

app.listen(port, '0.0.0.0', () => console.log(`Node JS Server started at port ${port}!`));
