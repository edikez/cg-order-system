const { Resend } = require("resend");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed"
    };
  }

  try {
    const data = JSON.parse(event.body);

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "edikez@gmail.com",
      subject: "Yeni Sipariş 🚀",
      html: `
        <h2>Yeni Sipariş Geldi</h2>
        <p><strong>İsim:</strong> ${data.name}</p>
        <p><strong>Ürün:</strong> ${data.product}</p>
        <p><strong>Fiyat:</strong> ${data.price}</p>
      `
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Sipariş alındı ve email gönderildi ✅"
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
