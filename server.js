const path = require("path");
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const esbuild = require("esbuild");
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

// ==================================================================

let stripe;
if (STRIPE_KEY && (STRIPE_KEY.startsWith("sk_live_") || STRIPE_KEY.startsWith("sk_test_") || STRIPE_KEY.startsWith("rk_"))) {
    stripe = require("stripe")(STRIPE_KEY);
    console.log(`✅ STRIPE READY. Mode: ${STRIPE_KEY.startsWith("sk_live") ? "LIVE" : "TEST"}`);
} else {
    console.log(`❌ STRIPE KEY MISSING.`);
}

app.use(express.json());
app.use(cors()); 

app.use((req, res, next) => {
    // Log only relevant requests to keep logs clean
    if (!req.url.endsWith('.css') && !req.url.endsWith('.png')) {
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    }
    next();
});

// ------------------------------------------------------------------
// ⚡️ RUNTIME TRANSPILATION MIDDLEWARE
// This converts .tsx/.ts files to browser-readable .js on the fly
// ------------------------------------------------------------------
app.use((req, res, next) => {
    // 1. Resolve Extensionless Imports (e.g., import App from './App')
    let filePath = path.join(__dirname, req.path);
    
    // Check if the file exists on disk with specific extensions
    let fileExistsWithExt = "";
    if (!fs.existsSync(filePath) && !req.path.includes('.')) {
        if (fs.existsSync(filePath + '.tsx')) fileExistsWithExt = filePath + '.tsx';
        else if (fs.existsSync(filePath + '.ts')) fileExistsWithExt = filePath + '.ts';
    } else if (fs.existsSync(filePath)) {
        if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) fileExistsWithExt = filePath;
    }

    // 2. Transpile TypeScript/JSX
    if (fileExistsWithExt) {
        try {
            const content = fs.readFileSync(fileExistsWithExt, 'utf8');
            const loader = fileExistsWithExt.endsWith('.ts') ? 'ts' : 'tsx';
            
            const result = esbuild.transformSync(content, {
                loader: loader,
                target: 'es2020',
                format: 'esm', // Important: Output as ES Module
            });
            
            res.setHeader('Content-Type', 'application/javascript');
            return res.send(result.code);
        } catch (e) {
            console.error(`❌ Transpilation Error for ${req.path}:`, e.message);
            return res.status(500).send(`Transpilation Error: ${e.message}`);
        }
    }
    next();
});

// Serve static files
app.use(express.static("public"));
app.use(express.static(__dirname));

// Health Check
app.get("/health", (req, res) => {
  res.json({ status: "online", stripe_configured: !!stripe });
});

// Payment Endpoint
app.post("/create-payment-intent", async (req, res) => {
  const { items, email } = req.body;

  if (!stripe) {
    return res.status(500).json({ error: "Server Error: Key Missing" });
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

// SPA Catch-all
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "index.html"));
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 SERVER RUNNING on port ${PORT}`);
});