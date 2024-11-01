/** @format */
import imgPlaceHolder from "../../public/img-not-available.jpg";

function getImg(src) {
  return src
    ? src.replace(/[[\]"]/g, "") // Removes brackets and quotes
    : imgPlaceHolder;
}

export default getImg;
