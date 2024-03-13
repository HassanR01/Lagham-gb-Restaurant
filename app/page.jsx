import ItemsList from "./components/menu/itemsList";
import burgerIcon from '../public/burger.png'
import offerIcon from '../public/offer.png'
import mealIcon from '../public/meal.png'
import sandwichIcon from '../public/sandwich.png'
import friesIcon from '../public/fries.png'
import Image from "next/image";

export default function Menu() {
  return (
    <>
      <section id="Menu">
        <h1 className="title text-4xl font-bold mb-10 text-gray-50">Check Our Tasty Menu</h1>
        <div className="menuList w-full flex flex-col items-center justify-center">
          <nav className="w-full flex justify-center items-center">
            <ul className="w-full flex justify-around items-center px-4 py-4">
              <li data-category="smash_burger"><Image src={burgerIcon} width={60} height={60} alt="burger Icon" /> Smash Burger</li>
              <li data-category="extras"><Image src={offerIcon} width={60} height={60} alt="Offer Icon" />Offers</li>
              <li data-category="meals"><Image src={mealIcon} width={60} height={60} alt="Meal Icon" />Meals</li>
              <li data-category="chichen_sandwiches"><Image src={sandwichIcon} width={60} height={60} alt="sandwich Icon" />Chicken Sandwiches</li>
              <li data-category="fries"><Image src={friesIcon} width={60} height={60} alt="Fries Icon" />French Fries</li>
            </ul>
          </nav>
          <div className="items m-10 w-full flex flex-wrap items-center justify-center">
            <ItemsList />
          </div>
        </div>
      </section>
    </>
  );
}
