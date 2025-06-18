import { Context, Markup, Telegraf } from "telegraf";
import { getCoinSide } from "../../utils";

const coinInlineKeyboard = Markup.inlineKeyboard([
  Markup.button.callback("Подбросить еще раз", "flip_a_coin"),
]);

const handleCoinCommand = (ctx: Context) => {
  ctx.reply(getCoinSide(), coinInlineKeyboard);
};

const handleCoinAction = async (ctx: Context) => {
  if ("editMessageText" in ctx) {
    await ctx.editMessageText(
      `${getCoinSide()}\nОтредактировано: ${new Date().toISOString()}`,
      coinInlineKeyboard
    );
  }
};

export const registerCoinHandlers = (bot: Telegraf<Context>) => {
  bot.hears("Подбросить монетку", handleCoinCommand);
  bot.action("flip_a_coin", handleCoinAction);
};