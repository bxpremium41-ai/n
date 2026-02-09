const fs = require('fs');
const path = require('path');

const filesToDelete = [
    'index.html',
    'index.tsx',
    'App.tsx',
    'constants.tsx',
    'types.ts',
    'vite.config.ts',
    'build.js',
    'server.js',
    '.env',
    'metadata.json',
    'loading-widget.html',
    'timer.html',
    'package-lock.json'
];

const foldersToDelete = [
    'components',
    'services',
    'dist' 
];

console.log("🧹 Starting Cleanup...");

filesToDelete.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        try {
            fs.unlinkSync(filePath);
            console.log(`✅ Deleted file: ${file}`);
        } catch (e) {
            console.error(`❌ Failed to delete ${file}:`, e.message);
        }
    }
});

foldersToDelete.forEach(folder => {
    const folderPath = path.join(__dirname, folder);
    if (fs.existsSync(folderPath)) {
        try {
            fs.rmSync(folderPath, { recursive: true, force: true });
            console.log(`✅ Deleted folder: ${folder}/`);
        } catch (e) {
            console.error(`❌ Failed to delete ${folder}/:`, e.message);
        }
    }
});

console.log("✨ Cleanup Complete. Project is now organized for separate deployment.");
console.log("👉 Frontend is in /frontend");
console.log("👉 Backend is in /backend");
