import { useState, useEffect, useMemo } from "react";
import { db } from "../data/db";

export const useCart = () => {
  const initialCart = () => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };

  const [data] = useState(db);
  const [cart, setCart] = useState(initialCart);

  // const MAX_ITEM = 0  // ACA IRIA LA CANTIDAD QUE TENGA EN STOCK
  const MIN_ITEM = 1;

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

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
    setCart([]);
  }

  // STATE DERIVADO
  const isEmpty = useMemo(() => cart.length === 0, [cart]);
  const cartTotal = useMemo(() =>
    cart.reduce((total, item) => total + (item.quantity * item.price), 0, [cart])
  );

  return {
    data,
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    isEmpty,
    cartTotal
  };
};
