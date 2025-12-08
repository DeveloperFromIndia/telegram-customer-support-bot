
export async function createTarifConversation(
  conversation: any,
  ctx: any
) {
  // ===== ШАГ 1 — Цена =====
  await ctx.reply("Введите цену тарифа:");
  const priceMsg = await conversation.wait();
  const price = Number(priceMsg.message?.text);

  if (isNaN(price) || price < 0) {
    await ctx.reply("❌ Неверная цена. Попробуйте заново.");
    return;
  }

  // ===== ШАГ 2 — ID в CRM =====
  await ctx.reply("Введите ID тарифа в CRM:");
  const idMsg = await conversation.wait();
  const idInCRM = Number(idMsg.message?.text);

  if (isNaN(idInCRM)) {
    await ctx.reply("❌ ID должен быть числом.");
    return;
  }

  // ===== ШАГ 3 — Кол-во дней =====
  await ctx.reply("Введите количество дней:");
  const daysMsg = await conversation.wait();
  const days = Number(daysMsg.message?.text);

  if (isNaN(days) || days < 1) {
    await ctx.reply("❌ Количество дней должно быть больше 0.");
    return;
  }


  await ctx.reply(
    `✅ Тариф создан:\n\n` +
      `💰 Цена: ${price}\n` +
      `🆔 CRM ID: ${idInCRM}\n` +
      `📅 Дней: ${days}`
  );
}
