import { config } from "dotenv";
import { Telegraf } from "telegraf";

config();

const botToken = process.env.BOT_TOKEN;
if (!botToken) {
  throw new Error("Token not found");
}

const bot = new Telegraf(botToken);

bot.start(async (ctx) => {
  console.log("Get command /start from user:", ctx.from?.username);
  await ctx.reply(JSON.stringify(ctx.update, null, 2));
});

bot.launch()
  .then(() => console.log("Bot started"))
  .catch((err) => console.error("Error starting bot:", err));

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));