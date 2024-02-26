const express = require('express');
const app = express();

// Logging middleware function
function logger(req, res, next) {
  const start = Date.now(); // Start time of the request

  // Log request method, URL, and timestamp
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

  // Function to execute once the response is sent
  res.on('finish', () => {
    const end = Date.now(); // End time of the request
    const duration = end - start; // Duration of the request in milliseconds

    // Log time taken for processing the request
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - ${duration}ms`);
  });

  next(); // Call the next middleware in the stack
}

// Using the logging middleware for all routes
app.use(logger);

// Routes
app.get('/code.list', (req, res) => {
  res.send('Hello World!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});