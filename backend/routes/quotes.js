const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const quotesFile = path.join(__dirname, "..", "data", "quotes.json");

// Read quotes from file
function readQuotes() {
  if (!fs.existsSync(quotesFile)) return [];
  const data = fs.readFileSync(quotesFile, "utf8");
  return data ? JSON.parse(data) : [];
}

// Save quotes to file
function saveQuotes(quotes) {
  fs.writeFileSync(quotesFile, JSON.stringify(quotes, null, 2));
}

// Get all quotes
router.get("/", (req, res) => {
  const quotes = readQuotes();
  res.json(quotes);
});

// Create a new quote
router.post("/", (req, res) => {
  const quotes = readQuotes();

  const newQuote = {
    id: Date.now(),
    customerName: req.body.customerName,
    phone: req.body.phone,
    email: req.body.email,
    serviceType: req.body.serviceType,
    projectType: req.body.projectType,
    dimensions: req.body.dimensions,
    description: req.body.description,
    attachments: req.body.attachments || [],
    status: "New",
    createdAt: new Date().toISOString()
  };

  quotes.push(newQuote);
  saveQuotes(quotes);

  res.status(201).json({
    message: "Quote request created successfully",
    quote: newQuote
  });
});

// Update quote status
router.patch("/:id", (req, res) => {
  const quotes = readQuotes();
  const quoteId = Number(req.params.id);

  const quoteIndex = quotes.findIndex((q) => q.id === quoteId);

  if (quoteIndex === -1) {
    return res.status(404).json({ message: "Quote not found" });
  }

  quotes[quoteIndex].status = req.body.status || quotes[quoteIndex].status;
  saveQuotes(quotes);

  res.json({
    message: "Quote updated successfully",
    quote: quotes[quoteIndex]
  });
});

module.exports = router;
