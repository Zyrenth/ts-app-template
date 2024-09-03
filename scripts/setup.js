import fs from 'fs';
import { execSync } from 'child_process';

const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

console.log('[Setup]', 'Cleaning up...');

fs.unlinkSync('./README.md');
fs.unlinkSync('./LICENSE');

fs.unlinkSync('./Banner.png');
fs.rmdirSync('./Badges', { recursive: true });

delete packageJson.scripts.setup;
fs.writeFileSync('../package.json', JSON.stringify(packageJson, null, 4));

fs.unlinkSync(__filename);

console.log('[Setup]', 'Install dependencies...');

execSync('pnpm install');

console.log('[Setup]', 'Setup complete.');