import { fileURLToPath } from 'node:url';

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = fileURLToPath(new URL('.', import.meta.url));

const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));

console.log('[Setup]', 'Cleaning up...');

try {
    fs.unlinkSync(path.join(__dirname, '..', 'README.md'));
    fs.unlinkSync(path.join(__dirname, '..', 'LICENSE'));

    fs.unlinkSync(path.join(__dirname, '..', './Banner.png'));
    fs.rmdirSync(path.join(__dirname, '..', './Badges'), { recursive: true });
    fs.rmdirSync(path.join(__dirname, '..', './.git'), { recursive: true });

    delete packageJson.scripts.setup;
    fs.writeFileSync(path.join(__dirname, '..', 'package.json'), JSON.stringify(packageJson, null, 4));

    fs.unlinkSync(__filename);
} catch (err) {
    console.error('[Setup]', 'Failed to clean up. Leftover files may exist such as README or LICENSE.');
}

console.log('[Setup]', 'Install dependencies...');

try {
    execSync('pnpm install');
} catch (err) {
    console.error('[Setup]', 'Failed to install dependencies. Do you have pnpm installed?');
}

console.log('[Setup]', 'Initializing git...');

try {
    execSync('git init');
} catch (err) {
    console.error('[Setup]', 'Failed to initialize git. Do you have git installed?');
}

console.log('[Setup]', 'Setup complete.');