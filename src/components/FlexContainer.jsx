/** @format */
function FlexContainer({
  children,
  elClass = null,
  gap = 4,
  margin = 3,
  spaceBetween = false,
  verticalCenter = false,
}) {
  const style = {
    display: "flex",
    gap: `${gap}rem`,
    margin: `${margin}rem`,
    justifyContent: `${spaceBetween ? "space-between" : ""}`,
    alignItems: verticalCenter && "center",
  };

  return (
    <div style={style} className={elClass}>
      {children}
    </div>
  );
}

export default FlexContainer;
