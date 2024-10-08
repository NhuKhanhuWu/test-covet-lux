/** @format */

function GridContainer({
  children,
  numCol = 3,
  gap = 3,
  gapCol = 0,
  gapRow = 0,
  elClass = null,
}) {
  const style = {
    display: "grid",
    gridTemplateColumns: `repeat(${numCol},1fr)`,
    columnGap: `${gapCol}rem`,
    rowGap: `${gapRow}rem`,
    gap: `${gap}rem`,
  };

  return (
    <div style={style} className={elClass}>
      {children}
    </div>
  );
}

export default GridContainer;
