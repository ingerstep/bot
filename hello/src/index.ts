import { config } from "dotenv";
import { Telegraf } from "telegraf";
import { Message } from 'telegraf/typings/core/types/typegram';

config();

const botToken = process.env.BOT_TOKEN;
if (!botToken) {
  throw new Error("Token not found");
}

const bot = new Telegraf(botToken);

type GreetingKey = "привет" | "hello" | "hola";

const greeting = {
  "привет": "Привет!",
  "hello": "Hello!",
  "hola": "Hola!",
} satisfies Record<GreetingKey, string>;

bot.command("help", (ctx) => {
  ctx.reply(`
    Бот может здороваться на разных языках.
    Список поддерживаемых приветствий:
    - привет - русский
    - hello - английский
    - hola - испанский
    `)
})


bot.hears(["привет", "hello", "hola"], (ctx) => {
  const text = (ctx.message as Message.TextMessage).text;
  const firstWord = text.split(" ")[0] as GreetingKey;

  if (firstWord in greeting) {
    ctx.reply(greeting[firstWord]);
  }
})

bot.on("text", (ctx) => {
  ctx.reply(`Приветствие "${ctx.update.message.text}" не поддерживается`);
})

bot.launch()
  .then(() => console.log("Bot started"))
  .catch((err) => console.error("Error starting bot:", err));

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));