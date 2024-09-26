/** @format */
function FlexContainer({ children, elClass = null, gap = 4 }) {
  const style = { display: "flex", gap: `${gap}rem`, margin: "3rem 3rem" };

  return (
    <div style={style} className={elClass}>
      {children}
    </div>
  );
}

export default FlexContainer;
