const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const rootDir = path.join(__dirname, "..");
const envConfigs = [
  {
    example: path.join(rootDir, ".env.example"),
    target: path.join(rootDir, ".env"),
    label: "Root .env",
  },
  {
    example: path.join(rootDir, "apps", "backend", ".env.example"),
    target: path.join(rootDir, "apps", "backend", ".env"),
    label: "Backend .env",
  },
  {
    example: path.join(rootDir, "apps", "frontend", ".env.example"),
    target: path.join(rootDir, "apps", "frontend", ".env.local"),
    label: "Frontend .env.local",
  },
];

console.log("\x1b[36m%s\x1b[0m", "Starting Notion Clone Workspace Setup...");

try {
  // 1. Copy Environment Files
  console.log("\n\x1b[33m%s\x1b[0m", "Setting up environment files...");
  envConfigs.forEach((config) => {
    if (fs.existsSync(config.example)) {
      if (!fs.existsSync(config.target)) {
        fs.copyFileSync(config.example, config.target);
        console.log(` Created ${config.label}`);
      } else {
        console.log(` ${config.label} already exists, skipping.`);
      }
    } else {
      console.log(
        `Example file not found for ${config.label}: ${config.example}`,
      );
    }
  });

  // 2. Install Dependencies
  console.log("\n\x1b[33m%s\x1b[0m", " Installing dependencies...");
  try {
    execSync("npm install", { stdio: "inherit", cwd: rootDir });
    console.log(" Dependencies installed successfully.");
  } catch (err) {
    console.log(
      'Failed to install dependencies automatically. Please run "npm install" manually.',
    );
  }

  console.log("\n\x1b[32m%s\x1b[0m", "Setup complete!");
  console.log("\n\x1b[1m%s\x1b[0m", "Next steps:");
  console.log(
    "  1. Edit environment variables in \x1b[34mapps/backend/.env\x1b[0m",
  );
  console.log("  2. Start databases: \x1b[34mdocker compose up -d\x1b[0m");
  console.log("  3. Start the project: \x1b[34mnpm run dev\x1b[0m");
  console.log("\nHappy coding! ");
} catch (error) {
  console.error(
    "\n\x1b[31m%s\x1b[0m",
    " Failed to setup workspace:",
    error.message,
  );
  process.exit(1);
}
