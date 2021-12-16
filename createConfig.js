const fs = require(`fs`);
const randomstring = require("randomstring");


let list = [
    "private",
	"private"
];


let config = [];
let keys = [];
for (let i = 0; i < list.length; i++) {
    let url = "http://nodeurl:80"
    let api_key = randomstring.generate({
        length: 12,
        charset: 'alphabetic'
    });
    keys.push(api_key)
    config.push({
        api_key: api_key,
        private_key: list[i],
        node: url
    })
}
console.log(keys);

fs.writeFileSync("./config.json", JSON.stringify(config));
fs.writeFileSync("./keys.json", JSON.stringify(keys));
