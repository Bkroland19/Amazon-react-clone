import Product from "./Product";

function ProductFeed({ products }) {
  return (
    <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto">
      {products
        .slice(0, 4)
        .map(({ id, price, title, description, image, category }) => (
          <Product
            key={id}
            id={id}
            price={price}
            title={title}
            description={description}
            image={image}
            category={category}
          />
        ))}

      <img
        className="md:col-span-full"
        src="https://links.papareact.com/dyz"
        alt=""
      />

      <div className="md:col-span-2">
        {products
          .slice(4, 5)
          .map(({ id, price, title, description, image, category }) => (
            <Product
              key={id}
              id={id}
              price={price}
              title={title}
              description={description}
              image={image}
              category={category}
            />
          ))}
      </div>

      {products
        .slice(5, products.length - 1)
        .map(({ id, price, title, description, image, category }) => (
          <Product
            key={id}
            id={id}
            price={price}
            title={title}
            description={description}
            image={image}
            category={category}
          />
        ))}

      <div className="md:col-span-full">
        {products
          .slice(products.length - 1)
          .map(({ id, price, title, description, image, category }) => (
            <Product
              key={id}
              id={id}
              price={price}
              title={title}
              description={description}
              image={image}
              category={category}
            />
          ))}
      </div>
    </div>
  );
}

export default ProductFeed;
