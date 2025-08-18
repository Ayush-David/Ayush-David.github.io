const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Serve static portfolio (for local dev)
app.use('/', express.static(path.join(__dirname, '..', 'portfolio')));

// Endpoint to retrieve phone (reads from env)
app.get('/api/phone', (req, res) => {
  const phone = process.env.PHONE || '';
  if(!phone) return res.status(404).json({error: 'not configured'});
  return res.json({phone});
});

// Simple contact endpoint (no persistence) — proxy for emailing/webhook
app.post('/api/contact', (req, res) => {
  const {name,email,message} = req.body || {};
  if(!name || !email || !message) return res.status(400).json({error:'missing fields'});
  // In a production site, forward to an email service or store securely.
  console.log('Contact submission:', {name,email,message});
  return res.json({status:'ok'});
});

app.listen(PORT, ()=>{
  console.log(`Dev server listening on http://localhost:${PORT}`);
});
