const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);
    console.log(numCPUs);
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker) => {
        console.log(`Worker ${worker.process.pid} died`);
    });
} else {
    http.createServer((req, res) => {
        let start = Date.now();
        res.writeHead(200);
        res.end(`Hello from Worker ${process.pid}!`);
        let timeTaken = Date.now() - start;
        console.log(`Response from Worker ${process.pid} took ${timeTaken} ms.`);
    }).listen(8000);
}
