const express = require('express');
const router = express.Router();

// Mock AI summary generation function
const generateSummary = (transcript) => {
    // Simulate AI processing (replace with actual AI API call)
    return `# Meeting Summary\n\n## Key Decisions Made\n- Mock summary generated from transcript: ${transcript}`;
};

// POST route to handle transcript uploads
router.post('/', (req, res) => {
    const { transcript, prompt } = req.body;
    if (!transcript) {
        return res.status(400).json({ error: 'Transcript is required' });
    }

    const summary = generateSummary(transcript, prompt);
    res.json({ summary });
});

module.exports = router;
