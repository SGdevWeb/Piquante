const http = require('http');

const server = http.createServer((req, res) => {
    res.end(' Requête envoyée !')
});

server.listen(3000, () => {
    console.log(' listening on port 3000 ...')
});
