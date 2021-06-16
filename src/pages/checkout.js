import { useSession } from "next-auth/client";
import Image from "next/image";
import { useSelector } from "react-redux";
import CheckoutProduct from "../components/CheckoutProduct";
import Header from "../components/Header";
import { selectItems, selectTotal } from "../slices/basketSlice";
import Currency from "react-currency-formatter";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
//creating a stripe promise

const stripePromise = loadStripe(process.env.stripe_public_key);
function Checkout() {
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);

  const [session] = useSession();

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;

    // Call the backend to create a checkout session...
    const checkoutSession = await axios.post("/api/create-checkout-session", {
      items,
      email: session.user.email,
    });

    //redirect the user to checkout
    const result = await stripe.redirectToCheckout({
      //here we are passing in an object
      sessionId: checkoutSession.data.id,
    });

    if (result.error) {
      alert(result.error.message);
    }

    // After have created a session, redirect the user/customer to Stripe Checkout
    result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result.error) {
      alert(result.error.message); // @todo : Improve that!
    }
  };
  return (
    <div className="bg-gray-100">
      <Header />

      <main className="lg:flex max-w-screen-2xl mx-auto">
        {/** left hand side*/}
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            width={1020}
            height={260}
            objectFit="contain"
          />

          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {items.length === 0
                ? "Your Basket is empty"
                : "Your Shopping Basket "}
            </h1>
            {items.map((item, index) => (
              <CheckoutProduct
                key={index}
                id={item.id}
                price={item.price}
                title={item.title}
                description={item.description}
                category={item.category}
                hasPrime={item.hasPrime}
                image={item.image}
                total={item.total}
                quantity={item.quantity}
              />
            ))}
          </div>
        </div>

        {/** right hand side*/}
        <div className="flex flex-col bg-white p-10 shadow-md">
          {items.length >= 0 && (
            <>
              <h1 className="whitespace-nowrap">
                Subtotal({items.length})items:{" "}
                <span className="font-bold">
                  <Currency quantity={total} currency="USD" />
                </span>
              </h1>

              <button
                onClick={createCheckoutSession}
                role="link"
                className="button mt-2"
              >
                Proceed to checkout
              </button>

              <button
                onClick={createCheckoutSession}
                role="link"
                disabled={!session}
                className={`button mt-2 ${
                  !session &&
                  "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed hover:from-gray-300"
                }`}
              >
                {!session ? "Sign in to checkout" : "Proceed to checkout"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default Checkout;
