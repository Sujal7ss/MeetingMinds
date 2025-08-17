// Simple email service with fallback
let emailService;

try {
  const nodemailer = require('nodemailer');
  
  // Create transporter with safe configuration
  const createTransporter = () => {
    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;
    
    if (!user || !pass) {
      console.warn('Email configuration missing. Email functionality will be disabled.');
      return null;
    }

    return nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: { user, pass }
    });
  };

  const transporter = createTransporter();

  emailService = {
    async sendSummaryEmail(to, subject, summary, transcript = '') {
      if (!transporter) {
        throw new Error('Email service not configured. Please set EMAIL_USER and EMAIL_PASS environment variables.');
      }

      try {
        const mailOptions = {
          from: process.env.EMAIL_USER,
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
} catch (error) {
  console.error('Failed to initialize email service:', error);
  emailService = {
    async sendSummaryEmail() {
      throw new Error('Email service not available');
    },
    async sendTestEmail() {
      throw new Error('Email service not available');
    }
  };
}

module.exports = emailService;
