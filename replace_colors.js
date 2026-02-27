const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "src");

function walkSync(currentDirPath, callback) {
    fs.readdirSync(currentDirPath).forEach((name) => {
        const filePath = path.join(currentDirPath, name);
        const stat = fs.statSync(filePath);
        if (stat.isFile() && filePath.endsWith(".jsx")) {
            callback(filePath, stat);
        } else if (stat.isDirectory()) {
            walkSync(filePath, callback);
        }
    });
}

walkSync(dir, (filePath) => {
    let content = fs.readFileSync(filePath, "utf-8");

    // Replace colors mapping logic
    content = content.replace(/brand-yellow/g, "white");
    content = content.replace(/brand-red/g, "brand-black");
    content = content.replace(/brand-green-medium/g, "brand-green-dark");
    content = content.replace(/brand-green-light/g, "gray-100");
    content = content.replace(/brand-secondary/g, "gray-100");
    content = content.replace(/brand-accent/g, "brand-green-dark");

    fs.writeFileSync(filePath, content, "utf-8");
});

console.log("Colors updated in src jsx files.");
