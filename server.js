
const path = require("path");
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const app = express();

// ==================================================================
// 🔑 CONFIGURATION SECTION
// ==================================================================

// ⚠️ PASTE YOUR KEY HERE
const HARDCODED_STRIPE_KEY = ""; 

const envPath = path.resolve(__dirname, ".env");
if (fs.existsSync(envPath)) {
    require("dotenv").config({ path: envPath });
}

let STRIPE_KEY = HARDCODED_STRIPE_KEY || process.env.STRIPE_SECRET_KEY;
if (STRIPE_KEY) STRIPE_KEY = STRIPE_KEY.trim();

// ==================================================================

let stripe;
if (STRIPE_KEY && (STRIPE_KEY.startsWith("sk_live_") || STRIPE_KEY.startsWith("sk_test_") || STRIPE_KEY.startsWith("rk_"))) {
    stripe = require("stripe")(STRIPE_KEY);
    console.log(`✅ STRIPE READY. Mode: ${STRIPE_KEY.startsWith("sk_live") ? "LIVE" : "TEST"}`);
} else {
    console.log(`❌ STRIPE KEY MISSING.`);
}

app.use(express.static("public"));
app.use(express.json());
app.use(cors()); 

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.get("/", (req, res) => {
  res.json({ status: "online", stripe_configured: !!stripe });
});

app.post("/create-payment-intent", async (req, res) => {
  const { items, email, name } = req.body;

  if (!stripe) {
    return res.status(500).json({ error: "Server Error: Key Missing" });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 4900, // $49.00
      currency: "usd",
      payment_method_types: ['card'], // Strict Card Only
      receipt_email: email && email.length > 0 ? email : undefined,
      description: "Avada Design Bundle",
      metadata: {
          product_id: "lifetime-bundle-01"
      }
    });

    console.log(`💰 Created Intent: ${paymentIntent.id}`);
    
    res.send({
      clientSecret: paymentIntent.client_secret,
    });

  } catch (error) {
    console.error("❌ Stripe API Error:", error.message);
    res.status(500).send({ error: error.message });
  }
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 SERVER RUNNING on port ${PORT}`);
});