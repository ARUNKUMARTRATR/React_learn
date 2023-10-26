import { createContext, useCallback, useState } from "react";

export const CartContext = createContext({});

export const CartProvider = (props: any) => {
  const [cartData, setCartData] = useState<any[]>([]);
  const { children } = props;

  const addToCart = (item: any) => {
    const isItemExist = cartData.find((x: any) => x.id === item.id);
    if (isItemExist) {
      setCartData(
        cartData.map((cartItem: any) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartData([...cartData, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (item: any) => {
    const isItemInCart = cartData.find((cartItem) => cartItem.id === item.id);

    if (isItemInCart.quantity === 1) {
      setCartData(cartData.filter((cartItem) => cartItem.id !== item.id));
    } else {
      setCartData(
        cartData.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    }
  };

  const getCartCount = useCallback(() => {
    const countArray = cartData.map((x: any) => x.quantity);
    return countArray.reduce((prev, curr) => prev + curr, 0);
  }, [cartData]);

  return (
    <CartContext.Provider
      value={{
        cartData,
        addToCart,
        removeFromCart,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
