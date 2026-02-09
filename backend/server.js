const path = require("path");
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const app = express();

// ==================================================================
// 🔑 CONFIGURATION SECTION
// ==================================================================

const HARDCODED_STRIPE_KEY = ""; 

const envPath = path.resolve(__dirname, ".env");
if (fs.existsSync(envPath)) {
    require("dotenv").config({ path: envPath });
}

let STRIPE_KEY = HARDCODED_STRIPE_KEY || process.env.STRIPE_SECRET_KEY;
if (STRIPE_KEY) STRIPE_KEY = STRIPE_KEY.trim();

let stripe;
if (STRIPE_KEY && (STRIPE_KEY.startsWith("sk_live_") || STRIPE_KEY.startsWith("sk_test_") || STRIPE_KEY.startsWith("rk_"))) {
    stripe = require("stripe")(STRIPE_KEY);
    console.log(`✅ STRIPE READY.`);
} else {
    console.log(`⚠️ STRIPE KEY MISSING - Payments will fail.`);
}

app.use(express.json());

// Enable permissive CORS for separate deployment
// In production, you might want to restrict this to your specific frontend domain.
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.disable('x-powered-by');

// ------------------------------------------------------------------
// 💳 API ROUTES
// ------------------------------------------------------------------

app.get("/health", (req, res) => {
  res.json({ 
      status: "online", 
      mode: "production",
      stripe_configured: !!stripe, 
      node_version: process.version 
  });
});

app.post("/create-payment-intent", async (req, res) => {
  const { items, email } = req.body;

  if (!stripe) {
    return res.status(500).json({ error: "Server Error: Payment Gateway Not Configured" });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 4900, // $49.00
      currency: "usd",
      payment_method_types: ['card'],
      receipt_email: email && email.length > 0 ? email : undefined,
      description: "Avada Design Bundle",
      metadata: { product_id: "lifetime-bundle-01" }
    });

    console.log(`💰 Created Intent: ${paymentIntent.id}`);
    res.send({ clientSecret: paymentIntent.client_secret });

  } catch (error) {
    console.error("❌ Stripe API Error:", error.message);
    res.status(500).send({ error: error.message });
  }
});

// ------------------------------------------------------------------
// 🚀 STATIC FILE SERVING (Optional - for Monolith mode)
// ------------------------------------------------------------------

const frontendDist = path.join(__dirname, "../frontend/dist");

if (fs.existsSync(frontendDist)) {
    // If frontend build exists, serve it (Hybrid/Monolith mode)
    app.use(express.static(frontendDist));
    app.get("*", (req, res) => {
        if (req.path.includes('.') && !req.path.endsWith('.html')) {
            return res.status(404).send('Not Found');
        }
        res.sendFile(path.join(frontendDist, "index.html"));
    });
} else {
    // API Only Mode (Separate Deployment)
    console.log("ℹ️ Frontend build not found. Running in API-only mode.");
    app.get("/", (req, res) => res.send("Backend API is running. Ready for frontend requests."));
}

const PORT = process.env.PORT || 4242;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 BACKEND SERVER RUNNING on port ${PORT}`);
});