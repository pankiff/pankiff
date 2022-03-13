JavaScript:
const clientBuilder = require('./config');
const clientBuilder = require('./config');

let clientArray = []

const configsArray = [{

login: "login",
password: "pass",
sharedSecret: {"shared_secret":"9/26B9Whlbb88Ph0kW2mSq/3Dg0=","serial_number":"11979444782326652297","revocation_code":"R94901","uri":"otpauth://totp/Steam:vovamailme?secret=6763UB6VUGK3N7HQ7B2JC3NGJKX7ODQN&issuer=Steam","server_time":1647174856,"account_name":"vovamailme","token_gid":"523a053064a6e299","identity_secret":"1FBmKc0oHrzKH39JaCeRDGDAptU=","secret_1":"ZvwynTOUs1oCF40tt5/TrbCXruA=","status":1,"device_id":"android:82b6d48e-ba73-4434-b1f7-896ab4d85708","fully_enrolled":true,"Session":{"SessionID":"a22435ec766893fdc9866576","SteamLogin":"76561198193113047%7C%7CB9586017361694E01BB5A458B1F99CBBCF34F066","SteamLoginSecure":"76561198193113047%7C%7C93580FE29B80162A128BAA19A37D812E2C27FFF3","WebCookie":"31FF3D4CB41B102E84F23E7B040A09FEDFF2F19E","OAuthToken":"31b4a0ead690914ce9984046e50dff13","SteamID":76561198193113047}}
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
