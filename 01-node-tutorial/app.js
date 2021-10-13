console.log("Welcome to Node Tutorial");

const { readFileSync, writeFileSync, createReadStream } = require("fs");
const http = require("http");

/*for (let i = 0; i < 100000; i++) {
    writeFileSync("./content/big-text.txt", `hello world - ${i}\n`, {
        flag: "a",
    });
}*/

const server = http.createServer((req, res) => {
    // const file = readFileSync("./content/big-text.txt", "utf-8");
    const file = createReadStream("./content/big-text.txt", "utf-8");

    file.on("open", () => {
        file.pipe(res);
    });
});

server.listen(5000);