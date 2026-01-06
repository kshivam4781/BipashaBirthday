const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
// Increase body size limit to 50MB for whiteboard images
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static(path.join(__dirname)));

// Whiteboard data file path
const WHITEBOARD_DATA_FILE = path.join(__dirname, 'whiteboard-data.json');

// Messages data file path
const MESSAGES_DATA_FILE = path.join(__dirname, 'messages-data.json');

// Ensure whiteboard data file exists
if (!fs.existsSync(WHITEBOARD_DATA_FILE)) {
  fs.writeFileSync(WHITEBOARD_DATA_FILE, JSON.stringify({ imageData: null }));
}

// Ensure messages data file exists
if (!fs.existsSync(MESSAGES_DATA_FILE)) {
  fs.writeFileSync(MESSAGES_DATA_FILE, JSON.stringify([]));
}

// API endpoint to save whiteboard
app.post('/api/whiteboard/save', (req, res) => {
  try {
    const { imageData } = req.body;
    
    if (!imageData) {
      return res.status(400).json({ success: false, error: 'No image data provided' });
    }
    
    const data = { imageData: imageData, lastUpdated: new Date().toISOString() };
    fs.writeFileSync(WHITEBOARD_DATA_FILE, JSON.stringify(data));
    
    res.json({ success: true, message: 'Whiteboard saved successfully' });
  } catch (error) {
    console.error('Error saving whiteboard:', error);
    res.status(500).json({ success: false, error: 'Failed to save whiteboard' });
  }
});

// API endpoint to load whiteboard
app.get('/api/whiteboard/load', (req, res) => {
  try {
    if (!fs.existsSync(WHITEBOARD_DATA_FILE)) {
      return res.json({ success: true, imageData: null });
    }
    
    const data = JSON.parse(fs.readFileSync(WHITEBOARD_DATA_FILE, 'utf8'));
    res.json({ success: true, imageData: data.imageData || null });
  } catch (error) {
    console.error('Error loading whiteboard:', error);
    res.status(500).json({ success: false, error: 'Failed to load whiteboard' });
  }
});

// API endpoint to save message
app.post('/api/messages/save', (req, res) => {
  try {
    const { name, message } = req.body;
    
    if (!name || !message) {
      return res.status(400).json({ success: false, error: 'Name and message are required' });
    }
    
    // Sanitize input
    const sanitizedName = name.trim().substring(0, 50);
    const sanitizedMessage = message.trim().substring(0, 500);
    
    if (!sanitizedName || !sanitizedMessage) {
      return res.status(400).json({ success: false, error: 'Invalid name or message' });
    }
    
    // Load existing messages
    let messages = [];
    if (fs.existsSync(MESSAGES_DATA_FILE)) {
      const fileData = fs.readFileSync(MESSAGES_DATA_FILE, 'utf8');
      messages = JSON.parse(fileData);
    }
    
    // Add new message
    const newMessage = {
      id: Date.now().toString(),
      name: sanitizedName,
      message: sanitizedMessage,
      date: new Date().toISOString()
    };
    
    messages.push(newMessage);
    
    // Save messages
    fs.writeFileSync(MESSAGES_DATA_FILE, JSON.stringify(messages, null, 2));
    
    res.json({ success: true, message: 'Message saved successfully' });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ success: false, error: 'Failed to save message' });
  }
});

// API endpoint to load messages
app.get('/api/messages/load', (req, res) => {
  try {
    if (!fs.existsSync(MESSAGES_DATA_FILE)) {
      return res.json({ success: true, messages: [] });
    }
    
    const messages = JSON.parse(fs.readFileSync(MESSAGES_DATA_FILE, 'utf8'));
    res.json({ success: true, messages: messages || [] });
  } catch (error) {
    console.error('Error loading messages:', error);
    res.status(500).json({ success: false, error: 'Failed to load messages' });
  }
});

// Handle all other routes - serve index.html for SPA behavior
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT}`);
});

