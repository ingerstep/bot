import { Context, Markup, Telegraf } from "telegraf";
import { getRandomNumber } from "../../utils";

export const numberInlineKeyboard = Markup.inlineKeyboard([
  Markup.button.callback("Сгенерировать новое", "random_number"),
]);

export const handleRandomNumberCommand = (ctx: Context) => {
  ctx.reply(getRandomNumber().toString(), numberInlineKeyboard);
};

export const handleRandomNumberAction = async (ctx: Context) => {
  if ("editMessageText" in ctx) {
    await ctx.editMessageText(
      `${getRandomNumber()}\nОтредактировано: ${new Date().toISOString()}`,
      numberInlineKeyboard
    );
  }
};

export const registerRandomNumberHandlers = (bot: Telegraf<Context>) => {
  bot.hears("Случайное число", handleRandomNumberCommand);
  bot.action("random_number", handleRandomNumberAction);
};