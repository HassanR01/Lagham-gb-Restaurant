import ItemsList from "./components/menu/itemsList";

export default function Menu() {
  return (
    <>
      <section id="Menu">
        <h1 className="title text-4xl font-bold mb-10 text-gray-50">Check Our Tasty Menu</h1>
        <div className="menuList w-full flex flex-col items-center justify-center">
          <nav className="w-full flex justify-center items-center">
            <ul className="w-full flex justify-around items-center px-4 py-4">
              <li data-category="smash_burger">Smash Burger</li>
              <li data-category="extras">Extras</li>
              <li data-category="meals">Meals</li>
              <li data-category="chichen_sandwiches">Chicken Sandwiches</li>
              <li data-category="fries">Fries</li>
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
