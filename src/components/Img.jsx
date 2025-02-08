/** @format */
import getImg from "../hooks/useGetImg";
import imgPlaceHolder from "../../public/img-not-available.jpg";

function Img({ alt, elClass, imgSrc }) {
  const img = getImg(imgSrc);

  return (
    <img
      className={elClass}
      alt={alt}
      src={img}
      onError={(e) => {
        e.target.onError = null;
        e.target.src = imgPlaceHolder;
      }}
      loading="lazy"></img>
  );
}

export default Img;
