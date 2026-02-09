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

let stripe;
if (STRIPE_KEY && (STRIPE_KEY.startsWith("sk_live_") || STRIPE_KEY.startsWith("sk_test_") || STRIPE_KEY.startsWith("rk_"))) {
    stripe = require("stripe")(STRIPE_KEY);
    console.log(`✅ STRIPE READY.`);
} else {
    console.log(`❌ STRIPE KEY MISSING.`);
}

app.use(express.json());
app.use(cors()); 
app.disable('x-powered-by');

// Log requests
app.use((req, res, next) => {
    if (!req.url.endsWith('.css') && !req.url.endsWith('.png') && !req.url.endsWith('.ico')) {
        console.log(`[REQUEST] ${req.method} ${req.url}`);
    }
    next();
});

// ------------------------------------------------------------------
// ⚡️ RUNTIME TRANSPILATION MIDDLEWARE
// ------------------------------------------------------------------
app.use((req, res, next) => {
    // 1. Identify if this is a request for code (js/ts/tsx)
    let requestedPath = req.path;
    
    // 2. Map URL to File System
    // If browser requests '/App', look for '/App.tsx' or '/App.ts'
    let filePath = path.join(__dirname, requestedPath);
    let fileToRead = null;
    let loader = 'tsx';

    // Direct match (.tsx or .ts requested directly)
    if (fs.existsSync(filePath) && (filePath.endsWith('.tsx') || filePath.endsWith('.ts'))) {
        fileToRead = filePath;
        loader = filePath.endsWith('.ts') ? 'ts' : 'tsx';
    } 
    // Extensionless match (Browser requested '/App')
    else if (!requestedPath.includes('.')) {
        if (fs.existsSync(filePath + '.tsx')) {
            fileToRead = filePath + '.tsx';
            loader = 'tsx';
        } else if (fs.existsSync(filePath + '.ts')) {
            fileToRead = filePath + '.ts';
            loader = 'ts';
        }
    }

    // 3. Transpile if found
    if (fileToRead) {
        try {
            const content = fs.readFileSync(fileToRead, 'utf8');
            const result = esbuild.transformSync(content, {
                loader: loader,
                target: 'es2020',
                format: 'esm', // Must be ESM for browser imports
            });
            
            // Critical: Content-Type must be javascript for the browser to execute it as a module
            res.setHeader('Content-Type', 'application/javascript');
            return res.send(result.code);
        } catch (e) {
            console.error(`❌ Transpilation Error for ${req.path}:`, e.message);
            // Return valid JS that logs the error to the browser console
            res.setHeader('Content-Type', 'application/javascript');
            return res.status(500).send(`console.error("Server Transpilation Error: ${e.message.replace(/"/g, '\\"')}");`);
        }
    }
    next();
});

// Serve static files (css, images, etc)
app.use(express.static("public"));
app.use(express.static(__dirname)); // Fallback for root files like metadata.json

// Health Check
app.get("/health", (req, res) => {
  res.json({ status: "online", stripe_configured: !!stripe, node_version: process.version });
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

// Catch-all: Serve index.html for any unknown route (SPA Support)
app.get("*", (req, res) => {
    // Prevent infinite loops if index.html is missing or extension file requested
    if (req.path.includes('.')) return res.sendStatus(404);
    res.sendFile(path.resolve(__dirname, "index.html"));
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 SERVER RUNNING on port ${PORT} (Node ${process.version})`);
});