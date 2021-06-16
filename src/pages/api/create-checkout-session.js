const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
export default async (req, res) => {
  // how to access the variables emails and items
  //we apply destructuring on them

  const { email, items } = req.body;
  const transformedItems = items.map((item) => ({
    price_data: {
      currency: "usd",
      unit_amount: item.price * 3600,
      description: item.description,
      quantity: 1,
      product_data: {
        name: item.title,
        image: [item.image],
      },
    },
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_rates: ["shr_1J2pGwFh0jPEdXAn5GiqYJSe"], // Created fees in Stripe's dashboard
    shipping_address_collection: {
      allowed_countries: ["GB", "US", "CA", "FR"], // RTFM!
    },
    line_items: transformedItems,
    mode: "payment",
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/checkout`,
    metadata: {
      email,
      images: JSON.stringify(groupedImages),
    },
  });

  console.log("session created!", session.id);

  res.status(200).json({ id: session.id });
};
