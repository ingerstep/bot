import { config } from "dotenv";
import { Markup, Telegraf } from "telegraf";
import { registerCoinHandlers, registerRandomNumberHandlers } from "./features";

export const initBot = () => {
  config();

  const botToken = process.env.BOT_TOKEN;
  if (!botToken) {
    throw new Error("Token not found");
  }

  const bot = new Telegraf(botToken);

  registerCoinHandlers(bot);
  registerRandomNumberHandlers(bot);

  bot.use(async (ctx) => {
    await ctx.reply("Что нужно сделать?", Markup.keyboard(['Подбросить монетку', 'Случайное число']).resize())
  })

  bot.launch()
    .then(() => console.log("Bot started"))
    .catch((err) => console.error("Error starting bot:", err));

  process.once("SIGINT", () => bot.stop("SIGINT"));
  process.once("SIGTERM", () => bot.stop("SIGTERM"));

}