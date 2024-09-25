/** @format */

function Grid3Col({ children }) {
  const style = {
    display: "grid",
    gridTemplateCol: "repeat(3,1fr)",
    gap: "1.5rem",
  };

  return <div style={style}>{children}</div>;
}

export default Grid3Col;
