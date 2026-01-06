const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");

// Simple env parser
function parseEnv(content) {
  const env = {};
  content.split("\n").forEach((line) => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      let value = match[2].trim();
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      env[key] = value;
    }
  });
  return env;
}

try {
  const envPath = path.join(__dirname, ".env.local");
  if (!fs.existsSync(envPath)) {
    console.error(".env.local not found");
    process.exit(1);
  }

  const envContent = fs.readFileSync(envPath, "utf8");
  const env = parseEnv(envContent);

  const API_URL = env.NEXT_PUBLIC_API_URL;
  const WP_USER = env.WP_USER;
  const WP_PASS = env.WP_PASS;

  console.log("Testing authentication...");
  console.log(`API URL: ${API_URL}`);
  console.log(`User: ${WP_USER}`);
  // Don't log password

  if (!API_URL || !WP_USER || !WP_PASS) {
    console.error("Missing environment variables");
    process.exit(1);
  }

  const data = JSON.stringify({
    username: WP_USER,
    password: WP_PASS,
  });

  const url = new URL(`${API_URL}/jwt-auth/v1/token`);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": data.length,
    },
  };

  const req = (url.protocol === "https:" ? https : http).request(
    url,
    options,
    (res) => {
      console.log(`Status Code: ${res.statusCode}`);
      console.log(`Status Message: ${res.statusMessage}`);

      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        console.log("Response Body:", body);
      });
    }
  );

  req.on("error", (error) => {
    console.error("Request Error:", error);
  });

  req.write(data);
  req.end();
} catch (error) {
  console.error("Script Error:", error);
}
