const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const transcriptRoutes = require('./src/routes/transcript');
const emailRoutes = require('./src/routes/email');

// Routes
app.use('/api/transcript', transcriptRoutes);
app.use('/api/email', emailRoutes);
app.get('/', (req, res) => {
    res.json({ 
        message: 'MeetingMinds API is running',
        endpoints: {
            transcript: '/api/transcript',
            email: '/api/email'
        }
    });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Handle 404
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// For Vercel serverless deployment
module.exports = app;

// For local development
if (require.main === module) {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}
