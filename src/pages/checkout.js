import { useSession } from "next-auth/client";
import Image from "next/image";
import { useSelector } from "react-redux";
import CheckoutProduct from "../components/CheckoutProduct";
import Header from "../components/Header";
import { selectItems, selectTotal } from "../slices/basketSlice";
import Currency from "react-currency-formatter";

function Checkout() {
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);

  const [session] = useSession();
  return (
    <div className="bg-gray-100">
      <Header />
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
              title={item.title}
              description={item.description}
              category={item.category}
              hasPrime={item.hasPrime}
              image={item.image}
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
              disabled={!session}
              className={`mt-2 text-xs md:text-sm  bg-gradient-to-b from-yellow-200 to-bg-yellow-400 border border-yellow-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 active:from-yellow-500 ${
                !session &&
                "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
              }`}
            >
              {!session ? "sign in to checkout" : "proceed to checkout"}
            </button>
          </>
        )}
      </div>

      <main className="lg:flex max-w-screen-2xl mx-auto"></main>
    </div>
  );
}

export default Checkout;
