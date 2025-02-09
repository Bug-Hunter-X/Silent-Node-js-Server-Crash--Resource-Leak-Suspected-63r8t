const http = require('http');
const fs = require('fs'); // Example: adding file system module

const requestListener = (request, response) => {
  response.setHeader('Content-Type', 'application/json');
  response.writeHead(200);
  response.end(JSON.stringify({ message: 'Hello, World!' }));

  // Example resource handling (for file):
  let fileStream;
  if (request.url === '/file') {
    fileStream = fs.createReadStream('./someFile.txt');
    fileStream.pipe(response);
    fileStream.on('end', () => {
      console.log('File stream ended');
    });
    fileStream.on('error', (err) => {
      console.error('File stream error:', err);
      response.writeHead(500);
      response.end();
    });
  }
};

const server = http.createServer(requestListener);

// Proper cleanup using event listeners (if applicable):
// server.on('close', () => {console.log('Server closed')})

// Example for clean shutdown when receiving SIGINT
process.on('SIGINT', () => {
  console.log('Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed.');
    process.exit();
  });
});

server.listen(8080, () => {
  console.log('Server is running on port 8080');
});