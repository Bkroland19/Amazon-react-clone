import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";

//then here we can destructure props = {products}
export default function Home({ products }) {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon By Roland</title>
      </Head>
      {/* --This is the header component- */}

      <Header />

      <main className="max-w-screen-2xl mx-auto">
        {/* ----Banner ---- */}
        <Banner />

        {/* ----Products feed ---- */}
        <ProductFeed products={products} />
      </main>

      {/* ---- ---- */}
    </div>
  );
}

export async function getServerSideProps(context) {
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );

  return {
    props: {
      products,
    },
  };
}

//https://fakestoreapi.com/products
// const data = JSON.parse(JSON.stringify(request))

// export async function getServerSideProps(context) {
//   const products = await fetch("https://fakestoreapi.com/products").then(
//     (res) => res.json
//   );

//   return {
//     props: {
//       products,
//     },
//   };
// }
