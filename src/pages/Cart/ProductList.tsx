import { useContext } from "react";
import Cartnavbar from "../../components/Cartnavbar";
import { CartContext } from "../../contexts/CartContext";
import { productData } from "../../assets/data";
import style from "../../styles/cart.module.css";
function ProductList() {
  const contextData = useContext<any>(CartContext);

  return (
    <>
      <Cartnavbar></Cartnavbar>
      <ul className={style.ul_list}>
        {productData.map((x: any) => (
          <li key={x.id}>
            <img
              className={style.cart_img}
              src={require("../../assets/IPhone.jfif")}
              alt="img"
            />
            <div className={style.details}>
              <label htmlFor="name">Name: </label>
              <label htmlFor="name">{x.name}</label>
            </div>
            <div className={style.details}>
              <label htmlFor="price">Price: </label>
              <label htmlFor="price">{x.price}</label>
            </div>
            <div className={style.details}>
              <label htmlFor="color">Color: </label>
              <label htmlFor="color">{x.color}</label>
            </div>
            <div className={style.buttons}>
              <button className="btn btn-primary">BUY</button>
              {contextData.cartData.find((item: any) => item.id === x.id) ? (
                <button
                  className="btn btn-warning"
                  onClick={() => contextData.removeFromCart(x)}
                >
                  REMOVE
                </button>
              ) : (
                <button
                  className="btn btn-secondary"
                  onClick={() => contextData.addToCart(x)}
                >
                  ADD TO CART
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ProductList;
