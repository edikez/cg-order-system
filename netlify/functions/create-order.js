exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed"
    };
  }

  try {
    const data = JSON.parse(event.body);

    const message = `
🛒 Yeni Sipariş!

İsim: ${data.name}
Ürün: ${data.product}
Fiyat: ${data.price}
`;

    const response = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: message
        })
      }
    );

    const telegramResult = await response.json();

    if (!telegramResult.ok) {
      throw new Error("Telegram mesaj gönderemedi");
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Sipariş Telegram'a gönderildi ✅"
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message
      })
    };
  }
};
