import { useEffect, useState } from "react";
import styles from "./SquareMain.module.css";

const MainSquare = () => {
  let [size, setSize] = useState(5);
  let [matrix, setMatrix] = useState([]);
  let [rowcolor, setRowColor] = useState("blue");

  useEffect(() => getMatrix(), []);

  function getMatrix() {
    let row = [];
    let col = [];
    for (let index = 0; index < 5; index++) {
      col.push(0);
      row.push(col);
    }
    console.log(col);
    console.log("row ", row);
    setMatrix(row);
  }

  function onMouseOver(event) {
    if (event.target.style.backgroundColor === rowcolor) {
      event.target.style.backgroundColor = "white";
    } else {
      event.target.style.backgroundColor = rowcolor;
    }
    console.log(event.target);
  }

  return (
    <div>
      <ul>
        {matrix.map((el, i) => (
          <li className={styles.row} key={i}>
            {el.map((sp, id) => (
              <div
                className={styles.col}
                key={id}
                onMouseOver={onMouseOver}
              ></div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MainSquare;
