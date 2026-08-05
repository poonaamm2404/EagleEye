import express from 'express';
import nodemailer from 'nodemailer';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Consultation from './models/Consultation.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
// Configure Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

// API Routes
app.post('/api/consultations', async (req, res) => {
  try {
    const newConsultation = new Consultation(req.body);
    const savedConsultation = await newConsultation.save();
    
    // Send Email Notifications in the background
    if (process.env.GMAIL_USER && process.env.GMAIL_PASS) {
      // 1. Alert to Agency
      const agencyMailOptions = {
        from: `"EagleEye Agency" <${process.env.GMAIL_USER}>`,
        to: process.env.GMAIL_USER, // Sending to yourself
        subject: `🚨 NEW LEAD: ${savedConsultation.service} - ${savedConsultation.name}`,
        html: `
          <h3>New Consultation Request</h3>
          <p><strong>Name:</strong> ${savedConsultation.name}</p>
          <p><strong>Email:</strong> ${savedConsultation.email}</p>
          <p><strong>Phone:</strong> ${savedConsultation.phone}</p>
          <p><strong>Service:</strong> ${savedConsultation.service}</p>
          <p><strong>Method:</strong> ${savedConsultation.contactMethod}</p>
          <p><strong>Description:</strong><br>${savedConsultation.description}</p>
        `
      };
      transporter.sendMail(agencyMailOptions).catch(err => console.error("Agency email failed:", err));

      // 2. Confirmation to Client
      const clientMailOptions = {
        from: `"EagleEye Operations" <${process.env.GMAIL_USER}>`,
        to: savedConsultation.email, // Send to the user's email
        subject: `Confidential: Consultation Request Received`,
        html: `
          <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 8px;">
            <h2 style="color: #c49a6c; margin-top: 0;">EagleEye Operations Center</h2>
            <p>Dear ${savedConsultation.name},</p>
            <p>This is an automated confirmation that your secure consultation request has been successfully received by our team.</p>
            <p><strong>Reference Service:</strong> ${savedConsultation.service}</p>
            <p>One of our specialists is currently reviewing your brief and will contact you shortly via your preferred method (${savedConsultation.contactMethod}).</p>
            <p style="color: #e74c3c; font-size: 13px; font-weight: bold; margin-top: 30px;">For your security, please do not reply to this automated email with sensitive case details.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="font-size: 14px; color: #777;">Best regards,<br><strong>EagleEye Agency</strong></p>
          </div>
        `
      };
      transporter.sendMail(clientMailOptions).catch(err => console.error("Client email failed:", err));
    }

    res.status(201).json({ success: true, data: savedConsultation, message: 'Consultation securely requested.' });
  } catch (error) {
    console.error('Error saving consultation:', error);
    res.status(500).json({ success: false, message: 'Server error, could not process request.' });
  }
});

app.get('/api/consultations', async (req, res) => {
  try {
    const consultations = await Consultation.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: consultations });
  } catch (error) {
    console.error('Error fetching consultations:', error);
    res.status(500).json({ success: false, message: 'Server error, could not fetch data.' });
  }
});

app.patch('/api/consultations/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await Consultation.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Not found' });
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ success: false, message: 'Server error updating status.' });
  }
});

app.listen(PORT, () => {
  console.log(`EagleEye Secure Backend API running on port ${PORT}`);
});

