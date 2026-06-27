// server.js — Express backend for the portfolio site.
// Exposes the bio/profile data and project list as JSON over a small REST API.

import "dotenv/config";
import express from "express";
import cors from "cors";
import { Resend } from "resend";
import { profile, projects } from "./data.js";

const app = express();
const PORT = process.env.PORT || 5000;

// --- Email config (Resend) ---
// Get a free API key at https://resend.com → API Keys → Create API Key
// Put it in a .env file as RESEND_API_KEY (see .env.example) — never commit the real key.
const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

// Where contact-form messages should land — your real inbox.
// Edit this directly, or set NOTIFY_EMAIL in your .env file.
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || profile.email;

app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Portfolio API is running" });
});

// GET full profile / bio data
app.get("/api/profile", (req, res) => {
  res.json(profile);
});

// GET all projects
app.get("/api/projects", (req, res) => {
  res.json(projects);
});

// GET a single project by id
app.get("/api/projects/:id", (req, res) => {
  const project = projects.find((p) => p.id === Number(req.params.id));
  if (!project) {
    return res.status(404).json({ error: "Project not found" });
  }
  res.json(project);
});

// POST contact form submission — sends a real email to your inbox via Resend.
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ error: "Name, email and message are all required" });
  }

  console.log("New contact form submission:", { name, email, message });

  // If no API key is configured yet, don't fail silently — tell the developer clearly.
  if (!resend) {
    console.warn(
      "RESEND_API_KEY is not set — email was NOT sent. Add it to backend/.env to enable real emails.",
    );
    return res.status(201).json({
      success: true,
      message:
        "Thanks for reaching out! (Note: email sending isn't configured yet.)",
    });
  }

  try {
    await resend.emails.send({
      // Resend's free shared sender — works out of the box without verifying a domain.
      from: "Portfolio Contact Form <onboarding@resend.dev>",
      to: NOTIFY_EMAIL,
      reply_to: email, // hitting "Reply" in your inbox replies straight to the sender
      subject: `New portfolio message from ${name}`,
      html: `
        <div style="font-family: sans-serif; line-height:1.6;">
          <h2>New message from your portfolio site</h2>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Message:</b></p>
          <p style="white-space:pre-wrap; background:#f4f4f4; padding:14px; border-radius:8px;">${message}</p>
        </div>
      `,
    });

    res
      .status(201)
      .json({
        success: true,
        message: "Thanks for reaching out! I'll reply soon.",
      });
  } catch (err) {
    console.error("Failed to send email via Resend:", err);
    res
      .status(500)
      .json({
        error:
          "Message received, but the email couldn't be sent. Please try again.",
      });
  }
});

app.listen(PORT, () => {
  console.log(`Portfolio API running on http://localhost:${PORT}`);
});
