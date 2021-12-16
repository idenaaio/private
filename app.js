const express = require('express');
const app = express();
const http = require('http').createServer(app);
const cors = require('cors');
const bodyParser = require('body-parser');


const port = 8080;
const algorithm = 'aes-256-ctr';

const configJson = require("./config.json")
const {encrypt} = require("./utils");

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));


app.get("/", async (req, res) => {
    res.sendStatus(200);
});

app.post("/", async (req, res) => {
    let key = req.body.key;
    let info;
    for (let i = 0; i < configJson.length; i++) {
        if (configJson[i].api_key === key) {
            info = configJson[i]
        }
    }
    res.send(info ? [info.node, encrypt(info.private_key, key)] : "Not Found");
});



http.listen(port, () => console.log(`Example app listening on port ${port}!`));

