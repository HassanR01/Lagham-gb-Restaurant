import ItemsList from "./components/menu/itemsList";

export default function Menu() {
  return (
    <>
      <section id="Menu">
        <h1 className="title text-4xl font-bold text-gray-50">Menu Page</h1>
        <div className="menuList w-full flex flex-col items-center justify-center">
          <nav className="w-full flex justify-center items-center">
            <ul className="w-full flex justify-around items-center px-4 py-4">
              <li data-category="">Burger</li>
              <li data-category="">Burger</li>
              <li data-category="">Burger</li>
              <li className="selected" data-category="">Burger</li>
              <li data-category="">Burger</li>
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
