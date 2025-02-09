const http = require('http');

const requestListener = (request, response) => {
  response.setHeader('Content-Type', 'application/json');
  response.writeHead(200);
  response.end(JSON.stringify({message: 'Hello, World!'}));
};

const server = http.createServer(requestListener);

server.listen(8080, () => {
  console.log('Server is running on port 8080');
});

//Uncommon error:  If the server crashes without any error messages in the console, check for resource leaks, especially file handles or database connections that aren't properly closed.