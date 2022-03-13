JavaScript:
const clientBuilder = require('./config');
const clientBuilder = require('./config');

let clientArray = []

const configsArray = [{

login: "login",
password: "pass",
sharedSecret: {"9/26B9Whlbb88Ph0kW2mSq/3Dg0="}
games: [
570, // Dota 2
]
}]


console.log('Bot number: ' + configsArray.length);

for (let config of configsArray) {

let client = clientBuilder.execute(config);
client.doLogin();
clientArray.push(client);
}
console.log('Running ' + configsArray.length + ' bots.');
