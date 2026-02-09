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
app.use(cors()); 
app.disable('x-powered-by');

// ------------------------------------------------------------------
// 🚀 STATIC FILE SERVING (Production Mode)
// ------------------------------------------------------------------

// 1. Serve the 'dist' folder (Created by npm run build)
// This contains the bundled JS and the processed index.html
const distPath = path.join(__dirname, "dist");
if (fs.existsSync(distPath)) {
    app.use(express.static(distPath));
} else {
    console.error("❌ 'dist' folder not found! Make sure 'npm run build' ran successfully.");
}

// 2. Serve 'public' folder for images/assets if it exists
const publicPath = path.join(__dirname, "public");
if (fs.existsSync(publicPath)) {
    app.use(express.static(publicPath));
}

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
// 🔄 SPA FALLBACK
// ------------------------------------------------------------------

// Send index.html for any other request (Client-side routing)
app.get("*", (req, res) => {
    // If requesting a specific file extension that wasn't found in static, 404 it.
    if (req.path.includes('.') && !req.path.endsWith('.html')) {
        return res.status(404).send('Not Found');
    }

    const indexPath = path.join(distPath, "index.html");
    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        res.status(500).send("Application Error: Build not found. Please run 'npm run build' on the server.");
    }
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 PRODUCTION SERVER RUNNING on port ${PORT}`);
});