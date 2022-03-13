JavaScript:
const SteamUser = require('steam-user');
const SteamTotp = require('steam-totp');

let newClient = {};

newClient.execute = function (config) {

let client = new SteamUser({


promptSteamGuardCode: false,
dataDirectory: "./sentry",
singleSentryfile: false
});

client.login = config.login;
client.password = config.password;
client.sharedSecret = config.sharedSecret;
client.games = config.games;
client.messageReceived = {};

client.on('loggedOn', function (details) {
console.log("[" + this.login + "] Logged into Steam as " + client.steamID.getSteam3RenderedID());
client.setPersona(SteamUser.EPersonaState.Snooze); 7
client.gamesPlayed(this.games);
});


client.on('error', function (err) {
console.log("[" + this.login + "] " + err);
setTimeout(function () { client.doLogin(); }, 30 * 60 * 1000);
});

client.doLogin = function () {
this.logOn({
"accountName": this.login,
"password": this.password });
}

client.on('steamGuard', function (domain, callback) {
if (!this.sharedSecret) {

console.log("Seems like you forgot about SharedSecret. Terminating the process...");
return;
}
else {
var authCode = SteamTotp.generateAuthCode(this.sharedSecret);
console.log("[" + this.login + "] Generated Auth Code: " + authCode);
callback(authCode);
}

});

client.on("friendMessage", function (steamID, message) {
console.log("[" + this.login + "] Message from " + steamID + ": " + message);
if (!this.messageReceived[steamID]) {


client.chatMessage(steamID, "[Automated Response] I am idling. DM me in Discord or VK.");
this.messageReceived[steamID] = false;
}
});


client.on('vacBans', function (numBans, appids) {
if (numBans > 0) {

console.log("[" + this.login + "] " + numBans + " VAC ban" + (numBans == 1 ? '' : 's') + "." +
(appids.length == 0 ? '' : " In apps: " + appids.join(', ')));
}
});

client.on('accountLimitations', function (limited, communityBanned, locked, canInviteFriends) {
var limitations = [];

if (limited) {
limitations.push('LIMITED');
}

if (communityBanned) {
limitations.push('COMMUNITY BANNED');
}

if (locked) {
limitations.push('LOCKED');
}

if (limitations.length !== 0) {
console.log("[" + this.login + "] Limitations: " + limitations.join(', ') + ".");
}
});

return client;
}

module.exports = newClient;
