const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

console.log("🚀 Starting Build Process...");

// 1. Clean/Create dist folder
if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true, force: true });
}
fs.mkdirSync('dist');

// 2. Process HTML
// We read the index.html and point it to the new bundled JS file instead of the raw TSX
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace('src="./index.tsx"', 'src="./bundle.js"');
fs.writeFileSync('dist/index.html', html);
console.log("✅ HTML processed and copied to dist/");

// 3. Bundle Application
// We bundle index.tsx but keep React external because we use the importmap in index.html
try {
    esbuild.buildSync({
        entryPoints: ['index.tsx'],
        bundle: true,
        outfile: 'dist/bundle.js',
        format: 'esm', // ES Modules to work with <script type="module">
        loader: { '.tsx': 'tsx', '.ts': 'ts' },
        // These match the imports in your importmap in index.html
        external: ['react', 'react-dom', 'react-dom/client', 'lucide-react'], 
        minify: true,
        target: ['es2020']
    });
    console.log("✅ App bundled successfully into dist/bundle.js");
} catch (e) {
    console.error("❌ Build Failed:", e);
    process.exit(1);
}

// 4. Create a robots.txt
fs.writeFileSync('dist/robots.txt', 'User-agent: *\nAllow: /');
console.log("✅ Build Complete.");
