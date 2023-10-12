import { useState } from "react";

function Counter(props: { initial: number }) {
  const initial: number = props.initial;
  const [count, setCount] = useState(initial);
  const increment = () => {
    setCount((x) => x + 1);
  };
  const decrement = () => {
    setCount((x) => x - 1);
  };
  return (
    <div className="frame">
      <div className="center">
        <div onClick={decrement} className="minus">
          <div className="minus-horz"></div>
        </div>
        <div className="result">{count}</div>
        <div onClick={increment} className="plus">
          <div className="vert"></div>
          <div className="horz"></div>
        </div>
      </div>
    </div>
  );
}

export default Counter;
