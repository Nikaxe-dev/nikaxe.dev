const fs = require('fs');
const path = require('path');

function getDirectoryStructure(dirPath, relativePath = '') {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    const structure = {};

    for (const entry of entries) {
        const entryPath = path.join(dirPath, entry.name);
        const entryRelativePath = path.join(relativePath, entry.name);

        if (entry.isFile()) {
            structure[entry.name] = {
                type: "file",
                relativePath: entryRelativePath.replace(/\\/g, '/') // Use forward slashes for consistency
            };
        } else if (entry.isDirectory()) {
            structure[entry.name] = {
                type: "directory",
                relativePath: entryRelativePath.replace(/\\/g, '/'),
                ...getDirectoryStructure(entryPath, entryRelativePath)
            };
        }
    }

    return structure;
}

const basePath = './'; // Replace with your directory path
const structure = getDirectoryStructure(basePath);

// Add the filemap metadata for `files.json`
structure['files.json'] = {
    type: "file",
    path: "files.json"
};

// Write the result to a `files.json` file
fs.writeFileSync(
    path.join(basePath, 'files.json'),
    JSON.stringify(structure, null, 4), // Pretty print with 4 spaces
    'utf-8'
);

console.log("files.json created!");
