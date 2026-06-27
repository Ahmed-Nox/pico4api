const http = require("http");
const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

const server = http.createServer((req, res) => {
  if (req.url === "/healthz") {
    res.writeHead(200);
    return res.end("OK");
  }

  if (req.url === "/auth") {
    res.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    });

    return res.end(
      JSON.stringify(imagekit.getAuthenticationParameters())
    );
  }

  res.writeHead(404);
  res.end("Not Found");
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
