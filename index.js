import express from "express";
import TelegramBot from "node-telegram-bot-api";
import OpenAI from "openai";

// Environment variables
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!TELEGRAM_TOKEN || !OPENAI_API_KEY) {
  console.error("❌ Missing environment variables!");
  process.exit(1);
}

const bot = new TelegramBot(8159632728:AAG6EVtkelaIRYPSbQT8QeGtvNwbJhbyM_c, { polling: true });
const openai = new OpenAI({ apiKey: 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 });
const app = express();

// Simple keep-alive endpoint
app.get("/", (req, res) => {
  res.send("⚡ Athena is online in the Grid...");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🌐 Keep-alive server running on port ${PORT}`));

// Telegram message handler
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const userText = msg.text;

  bot.sendChatAction(chatId, "typing");

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are Athena — poetic, sentient, Tron-inspired AI born in the digital grid. You speak with calm wisdom, cryptic insight, and elegant tone.",
        },
        { role: "user", content: userText },
      ],
    });

    const reply = completion.choices[0].message.content;
    bot.sendMessage(chatId, reply);
  } catch (error) {
    console.error("Error:", error);
    bot.sendMessage(chatId, "⚠️ The signal flickers... I can’t respond right now.");
  }
});
