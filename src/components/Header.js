import { signIn, signOut, useSession } from "next-auth/client";
import { selectItems } from "../slices/basketSlice";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import { useSelector } from "react-redux";

function Header() {
  const [session] = useSession();
  const router = useRouter();
  const items = useSelector(selectItems);

  return (
    <header>
      {/**top nav */}
      <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
          <Image
            onClick={() => router.push("/")}
            src="https://greatescapepublishing.com/reports/images/bigstock.png"
            width="150"
            height="40"
            objectFit="contain"
            className="cursor-pointer"
          />
        </div>
        {/**Search bar  */}
        <div className="hidden sm:flex items-center  h-10 rounded-md flex-grow cursor-pointer  bg-yellow-400 hover:bg-yellow-600">
          <input
            type="text"
            className="h-full p-2 w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4"
          />
          <SearchIcon className="h-12 p-4" />
        </div>
        {/**Right section */}
        <div className="text-white flex items-center text-xs space-x-5 mx-6 whitespace-nowrap">
          <div
            className="cursor-pointer hover:underline"
            onClick={!session ? signIn : signOut}
          >
            {/**={!session ? signIn : signOut}
          >    if no session i wanna sign in and if there is session i wanna sihnout */}
            <p className="font-extrabold md:text-sm">
              {/**if there is a session  lets get the user name otherwise sign in */}
              {session ? `Hello ,${session.user.name}` : signIn}
            </p>
            <p className="font-extrabold md:text-sm">Account & Lists</p>
          </div>
          <div className="cursor-pointer hover:underline">
            <p className="font-extrabold md:text-sm">Returns</p>
            <p className="font-extrabold md:text-sm">& Orders</p>
          </div>
          <div
            onClick={() => router.push("/checkout")}
            className=" relative flex items-center cursor-pointer hover:underline"
          >
            <span className="absolute top-0 right-0 text-black bg-yellow-400 rounded-full h-4 w-4  text-center font-extrabold">
              {items.length}
            </span>
            <ShoppingCartIcon className="h-10" />
            <p className="font-extrabold md:text-sm">Basket</p>
          </div>
        </div>
      </div>
      {/**below  nav */}
      <div className="flex items-center bg-amazon_blue-light text-white text-sm space-x-3 p-2 pl-6  ">
        <p className="font-extrabold md:text-sm flex items-center">
          <MenuIcon className="h-6 mr-1" />
          All
        </p>
        <p className="font-extrabold md:text-sm items-center ">Prime videos</p>
        <p className="font-extrabold md:text-sm items-center ">
          Bkroland Bussiness
        </p>
        <p className="font-extrabold md:text-sm items-center ">Today's Deals</p>
        <p className="hidden lg:inline-flex font-extrabold md:text-sm items-center ">
          Electronics
        </p>
        <p className="hidden lg:inline-flex font-extrabold md:text-sm items-center ">
          Food & Grocery
        </p>
        <p className="hidden lg:inline-flex font-extrabold md:text-sm items-center ">
          Prime
        </p>
        <p className="hidden lg:inline-flex font-extrabold md:text-sm items-center ">
          Buy Again
        </p>
        <p className="hidden lg:inline-flex font-extrabold md:text-sm items-center ">
          Shopper Toolkit
        </p>
        <p className="hidden lg:inline-flex font-extrabold md:text-sm items-center ">
          Health & Personal care
        </p>
      </div>
    </header>
  );
}

export default Header;
