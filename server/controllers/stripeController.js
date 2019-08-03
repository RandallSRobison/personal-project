const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = {
  pay(req, res) {
    let {
      token: { id },
      amount
    } = req.body;
    amount *= 100;
    stripe.charges.create(
      {
        amount: amount,
        currency: "usd",
        source: id,
        description: "test charge"
      },
      (err, charge) => {
        if (err) {
          return res.status(500).send(err);
        } else {
          return res.status(200).send(charge);
        }
      }
    );
  }
};
