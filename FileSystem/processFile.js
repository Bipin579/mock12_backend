const fs = require('fs');

// Function to read a file asynchronously
function readFileAsync(filename) {
  fs.readFile(filename, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`File contents of ${filename}:`);
      console.log(data);
    }
  });
}

// Function to write to a file asynchronously
function writeFileAsync(filename, data) {
  fs.writeFile(filename, data, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Successfully wrote to ${filename}`);
    }
  });
}

// Example usage
readFileAsync('example.txt');
writeFileAsync('output.txt', 'Hello, World!');


// In this example, the readFileAsync and writeFileAsync functions are both asynchronous and use 
// callbacks to handle I / O operations.When readFileAsync is called, it reads the contents of the 
// file and logs them to the console.When writeFileAsync is called, it writes the given data to the specified file.

// The event loop in Node.js ensures that these functions are executed asynchronously and non - blocking,
//     allowing the application to handle multiple requests simultaneously without blocking other operations.