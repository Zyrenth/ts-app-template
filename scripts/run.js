import { exec } from 'child_process';

const scripts = process.argv.slice(2);

const runScript = (scriptName) => {
    return new Promise((resolve) => {
        const proc = exec(`pnpm run ${scriptName}`, (error) => {
            if (error) {
                console.error(`An error occurred while running script "${scriptName}". Exiting...`);
                process.exit(1);
            } else {
                resolve();
            }
        });

        proc.stdout.pipe(process.stdout);
        proc.stderr.pipe(process.stderr);
    });
};

const runScriptsConcurrently = async () => {
    try {
        await Promise.all(scripts.map(runScript));
        console.log('All scripts completed successfully.');
    } catch (error) {
        console.error('An error occurred:', error);
    }
};

runScriptsConcurrently();
