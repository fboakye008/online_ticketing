const paystack = (request) => {
  const MySecretKey = "Bearer sk_test_xxxx";

  const initializePayment = (form, mycallback) => {
    const options = {
      url: "https://api.paystack.co/transaction/initialize",
      headers: {
        authorization: MySecretKey,
        "content-type": "application/json",
        "cache-control": "no-cache",
      },
      form,
    };
    request.post(options, (error, response, body) => {
      mycallback(error, body);
    });
  };

  const verifyPayment = (ref, mycallback) => {
    const options = {
      url:
        "https://api.paystack.co/transaction/verify/" + encodeURIComponent(ref),
      headers: {
        authorization: MySecretKey,
        "content-type": "application/json",
        "cache-control": "no-cache",
      },
    };
    request(options, (error, response, body) => {
      mycallback(error, body);
    });
  };
  return { initializePayment, verifyPayment };
};
