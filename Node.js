// REPL = Read Eval Print & Loop
// write "node" in terminal to start REPL and .exit to stop

// filesystem module
const fs = require("fs");
// Synchronous way
fs.writeFileSync("\JAVASCRIPT/read.txt", "It is a file writing with sync fs."); // if have rewrite it's content else made the file then write content
fs.appendFileSync("\JAVASCRIPT/read.txt", "Appending Some more content");   // Append content on the file
const buff_data = fs.readFileSync("\JAVASCRIPT/read.txt");  // return data in binary form called buffer datatype(contains in node.js only)
console.log(buff_data);
const org_data = buff_data.toString();
console.log(org_data);
fs.renameSync("\JAVASCRIPT/read.txt", "\JAVASCRIPT/readwrite.txt");

fs.mkdirSync("Animesh");
fs.writeFileSync("\Animesh/hello.txt", "My Girlfriend become rude");
console.log(fs.readFileSync("\Animesh/hello.txt", "utf8"));
fs.appendFileSync("\Animesh/hello.txt", "Hi add this to prev text");
console.log(fs.readFileSync("\Animesh/hello.txt", "utf-8"));
fs.renameSync("\Animesh/hello.txt", "\Animesh/hi.txt");
fs.unlinkSync("\Animesh/hi.txt");
fs.rmdirSync("Animesh");

// Asynchronous way
fs.writeFile("JAVASCRIPT/readwrite.txt", "IT is a file writing in async mode fs", (err) => {console.log("created successfully");});
fs.appendFile("JAVASCRIPT/readwrite.txt", "IT is a file appending in async mode fs", (err) => {console.log("Append successfully");});
fs.readFile("JAVASCRIPT/readwrite.txt", "utf-8", (err, data) => {console.log(data);});


// Operating System module
const os = require("os");
console.log(os.arch());
console.log(os.hostname());
console.log(os.platform());
console.log(os.type());
console.log(os.tmpdir());
console.log(os.freemem()); // freememory in bytes
console.log(os.totalmem()); // totalmemory in bytes


// Path module
const path = require("path");
console.log(path.dirname("D:/VS Code/JAVASCRIPT/Node.js"));
console.log(path.extname("D:/VS Code/JAVASCRIPT/Node.js"));
console.log(path.basename("D:/VS Code/JAVASCRIPT/Node.js"));
console.log(path.parse("D:/VS Code/JAVASCRIPT/Node.js"));
console.log(path.parse("D:/VS Code/JAVASCRIPT/Node.js").name);


// User define module
const {add, mul, div, sub} = require("./Notes");
console.log(add(10, 5));
console.log(sub(10, 5));
console.log(mul(10, 5));
console.log(div(10, 5));


// Chalk module      //  5.0.2 is not working
const chalk = require("chalk");
const prompt = require("prompt-sync")({sigint:true}); 
const validator = require("validator"); 
console.log(chalk.blue.italic.inverse("hallum"));
const input = prompt("Enter your age : ", 12);
console.log((Number(input) >= 18) ? chalk.bgGreenBright.bold.red("Adult") : chalk.bgRed.bold("Child"));
const email = prompt("Enter your email : ", "xyz@gmail.com");
console.log(validator.isEmail(email) ? chalk.green.inverse("Valid") : chalk.red.inverse("Invalid"));


// Own web server && API call
const http = require("http");
const server = http.createServer((request, response) => {
    const fs = require("fs");
    const data = fs.readFileSync(`${__dirname}/jsonAPI.json`, "utf-8");
    const data2 = JSON.parse(data);
    if(request.url == '/')
        response.end("response from home page");
    else if(request.url == '/about')
        response.end("Response from about side");
    else if(request.url == '/userapi') {
        response.writeHead(200, {"Content-type" : "application/json"});
        response.write(data2.meals[0].idMeal);
        response.end(data);
    }
    else{
        response.writeHead(404, {"Content-type" : "text/html"});
        response.end("<h1> error 404 :: page doesn't exist..</h1>");
    }
    console.log(request.url);
});
server.listen(8000, "127.0.0.1", () => {
    console.log("listening  o server...");
});


// Events module
const EventEmitter = require("events");
const event = new EventEmitter();
event.on("checkPage", (sc, msg) => {
    console.log(`status code is ${sc} and the page is ${msg}`);
});
event.emit("checkPage", 200, "ok");


// Streaming
const http = require("http");
const server2 = http.createServer();
server2.on("request", (req, res) => {
    const fs = require("fs");
    // for(let i = 0; i < 4000; i++)
    //     fs.appendFile("readwrite.txt", "I am Ok write down", (err) => {});
    // fs.readFile("readwrite.txt", "utf-8", (err, data) => {
    //     if(err)
    //         return console.error(err);
    //     res.end(data);
    // });

    const rstream = fs.createReadStream("readwrite.txt");
    rstream.on('data', (chunkdata) => {
        res.write(chunkdata);
    });
    rstream.on('end', () => {
        res.end();
    });
    rstream.on('error', (err) => {
        console.log(err);
        res.end("<h1> Error Find!! </h2>");
    });
});
server2.listen(8000, "127.0.0.1");


// Express js
const express = require('express');
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World!')
});
app.get('/about', (req, res) => {
  res.write("<h1>Hi welcome</h1>");
  res.write("<p>go back to the main menu<p>");
  res.send();
});
app.get('/contact', (req, res) => {
  res.json(
    [
      {
        id : 12,
        name : "Animesh"
      },
      {
        id : 25,
        name : "Bag"
      }
    ]
  );
  // json convert any data to json and then send
})
app.get('/temp', (req, res) => {
  res.send(
    [
      {
        id : 12,
        name : "Animesh"
      },
      {
        id : 25,
        name : "Bag"
      }
    ]
  );
  // Send can only change object or array to json
})
app.get('*', (req, res) => {
    res.send("Error 404");
})

app.listen(8000, () => {
  console.log(`Example app listening on port 8000`);
});

// For static website we can use a builtin middleware
   app.use(express.static(staticPath));
// For any dynamic content we may add some express engines to content
// Such as pug, handlebars, ejs
// Partials