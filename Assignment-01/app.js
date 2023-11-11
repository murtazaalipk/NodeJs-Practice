const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// Serve the HTML form
app.get('/', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<!DOCTYPE html>');
    res.write('<html lang="en">');
    res.write('<head>');
    res.write('<meta charset="UTF-8">');
    res.write('<meta name="viewport" content="width=device-width, initial-scale=1.0">');
    res.write('<title>Node.js Form App</title>');
    res.write('</head>');
    res.write('<body>');
    res.write('<h1>Node.js Form App</h1>');
    res.write('<form action="/submit" method="post">');
    res.write('<label for="name">Name:</label>');
    res.write('<input type="text" id="name" name="name" required><br>');

    res.write('<label for="email">Email:</label>');
    res.write('<input type="email" id="email" name="email" required><br>');

    res.write('<input type="submit" value="Submit">');
    res.write('</form>');
    res.write('</body>');
    res.write('</html>');
    res.end();
});

// Handle form submission
app.post('/submit', (req, res) => {
    const formData = req.body;

    // Save form data to a JSON file
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }

        const jsonData = JSON.parse(data || '[]');
        jsonData.push(formData);

        fs.writeFile('data.json', JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }

            res.send('Form submitted successfully!');
        });
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
