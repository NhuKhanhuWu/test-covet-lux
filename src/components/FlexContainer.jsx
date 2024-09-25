/** @format */
function FlexContainer({ children }) {
  const style = { display: "flex", gap: "4rem", margin: "3rem 3rem" };

  return <div style={style}>{children}</div>;
}

export default FlexContainer;
