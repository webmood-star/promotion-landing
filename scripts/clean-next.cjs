const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "..", ".next");
try {
  fs.rmSync(dir, { recursive: true, force: true });
} catch (e) {
  if (e && e.code !== "ENOENT") {
    console.error(e);
    process.exit(1);
  }
}
