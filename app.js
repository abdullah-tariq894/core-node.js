const http = require("http");
const fs = require("fs");
const path = require("path");

const filepath = path.join(process.cwd(), "data.txt");

const server = http.createServer((req, res) => {

    if (req.url === "/") {
        res.write("Hello World");
        res.end();
    }

    else if (req.url === "/form") {
        res.setHeader("Content-Type", "text/html");
        res.write('<form action="/submit" method="POST"><input type="text" name="data"><button>Submit</button></form>');
        res.end();
    }

    else if (req.url === "/submit" ) {

        let data = "";

        req.on("data", (chunk) => {
            data += chunk;
        });

        req.on("end", () => {
            fs.appendFile(filepath, data + "\n", () => {
                res.end("Data Saved");
            });
        });

    }

});

server.listen(3000);