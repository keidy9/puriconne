const { Client, IntentsBitField } = require("discord.js");
const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("ready", (c) => {
  console.log(`${c.user.tag} is online.`);
});

client.on("messageCreate", (message) => {
  if (message.author.bot) {
    return;
  }

  if (message.content === "hello") {
    message.reply("Hey!");
  }
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  // if (interaction.commandName === "add") {
  //   const num1 = interaction.options.get("first-number")?.value;
  //   const num2 = interaction.options.get("second-number")?.value;
  //   interaction.reply(`The sum is ${num1 + num2}`);
  // }

  if (interaction.commandName === "ovf-tl") {
    const ovfTime = interaction.options.get("ovf-time-in-seconds")?.value;
    const tl = interaction.options.get("tl")?.value;
    let returnedTl = "";
    const ovfDiff = 90 - Number(ovfTime);

    for (let i = 0; i < tl.length - 1; i++) {
      // FOR TL FORMAT "00:00"
      if (tl[i] === "0" && tl[i + 2] === ":") {
        if (i !== 0) {
          returnedTl += "\n";
        }
        if (tl[i + 1] === "1") {
          const seconds = Number(tl[i + 3] + tl[i + 4]) + 60;
          const remainingSeconds = seconds - ovfDiff;
          if (remainingSeconds >= 70) {
            returnedTl +=
              "0" + tl[i + 1] + tl[i + 2] + `${remainingSeconds - 60}`;
          } else if (remainingSeconds < 70 && remainingSeconds >= 60) {
            returnedTl +=
              "0" + tl[i + 1] + tl[i + 2] + "0" + `${remainingSeconds - 60}`;
          } else if (remainingSeconds < 60 && remainingSeconds >= 10) {
            returnedTl += "00" + tl[i + 2] + `${remainingSeconds}`;
          } else if (
            remainingSeconds < 60 &&
            remainingSeconds < 10 &&
            remainingSeconds > 0
          ) {
            returnedTl += "00" + tl[i + 2] + "0" + `${remainingSeconds}`;
          } else {
            returnedTl += "XX:XX";
          }
          i += 5;
        } else {
          const seconds = Number(tl[i + 3] + tl[i + 4]);
          const remainingSeconds = seconds - ovfDiff;
          if (remainingSeconds >= 10) {
            console.log(remainingSeconds);
            returnedTl += "0" + tl[i + 1] + tl[i + 2] + `${remainingSeconds}`;
          } else if (remainingSeconds < 10 && remainingSeconds > 0) {
            returnedTl +=
              "0" + tl[i + 1] + tl[i + 2] + "0" + `${remainingSeconds}`;
          } else {
            returnedTl += "XX:XX";
          }
          i += 5;
        }
      }
      // FOR TL FORMAT "0:00"
      if (tl[i] === "0" || (tl[i] === "1" && tl[i + 1] === ":")) {
        if (i !== 0) {
          returnedTl += "\n";
        }
        if (tl[i] === "1") {
          const seconds = Number(tl[i + 2] + tl[i + 3]) + 60;
          const remainingSeconds = seconds - ovfDiff;
          if (remainingSeconds >= 70) {
            returnedTl += tl[i] + tl[i + 1] + `${remainingSeconds - 60}`;
          } else if (remainingSeconds < 70 && remainingSeconds >= 60) {
            returnedTl += tl[i] + tl[i + 1] + "0" + `${remainingSeconds - 60}`;
          } else if (remainingSeconds < 60 && remainingSeconds >= 10) {
            returnedTl += "0" + tl[i + 1] + `${remainingSeconds}`;
          } else if (
            remainingSeconds < 60 &&
            remainingSeconds < 10 &&
            remainingSeconds > 0
          ) {
            returnedTl += "0" + tl[i + 1] + "0" + `${remainingSeconds}`;
          } else {
            returnedTl += "X:XX";
          }
          i += 3;
        } else {
          const seconds = Number(tl[i + 2] + tl[i + 3]);
          const remainingSeconds = seconds - ovfDiff;
          if (remainingSeconds >= 10) {
            returnedTl += tl[i] + tl[i + 1] + `${remainingSeconds}`;
          } else if (remainingSeconds < 10 && remainingSeconds > 0) {
            returnedTl += tl[i] + tl[i + 1] + "0" + `${remainingSeconds}`;
          } else {
            returnedTl += "X:XX";
          }
          i += 3;
        }
      } else {
        returnedTl += tl[i];
      }
    }
    returnedTl += tl[tl.length - 1];

    interaction.reply(returnedTl);
    return;
  }
});

client.login(process.env.DISCORD_TOKEN);

const port = 8080;
app.get("/", (req, res) => {
  res.send("Hello.");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
