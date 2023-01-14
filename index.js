const fs = require("fs");
const qrcode = require("qrcode-terminal");
const { Client } = require("whatsapp-web.js");
const { MessageMedia } = require('whatsapp-web.js');

// Path where the session data will be stored
const SESSION_FILE_PATH = "./session.json";
// Environment variables
const country_code = "51";
const number = "934369928";
const msg = "Hola, soy un bot de Whatsapp Web";

// Web scraping
const request = require('request-promise');
const cheerio = require('cheerio');
const { contents } = require("cheerio/lib/api/traversing");

// Load the session data if it has been previously saved
let sessionData;
if (fs.existsSync(SESSION_FILE_PATH)) {
    sessionData = require(SESSION_FILE_PATH);
}

const client = new Client({
    session: sessionData,
});

client.initialize();

client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
});

// Save session values to the file upon successful auth
client.on("authenticated", (session) => {
    sessionData = session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
        if (err) {
            console.error(err);
        }
    });
});

client.on("auth_failure", msg => {
    // Fired if session restore was unsuccessfull
    console.error('AUTHENTICATION FAILURE', msg);
})


client.on("ready", () => {
    console.log("Client is ready!");

    setTimeout(() => {
      let chatId = `${country_code}${number}@c.us`;
        client.sendMessage(chatId, msg).then((response) => {
            if (response.id.fromMe) {
                console.log("It works!");
            }
        })
    }, 5000);
});

// Enviar mensaje

client.on('message', message => {
	if(message.body === '!ping') {
		message.reply('pong');
	}
});


