const express = require("express");
const morgan = require("morgan");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");

// Create Express Server
const app = express();

// enable CORS
app.use(cors());

// Configuration
const PORT = 3005;
const HOST = "127.0.0.1";
const API_SERVICE_URL = "YOUR_URL";

// Logging
app.use(morgan("dev"));

// Info GET endpoint
app.get("/", (req, res, next) => {
  res.send("This is a proxy service.");
});

// Proxy endpoints
app.use(
  "/proxy_api",
  createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      [`^/proxy_api`]: "",
    },
  })
);

// Start the Proxy
app.listen(PORT, () => {
  console.log(`Starting Proxy at ${HOST}:${PORT}`);
});
