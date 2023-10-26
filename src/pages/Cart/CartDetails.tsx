import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import style from "../../styles/cart.module.css";
import Cartnavbar from "../../components/Cartnavbar";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

function CartDetails() {
  const contextData = useContext<any>(CartContext);
  const navigate = useNavigate();

  return (
    <>
      <Cartnavbar></Cartnavbar>
      <div
        className={style.back_icon}
        onClick={() => navigate("/React_learn/products")}
      >
        <FontAwesomeIcon icon={faArrowLeft} size="2xl" />
      </div>

      <div className={style.cart_details_main}>
        {contextData.cartData.length ? (
          <ul>
            {contextData.cartData.map((item: any) => (
              <li key={item.id}>
                <span>{item.name}</span>
                <span>{item.color}</span>
                <span>${item.price}</span>
                <span>{item.quantity}</span>
                <button
                  onClick={() => contextData.removeFromCart(item)}
                  className="btn btn-danger"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <h2>Your Cart Is Empty</h2>
        )}
      </div>
    </>
  );
}

export default CartDetails;
