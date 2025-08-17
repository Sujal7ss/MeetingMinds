const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const transcriptRoutes = require('./src/routes/transcript');
const emailRoutes = require('./src/routes/email');

// Routes
app.use('/api/transcript', transcriptRoutes);
app.use('/api/email', emailRoutes);
app.get('/', (req, res) => {
    res.send('Backend is running');

});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
