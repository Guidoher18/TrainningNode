const http = require("node:http");
const findAvailablePort = require("./10.free-port");

const server = http.createServer((req, res) => {
  console.log("request received");
  res.end("Hello World");
});

findAvailablePort(3000).then((port) => {
  server.listen(0, () => {
    console.log(
      `Server listening on port http://localhost:${server.address().port}`
    );
  });
});
