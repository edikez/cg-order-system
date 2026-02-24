exports.handler = async function(event) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Backend çalışıyor 🚀"
    })
  };
};
