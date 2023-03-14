const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");
const dotenv = require("dotenv");

dotenv.config();

const commands = [
  {
    name: "add",
    description: "Adds two numbers.",
    options: [
      {
        name: "first-number",
        description: "The first number.",
        type: ApplicationCommandOptionType.Number,
        choices: [
          {
            name: "one",
            value: 1,
          },
          {
            name: "two",
            value: 2,
          },
          {
            name: "three",
            value: 3,
          },
        ],
        required: true,
      },
      {
        name: "second-number",
        description: "The second number.",
        type: ApplicationCommandOptionType.Number,
        required: true,
      },
    ],
  },
  {
    name: "ovf-tl",
    description: "Calculates overflow TL.",
    options: [
      {
        name: "ovf-time-in-seconds",
        description: "Total overflow time left, in seconds.",
        type: ApplicationCommandOptionType.Number,
        required: true,
      },
      {
        name: "tl",
        description: "copy-paste the TL.",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log("Registering slash commands...");

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log("Slash commands were registered successfully");
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }
})();
