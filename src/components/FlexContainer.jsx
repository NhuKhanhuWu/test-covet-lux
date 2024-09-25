/** @format */
function FlexContainer({ children, elClass = null }) {
  const style = { display: "flex", gap: "4rem", margin: "3rem 3rem" };

  return (
    <div style={style} className={elClass}>
      {children}
    </div>
  );
}

export default FlexContainer;
