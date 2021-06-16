module.exports = {
  images: {
    domains: [
      "greatescapepublishing.com",
      "links.papareact.com",
      "fakestoreapi.com",
    ],
  },

  env: {
    stripe_public_key: `${process.env.STRIPE_PUBLIC_KEY}`,
  },
};
