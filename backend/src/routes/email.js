const express = require('express');
const router = express.Router();
const emailService = require('../services/emailService');

// POST route to send summary via email
router.post('/send', async (req, res) => {
  try {
    const { to, subject, summary, transcript } = req.body;
    
    if (!to || !summary) {
      return res.status(400).json({ 
        error: 'Email address and summary are required' 
      });
    }

    const result = await emailService.sendSummaryEmail(to, subject, summary, transcript);
    
    res.json({ 
      success: true, 
      message: 'Email sent successfully',
      messageId: result.messageId 
    });
  } catch (error) {
    console.error('Error in email route:', error);
    res.status(500).json({ 
      error: 'Failed to send email',
      details: error.message 
    });
  }
});

// POST route to test email configuration
router.post('/test', async (req, res) => {
  try {
    const { to } = req.body;
    
    if (!to) {
      return res.status(400).json({ 
        error: 'Email address is required' 
      });
    }

    const result = await emailService.sendTestEmail(to);
    
    res.json({ 
      success: true, 
      message: 'Test email sent successfully',
      messageId: result.messageId 
    });
  } catch (error) {
    console.error('Error in test email route:', error);
    res.status(500).json({ 
      error: 'Failed to send test email',
      details: error.message 
    });
  }
});

module.exports = router;
