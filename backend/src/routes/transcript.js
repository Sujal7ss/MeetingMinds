const express = require('express');
const axios = require('axios');
const router = express.Router();

// Groq AI summary generation function
const generateSummary = async (transcript, prompt) => {
    try {
        const apiKey = process.env.GROQ_API_KEY || 'your-groq-api-key-here';
        const groqApiUrl = 'https://api.groq.com/openai/v1/chat/completions';
        
        const systemPrompt = prompt || "Summarize this meeting transcript with key decisions, action items, and important discussions. Include participant names and deadlines if mentioned. Format as a professional meeting summary with clear sections.";
        
        const response = await axios.post(groqApiUrl, {
            model: "llama3-8b-8192",
            messages: [
                {
                    role: "system",
                    content: systemPrompt
                },
                {
                    role: "user",
                    content: transcript
                }
            ],
            max_tokens: 1000,
            temperature: 0.7
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });

        const summary = response.data.choices[0].message.content;
        return summary;
    } catch (error) {
        console.error('Error calling Groq AI API:', error.response?.data || error.message);
        throw new Error('Failed to generate summary: ' + (error.response?.data?.error?.message || error.message));
    }
};

// POST route to handle transcript uploads
router.post('/', async (req, res) => {
    try {
        const { transcript, prompt } = req.body;
        if (!transcript) {
            return res.status(400).json({ error: 'Transcript is required' });
        }

        const summary = await generateSummary(transcript, prompt);
        res.json({ summary });
    } catch (error) {
        console.error('Error in transcript route:', error);
        res.status(500).json({ 
            error: 'Failed to generate summary',
            details: error.message 
        });
    }
});

module.exports = router;
