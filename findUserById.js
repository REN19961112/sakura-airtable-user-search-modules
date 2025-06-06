const http = require("http");

const server = http.createServer((req, res) => {
  res.end("✅ sakura-airtable-user-modules 起動成功");
});

server.listen(process.env.PORT || 3000, () => {
  console.log("🌸 モジュール起動中...");
});
