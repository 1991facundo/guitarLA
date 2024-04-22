// HOOKS
import { useState, useEffect } from "react";

// COMPONENTS
import Guitar from "./components/Guitar";
import Header from "./components/Header";
import { db } from "./data/db";

function App() {
  const [data, setData] = useState(db);
  const [cart, setCart] = useState([]);

  // const MAX_ITEM = 0  // ACA IRIA LA CANTIDAD QUE TENGA EN STOCK
  const MIN_ITEM = 1

  useEffect( () => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  function addToCart(item) {
    // console.log('Este es el item' , item)

    const itemExists = cart.findIndex((guitar) => guitar.id === item.id);

    // console.log('Este es el item exists', itemExists)
    if (itemExists >= 0) {
    //if (cart[itemExists].quantity >= MAX_ITEM)  return // ESTA LINEA CORTA LA CANT DE ITEMS DEPENDIENDO EL STOCK
      const updatedCart = [...cart];
      updatedCart[itemExists].quantity++;
      setCart(updatedCart);
    } else {
      item.quantity = 1;
      setCart([...cart, item]);
    }
  
  }

  function removeFromCart(id) {
    setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
  }

  // console.log(cart)

  function increaseQuantity(id) {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        // if (item.id === id && item.quantity < MAX_ITEM) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setCart(updatedCart);
  }

  function decreaseQuantity(id) {
    const updatedCart = cart.map((item) => {
      
        if (item.id === id && item.quantity > MIN_ITEM) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    setCart(updatedCart);
  }

  // ESTA FUNCION LA USARIA SI QUIERO QUE SE ELIMINE AL LLEGAR A 0
  // function decreaseQuantity(id) {
  //   const updatedCart = cart.map((item) => {
  //     if (item.id === id) {
  //       if (item.quantity > 1) {  
  //         return {
  //           ...item,
  //           quantity: item.quantity - 1
  //         };
  //       } else {
  //         return null; 
  //       }
  //     }
  //     return item;
  //   }).filter(item => item !== null); 
  
  //   setCart(updatedCart);
  // }

  function clearCart(e) {
    setCart([])
  }


  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar
              key={guitar.id}
              guitar={guitar}
              setCart={setCart}
              addToCart={addToCart}
            />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
