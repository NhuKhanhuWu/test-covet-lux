/** @format */

import { Link } from "react-router-dom";
// import { HandleAddToCart } from "../ProductDetail.jsx";

export function ByNowBtn({ product, amount, handleAddToCart }) {
  return (
    <Link
      onClick={() =>
        handleAddToCart(
          product,
          amount,
          () => {},
          () => {}
        )
      }
      to={`/test-covet-lux/cart/`}
      className="fill-btn btn--small">
      Buy now
    </Link>
  );
}
