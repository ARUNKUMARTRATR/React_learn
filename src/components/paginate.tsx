import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../pager.module.css";
import { useEffect, useState } from "react";

function Paginate(props: any) {
  const numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [activeNum, setActiveNum] = useState(1);
  useEffect(() => {
    if (props.emitButtonData) {
      props.emitButtonData(activeNum);
    }
  }, [activeNum]);

  const onButtonClick = (data: any) => {
    if (activeNum !== data) {
      if (data === "left" && activeNum !== numbers[0]) {
        setActiveNum((prev) => prev - 1);
      } else if (
        data === "right" &&
        activeNum !== numbers[numbers.length - 1]
      ) {
        setActiveNum((prev) => prev + 1);
      } else {
        if (!isNaN(data)) {
          setActiveNum(parseInt(data));
        }
      }
    }
  };
  return (
    <div className={styles.main_sec}>
      <span
        className={
          activeNum === numbers[0]
            ? styles.left_arr + " " + styles.disabled
            : styles.left_arr
        }
        onClick={() => onButtonClick("left")}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </span>
      {numbers.map((x, index) => (
        <span
          key={index}
          className={
            activeNum === x
              ? styles.item_sec + " " + styles.number_active
              : styles.item_sec
          }
          onClick={() => onButtonClick(x)}
        >
          {x}
        </span>
      ))}
      <span
        className={
          activeNum === numbers[numbers.length - 1]
            ? styles.right_arr + " " + styles.disabled
            : styles.right_arr
        }
        onClick={() => onButtonClick("right")}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </span>
    </div>
  );
}

export default Paginate;
