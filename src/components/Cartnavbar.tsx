import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../styles/cart.module.css";
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
function Cartnavbar() {
  const contextData = useContext<any>(CartContext);
  const navigate = useNavigate();

  return (
    <div className={style.main_nav_sec}>
      <div className={style.heading}>MY CART</div>
      <div
        onClick={() => navigate("/React_learn/cartDetails")}
        className={style.icon_sec}
      >
        {contextData.getCartCount() ? (
          <span className={style.badge}>{contextData.getCartCount()}</span>
        ) : (
          ""
        )}

        <FontAwesomeIcon icon={faCartShopping} size="xl" />
      </div>
    </div>
  );
}

export default Cartnavbar;
