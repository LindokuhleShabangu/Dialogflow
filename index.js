const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.post("/webhook", (req, res) => {
  const intentName = req.body.queryResult.intent.displayName;
  const parameters = req.body.queryResult.parameters;

  if (intentName === "GetProductInfo") {
    const productName = parameters.product;
    // Here you would handle the logic to fetch product info from Salesforce or other sources
    const productInfo = `The price of ${productName} is $99.`; // Example response

    res.json({
      fulfillmentText: productInfo,
    });
  } else {
    res.json({
      fulfillmentText: `I don't know how to handle the intent ${intentName}.`,
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
