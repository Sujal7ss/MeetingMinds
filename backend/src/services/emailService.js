const nodemailer = require('nodemailer');

// Create transporter (configure with your email service)
const transporter = nodemailer.createTransporter({
  service: 'gmail', // You can change this to your email provider
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password'
  }
});

// Email service functions
const emailService = {
  async sendSummaryEmail(to, subject, summary, transcript = '') {
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER || 'your-email@gmail.com',
        to: to,
        subject: subject || 'Meeting Summary',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
              Meeting Summary
            </h1>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
              ${summary.replace(/\n/g, '<br>').replace(/## /g, '<h3 style="color: #007bff;">').replace(/### /g, '<h4 style="color: #6c757d;">')}
            </div>
            
            ${transcript ? `
              <div style="margin-top: 30px;">
                <h3 style="color: #333;">Original Transcript:</h3>
                <div style="background-color: #f1f3f4; padding: 15px; border-radius: 5px; font-family: monospace; font-size: 14px; max-height: 300px; overflow-y: auto;">
                  ${transcript}
                </div>
              </div>
            ` : ''}
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; color: #6c757d; font-size: 12px;">
              <p>This summary was generated using AI technology.</p>
            </div>
          </div>
        `
      };

      const result = await transporter.sendMail(mailOptions);
      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email: ' + error.message);
    }
  },

  async sendTestEmail(to) {
    return this.sendSummaryEmail(to, 'Test Email - Meeting Summary', 'This is a test email from the Meeting Summary application.');
  }
};

module.exports = emailService;
