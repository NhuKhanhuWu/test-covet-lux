/** @format */
export function BlankDivider({ distance = 2 }) {
  const style = {
    height: `${distance}rem`,
  };

  return <div style={style}></div>;
}

export function LineDivider({ distance = 2, color = `var(--orange)` }) {
  const style = {
    width: "60%",
    height: `${distance}rem`,
    borderBottom: `solid 1.5px ${color}`,
    margin: "auto",
  };

  return <div style={style}></div>;
}
