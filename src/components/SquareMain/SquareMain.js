import axios from "axios";
import { useEffect, useState } from "react";
import GameArea from "../GameArea/GameArea";
import styles from "./SquareMain.module.css";

const BASE_URL = "http://demo1030918.mockable.io/";
const cellColorMain = "white";
const cellColorHover = "blue";

const { gameMenuBlock, select, gameBtn } = styles;

const MainSquare = () => {
  const [size, setSize] = useState(0);
  const [matrix, setMatrix] = useState([]);
  const [hoverHistory, setHoverHistory] = useState([]);
  const [squareMode, setSquareMode] = useState({});
  const [isStart, setIsStart] = useState(false);
  const [selected, setSelected] = useState("pick mode");

  useEffect(
    () => axios.get(BASE_URL).then(({ data }) => setSquareMode(data)),
    []
  );

  useEffect(() => {
    let row = [];
    let col = [];
    for (let i = 0; i < size; i++) {
      col.push(0);
      row.push(col);
    }
    setMatrix(row);
  }, [size]);

  function onMouseOver(event) {
    const { style, dataset } = event.currentTarget;

    if (style.backgroundColor === cellColorHover) {
      style.backgroundColor = cellColorMain;
    } else {
      style.backgroundColor = cellColorHover;
      setHoverHistory([...hoverHistory, dataset.text.split()]);
    }
  }

  function onChangeSelect(e) {
    const { value } = e.target;
    setSize(squareMode[value].field);
    setSelected(value);
  }

  function onButtonClick() {
    setIsStart(!isStart);
    if (isStart) {
      resetCurrentLevel();
    }
  }

  function resetCurrentLevel() {
    setSize(0);
    setMatrix([]);
    setHoverHistory([]);
    setSelected("pick mode");
  }

  return (
    <>
      <div className={gameMenuBlock}>
        <button
          style={isStart ? { backgroundColor: "maroon" } : null}
          className={gameBtn}
          onClick={onButtonClick}
          disabled={size ? false : true}
        >
          {isStart ? "Stop" : "Start"}
        </button>
        {squareMode && (
          <select
            className={select}
            onChange={onChangeSelect}
            value={selected}
            disabled={isStart ? true : false}
          >
            <option hidden value={"pick mode"}>
              pick mode
            </option>
            {Object.keys(squareMode).map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        )}
      </div>
      <GameArea
        isStart={isStart}
        gameMode={squareMode}
        squareMatrixBuilder={matrix}
        onMouseOver={onMouseOver}
        hoverHistory={hoverHistory}
      />
    </>
  );
};

export default MainSquare;
