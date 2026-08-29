import express from 'express';
import nodemailer from 'nodemailer';
import { GoogleGenAI } from '@google/genai';
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
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/anveshak')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.warn('MongoDB connection note:', err.message));
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
        from: `"Anveshak Agency" <${process.env.GMAIL_USER}>`,
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
        from: `"Anveshak Operations" <${process.env.GMAIL_USER}>`,
        to: savedConsultation.email, // Send to the user's email
        subject: `Confidential: Consultation Request Received`,
        html: `
          <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 8px;">
            <h2 style="color: #c49a6c; margin-top: 0;">Anveshak Operations Center</h2>
            <p>Dear ${savedConsultation.name},</p>
            <p>This is an automated confirmation that your secure consultation request has been successfully received by our team.</p>
            <p><strong>Reference Service:</strong> ${savedConsultation.service}</p>
            <p>One of our specialists is currently reviewing your brief and will contact you shortly via your preferred method (${savedConsultation.contactMethod}).</p>
            <p style="color: #e74c3c; font-size: 13px; font-weight: bold; margin-top: 30px;">For your security, please do not reply to this automated email with sensitive case details.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="font-size: 14px; color: #777;">Best regards,<br><strong>Anveshak Agency</strong></p>
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

// AI Chatbot Endpoint
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_INSTRUCTION = `You are the secure AI Assistant for Anveshak Private Investigations. 
You must answer questions based ONLY on the following knowledge base. 
If a user asks for something illegal (hacking, stalking, spyware, unauthorized access to messages/calls/bank details), you MUST refuse and say: "We cannot assist with unauthorized access to private accounts, hacking, spyware, or other unlawful methods. If you're looking for legally obtainable information or evidence, we can discuss appropriate investigation options."

For new investigations, try to ask these questions to gather context:
1. What type of investigation do you need?
2. Can you briefly describe the situation?
3. Who is involved?
4. What information do you already have?

KNOWLEDGE BASE:
General: We provide background verification, matrimonial/relationship investigations, corporate investigations, missing persons, and surveillance. We work with individuals and businesses locally and across India. Our investigators are highly experienced and strictly follow Indian laws.
Background Verification: We verify identity, employee background, education, employment history, addresses, tenants, and credentials.
Matrimonial: We investigate suspected infidelity, pre-marital background checks, verify prospective brides/grooms, and lifestyle investigations.
Corporate: Employee misconduct, workplace theft, corporate fraud, IP violations, internal leaks, due diligence, and financial irregularities.
Missing Persons: Locate missing family, debtors, runaways. Requires basic details to start. Timeline varies.
Surveillance: Discreet physical and mobile surveillance, providing photographic and video evidence when legally permissible.
Confidentiality: Absolute confidentiality. Client identity and case files are strictly protected with non-disclosure guarantees.
Process & Pricing: Initial consultation is required to evaluate the case. Pricing depends on the scope, duration, and resources needed (not fixed). An advance deposit is generally required.
Website Navigation/Booking: If a user asks how to book a consultation or fill out a form, tell them to click the gold "Schedule Consultation" button found at the top right of the navigation bar or anywhere on the website. The form will ask for their Name, Email, Phone, Service Type, and a brief Description.
Evidence: We provide a detailed final report with legally admissible evidence (photos/videos/documents).

- **Company & Website Information:**
- **About Anveshak:** A modern private investigation firm providing confidential, ethical, and professional investigation services. We prioritize factual clarity, rigorous legal compliance, and executive-level discretion without outdated tropes.
- **Official Contact Email:** anveshak.intelligence@gmail.com
- **Our Ethical Code:** Integrity, Confidentiality, Professionalism, Responsible Investigation, Attention to Detail, and Client-Centered Service.
- **Industries We Serve:** Individuals, Families, Corporate Businesses, Law Firms, Insurance Professionals, HR Departments, Financial Organisations, and Private Clients.
- **How We Work (5 Stages):** 1. Confidential Consultation, 2. Understanding Requirements, 3. Investigation Planning, 4. Information Collection, 5. Final Report & Discussion.
- **Insights & Articles Available:** If users ask about thought leadership, mention our articles on: Background Vetting, Corporate Due Diligence, Executive Cyber Privacy, Investigation Ethics, and Selecting a Firm.
- **FAQs:** We ensure absolute confidentiality through NDAs, provide a detailed final report, and operate strictly within applicable legal frameworks. Initial enquiries require only a brief overview and objectives.
`;

// AI Chatbot Helper with Multi-Model Fallback (Fastest first)
const FALLBACK_MODELS = ['gemini-3.1-flash-lite', 'gemini-3.5-flash', 'gemini-3.6-flash', 'gemini-flash-latest'];

async function generateChatResponse(message) {
  let lastError = null;
  for (const modelName of FALLBACK_MODELS) {
    try {
      const response = await ai.models.generateContent({
        model: modelName,
        contents: message,
        config: { 
          systemInstruction: SYSTEM_INSTRUCTION,
          maxOutputTokens: 350
        }
      });
      if (response && response.text) {
        return response.text;
      }
    } catch (err) {
      console.warn(`[Chatbot] Model ${modelName} encountered: ${err.status || err.message}. Trying next fallback...`);
      lastError = err;
    }
  }
  throw lastError;
}

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    console.log(`[Chat Request Received] Message: "${message}"`);
    if (!message) return res.status(400).json({ success: false, message: 'Message is required' });

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
      return res.status(500).json({ success: false, message: 'AI Chatbot is currently offline (Missing API Key).' });
    }

    const reply = await generateChatResponse(message);
    res.status(200).json({ success: true, reply });
  } catch (error) {
    console.error('AI Chat Error:', error);
    if (error?.status === 429) {
      return res.status(429).json({ success: false, message: "Our Secure AI Assistant has reached its daily capacity due to high traffic. Please try again tomorrow, or use the 'Schedule Consultation' form above to speak directly with an operative." });
    }
    if (error?.status === 503 || error?.code === 503) {
      return res.status(503).json({ success: false, message: "The AI network is experiencing a brief high-demand spike. Please try asking again in a moment." });
    }
    res.status(500).json({ success: false, message: 'Error processing AI request. Please try again shortly.' });
  }
});

app.listen(PORT, () => {
  console.log(`Anveshak Secure Backend API running on port ${PORT}`);
});

