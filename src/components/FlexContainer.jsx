/** @format */
function FlexContainer({ children, elClass = null, gap = 4, margin = 3 }) {
  const style = { display: "flex", gap: `${gap}rem`, margin: `${margin}rem` };

  return (
    <div style={style} className={elClass}>
      {children}
    </div>
  );
}

export default FlexContainer;
