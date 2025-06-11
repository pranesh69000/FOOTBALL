const fs = require('fs');
const path = require('path');

// Get the current directory
const currentDir = __dirname;
console.log('Current directory:', currentDir);

// Check if .env file exists
const envPath = path.join(currentDir, '.env');
console.log('Looking for .env file at:', envPath);

if (fs.existsSync(envPath)) {
    console.log('.env file exists!');
    // Read the content (excluding sensitive data)
    const content = fs.readFileSync(envPath, 'utf8');
    console.log('File contains:', content ? 'Content exists' : 'File is empty');
} else {
    console.log('.env file does not exist!');
} 