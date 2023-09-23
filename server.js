const express = require('express');
const cors = require('cors'); // Import the cors middleware
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
app.use(cors()); 

// Middleware to parse JSON in POST requests
app.use(bodyParser.json());


// Define a POST route to update the "hello" value in the JSON file
app.post('/updateHello', (req, res) => {
  const { name, newValue } = req.body; // Extract both name and newValue from the request body

  if (!name || newValue === undefined) {
    return res.status(400).json({ error: 'Both name and newValue are required.' });
  }

  fs.readFile('.subs.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).json({ error: 'Unable to read the file.' });
    }

    try {
      const jsonData = JSON.parse(data);

      // Update the value associated with the provided name
      jsonData[name] = jsonData[name] - newValue;

      fs.writeFile('.subs.json', JSON.stringify(jsonData, null, 2), (err) => {
        if (err) {
          console.error('Error writing to file:', err);
          return res.status(500).json({ error: 'Unable to write to file.' });
        }

        // console.log(`"${name}" value updated to ${newValue}`);
        // res.status(200).json({ message: `"${name}" value updated.` });
      });
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return res.status(500).json({ error: 'Unable to parse JSON data.' });
    }
  });
});


// Define an endpoint to read a value from the JSON file
app.get('/getMessage/:name', (req, res) => {
  const { name } = req.params;

  // Read the JSON file
  fs.readFile('.subs.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).json({ error: 'Unable to read the file.' });
    }

    try {
      // Parse the JSON data
      const jsonData = JSON.parse(data);

      // Check if the name exists in the JSON data
      if (jsonData.hasOwnProperty(name)) {
        const message = jsonData[name];
        res.json({ message });
      } else {
        res.status(404).json({ error: `Name '${name}' not found in JSON data.` });
      }
    } catch (error) {
      console.error('Error parsing JSON:', error);
      res.status(500).json({ error: 'Unable to parse JSON data.' });
    }
  });
});

const PORT = process.env.PORT || 300;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});