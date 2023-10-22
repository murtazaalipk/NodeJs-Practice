const http = require('http');
const fs = require('fs');
const path = require('path');

// Create an HTTP server
const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    // Serve the HTML form
    const formPath = path.join(__dirname, 'form.html');
    fs.readFile(formPath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else if (req.method === 'POST' && req.url === '/submit') {
    let body = '';
    
    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      // Parse the form data
      const data = JSON.parse(body);

      // Read existing data from JSON file
      fs.readFile('data.json', (err, existingData) => {
        if (err) {
          existingData = [];
        } else {
          existingData = JSON.parse(existingData);
        }

        // Add the new data to the existing data
        existingData.push(data);

        // Write the updated data back to the JSON file
        fs.writeFile('data.json', JSON.stringify(existingData, null, 2), (err) => {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Data stored successfully.');
          }
        });
      });
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

const port = 3000;

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
    
