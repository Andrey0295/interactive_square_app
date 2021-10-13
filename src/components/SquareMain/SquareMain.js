import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./SquareMain.module.css";

const MainSquare = () => {
  let [size, setSize] = useState(0);
  let [matrix, setMatrix] = useState([]);
  let [cellColor] = useState("blue");
  let [hoverHistory, setHoverHistory] = useState([]);
  let [squareMode, setSquareMode] = useState(null);

  useEffect(
    () =>
      axios
        .get("http://demo1030918.mockable.io/")
        .then((res) => setSquareMode(res.data)),
    []
  );

  useEffect(() => {
    let row = [];
    let col = [];
    for (let index = 0; index < size; index++) {
      col.push(0);
      row.push(col);
    }
    setMatrix(row);
  }, [size]);

  function onMouseOver(event) {
    const { style, dataset } = event.currentTarget;

    style.backgroundColor === cellColor
      ? (style.backgroundColor = "white")
      : (style.backgroundColor = cellColor);
    setHoverHistory([...hoverHistory, dataset.text.split()]);
  }

  function onChangeSelect(e) {
    setSize(squareMode[e.target.value].field);
  }

  return (
    <>
      {squareMode && (
        <select onChange={onChangeSelect} defaultValue={"pick mode"}>
          <option disabled value={"pick mode"}>
            pick mode
          </option>
          {Object.keys(squareMode).map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      )}
      <div className={styles.square_block}>
        <ul>
          {matrix.map((el, i) => (
            <li className={styles.row} key={i}>
              {el.map((sp, idx) => (
                <div
                  className={styles.col}
                  key={idx}
                  onMouseOver={onMouseOver}
                  data-text={`row ${i + 1}, col ${idx + 1}`}
                ></div>
              ))}
            </li>
          ))}
        </ul>
        <ul>
          {hoverHistory.map((el, index) => (
            <li key={index}>{el}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default MainSquare;
