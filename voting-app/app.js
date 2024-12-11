const express = require('express');
const cors = require('cors');
const app = express();

// Allow requests from multiple origins
const allowedOrigins = ['http://localhost:8082', 'http://localhost:8083'];

app.use(cors({
    origin: allowedOrigins
}));

app.use(express.json());

// Sample endpoint
app.post('/submitVote', (req, res) => {
    // Your logic for submitting a vote
    res.status(200).json({ message: 'Vote submitted successfully' });
});

app.get('/queryAllVotes', (req, res) => {
    // Your logic to fetch all votes
    res.status(200).json({ message: 'All votes returned' });
});

app.listen(8081, () => {
    console.log('Server is running on port 8081');
});

