/** @format */

function GridContainer({ children, numCol = 3, gap = 3, elClass = null }) {
  const style = {
    display: "grid",
    gridTemplateColumns: `repeat(${numCol},1fr)`,
    gap: `${gap}rem`,
  };

  return (
    <div style={style} className={elClass}>
      {children}
    </div>
  );
}

export default GridContainer;
