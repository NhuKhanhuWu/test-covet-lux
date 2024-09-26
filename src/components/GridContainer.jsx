/** @format */

function GridContainer({ children, numCol = 3, gap = 3 }) {
  const style = {
    display: "grid",
    gridTemplateColumns: `repeat(${numCol},1fr)`,
    gap: `${gap}rem`,
  };

  return <div style={style}>{children}</div>;
}

export default GridContainer;
