JavaScript:
const SteamUser = require('steam-user');
const SteamTotp = require('steam-totp');

let newClient = {};

newClient.execute = function (config) {

let client = new SteamUser({

// Никакого SteamGuard, как я и говорил
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
client.setPersona(SteamUser.EPersonaState.Snooze); // Set steam status [25-34 for all possible variants]
client.gamesPlayed(this.games);
});
/* Value-to-name mapping for convenience
"0": "Offline",
"1": "Online",
"2": "Busy",
"3": "Away",
"4": "Snooze",
"5": "LookingToTrade",
"6": "LookingToPlay",
"7": "Invisible",
*/


client.on('error', function (err) {
console.log("[" + this.login + "] " + err);
setTimeout(function () { client.doLogin(); }, 30 * 60 * 1000);
// Время в ms, в течение которого бот будет афк. 1000 ms. * 60 sec. * 30 min. = 18000000 ms. = 30 min. Меняем первое значение, если хотим изменить минуты.
});

client.doLogin = function () {
this.logOn({
"accountName": this.login,
"password": this.password });
}

client.on('steamGuard', function (domain, callback) {
if (!this.sharedSecret) {

// Никаких запросов SteamGuard, нам это не подходит. Полная автоматика.
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

// Мягко посылаем нашего другана, у нас тут часы крутятся в конце-то концов. Пусть напишет в другой чат.
client.chatMessage(steamID, "[Automated Response] I am idling. DM me in Discord or VK.");
this.messageReceived[steamID] = true;
}
});


client.on('vacBans', function (numBans, appids) {
if (numBans > 0) {

// Показывает баны аккаунта, если есть. Спасибо тернарному "?" за сокращение строк.
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
