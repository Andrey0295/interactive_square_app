import PropTypes from "prop-types";
import styles from "./GameArea.module.css";

const {
  square_block,
  square,
  row,
  col,
  hoveListBlock,
  title,
  hoverList,
  hoverHistoryItem,
} = styles;

const GameArea = ({
  isStart,
  gameMode,
  squareMatrixBuilder,
  hoverHistory,
  onMouseOver,
}) => {
  return (
    <div className={square_block}>
      {isStart && gameMode && (
        <ul className={square}>
          {squareMatrixBuilder.map((el, i) => (
            <li className={row} key={i}>
              {el.map((sp, idx) => (
                <div
                  className={col}
                  key={idx}
                  onMouseOver={onMouseOver}
                  data-text={`row ${i + 1}, col ${idx + 1}`}
                ></div>
              ))}
            </li>
          ))}
        </ul>
      )}
      <div className={hoveListBlock}>
        {hoverHistory.length !== 0 && (
          <div>
            <h1 className={title}>Hover squares</h1>
            <ul className={hoverList}>
              {hoverHistory.map((el, i) => (
                <li className={hoverHistoryItem} key={i}>
                  {el}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

GameArea.propTypes = {
  isStart: PropTypes.bool.isRequired,
  onMouseOver: PropTypes.func.isRequired,
  gameMode: PropTypes.object,
  squareMatrixBuilder: PropTypes.array,
  hoverHistory: PropTypes.array,
};

GameArea.defaultProps = {
  gameMode: {},
  squareMatrixBuilder: [],
  hoverHistory: [],
};

export default GameArea;
