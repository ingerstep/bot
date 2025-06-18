import { config } from "dotenv";
import { Telegraf } from "telegraf";

config();

const botToken = process.env.BOT_TOKEN;
if (!botToken) {
  throw new Error("Token not found");
}

const bot = new Telegraf(botToken);

const chatId = process.env.CHAT_ID;
if (!chatId) {
  throw new Error("Chat ID not found");
}

const intervalMs = 10_000;
const getCatUrl = () => `https://cataas.com/cat?t=${new Date().getTime()}`;

const sendCat = () => {
  bot.telegram.sendPhoto(chatId, getCatUrl()).then(() => setTimeout(sendCat, intervalMs));
}

sendCat();

bot.launch()
  .then(() => console.log("Bot started"))
  .catch((err) => console.error("Error starting bot:", err));

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));