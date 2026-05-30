const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const backendEnvExample = path.join(rootDir, 'apps', 'backend', '.env.example');
const backendEnv = path.join(rootDir, 'apps', 'backend', '.env');

console.log('Starting Notion Clone workspace setup...');

try {
  // Check if backend environment file exists
  if (!fs.existsSync(backendEnv)) {
    console.log(`Copying apps/backend/.env.example to apps/backend/.env...`);
    fs.copyFileSync(backendEnvExample, backendEnv);
    console.log('✓ apps/backend/.env successfully created!');
  } else {
    console.log('✓ apps/backend/.env already exists. Skipping copy.');
  }

  console.log('\nWorkspace setup is complete!');
  console.log('Next steps:');
  console.log('1. Start the infrastructure services (MongoDB & Redis):');
  console.log('   docker compose up -d');
  console.log('2. Start the development backend & frontend applications:');
  console.log('   npm run dev');
} catch (error) {
  console.error('Failed to setup workspace:', error.message);
  process.exit(1);
}
