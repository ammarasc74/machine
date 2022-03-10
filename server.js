const http = require("http");
const app = require("./app");

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.setHeader("X-Foo", "bar");
  res.send("Hello World!");
});
const server = http.createServer(app);

server.listen(port);
