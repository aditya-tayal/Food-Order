import { useState } from "react";

import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";

function App() {

  const [cartIsShown, setCartIsShowm] = useState(false);

  const showCartHandler = () => {
    setCartIsShowm(true);
  }
  const hideCartHandler = () => {
    setCartIsShowm(false);
  }
  const orderCartHandler = () => {
    setCartIsShowm(false);
    console.log("Ordered!");
  }


  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} onOrder={orderCartHandler}/>}
      <Header onShowCart={showCartHandler}/>
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
