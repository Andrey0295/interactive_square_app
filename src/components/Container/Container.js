import PropTypes from "prop-types";
import styles from "./Container.module.css";

const Container = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

Container.propTypes = {
  children: PropTypes.node,
};

Container.defaultProps = {
  children: [],
};

export default Container;
