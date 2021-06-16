import { MinusSmIcon, PlusIcon, StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  removeGroupedFromBasket,
  selectTotal,
} from "../slices/basketSlice";
function CheckoutProduct({
  id,
  price,
  title,
  rating,
  description,
  image,
  category,
  hasPrime,
  quantity,
  total,
}) {
  const dispatch = useDispatch();
  const addItemToBasket = () => {
    const product = {
      id,
      price,
      title,
      rating,
      description,
      image,
      category,
      hasPrime,
      quantity,
      total,
      quantity,
    };
    //push item into the redux store
    dispatch(addToBasket(product));
  };

  const removeItemFromBasket = () => {
    dispatch(removeFromBasket({ id }));
  };

  const removeGroupFromBasket = () => {
    dispatch(removeGroupedFromBasket({ id }));
  };
  return (
    <div className="grid grid-cols-5">
      <Image src={image} height={200} width={200} objectFit="contain" />

      {/**Middle section */}
      <div className="col-span-3 mx-5 ">
        <p>{title}</p>
        <div className="flex">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon className="h-5 text-yellow-400" />
            ))}
        </div>
        <p className="text-xs my-2 line-clamp-3">{description}</p>
        <Currency quantity={price} currency="USD" />
        {hasPrime && (
          <div className="flex flex-col  items-center space-x-4 -mt-5">
            <img
              loading="lazy"
              className="w-12"
              src="https://links.papareact.com/fdw"
              alt=""
            />
            <p className="text-xs text-gray-500">Free Next-day Delivery</p>
          </div>
        )}
      </div>

      <div className="flex flex-col space-y-2 my-auto justify-self-end">
        <div className="flex justify-between xs:justify-start">
          <button className="button sm:p-1" onClick={removeItemFromBasket}>
            <MinusSmIcon className="h-5 text-black" />
          </button>
          <div className="p-2 whitespace-normal sm:p-1 sm:whitespace-nowrap">
            Quantity: <span className="font-bold">{quantity}</span>
          </div>
          <button className="button sm:p-1" onClick={addItemToBasket}>
            <PlusIcon className="h-5 text-black" />
          </button>
        </div>

        <button className="button" onClick={removeGroupFromBasket}>
          Remove from Basket
        </button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
