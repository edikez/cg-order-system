exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed"
    };
  }

  const data = JSON.parse(event.body);

  const order = {
    id: Date.now(),
    name: data.name,
    product: data.product,
    price: data.price
  };

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Sipariş alındı ✅",
      order
    })
  };
};
