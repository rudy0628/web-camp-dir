const fs = require('fs');
const folderName = process.argv[2] || 'project';

// fs.mkdir('Dogs', { recursive: true }, (err) => {
//     console.log("In the callback");
//     if (err) throw err;
// });

try {
    fs.mkdirSync(folderName);
    //new Syntax
    fs.writeFileSync(`${folderName}/index.html`, "")
    fs.writeFileSync(`${folderName}/app.js`, "")
    fs.writeFileSync(`${folderName}/style.css`, "")
} catch (e) {
    console.log("Something went wrong", e);
}
