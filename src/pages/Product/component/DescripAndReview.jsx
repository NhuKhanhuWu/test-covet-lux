/** @format */

import { useState } from "react";
import { Reviews } from "./Reviews.jsx";
import { Description } from "./Description";
import { DesciptionAndReviewsBtn } from "./DesciptionAndReviewsBtn";
import styles from "../ProductDetail.module.css";

export function DescripAndReview({ product, reviews = null }) {
  const testReviews = [
    {
      userName: "ongzao",
      rating: 5,
      text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos quo inventore expedita soluta nemo, animi recusandae repellendus ea atque dicta cumque, aspernatur a tempora dignissimos molestias temporibus rerum autem beatae",
    },
    {
      userName: "user123",
      rating: 5,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora error ullam ea cum repellendus voluptatibus adipisci numquam ut facere, ipsum beatae! Quibusdam unde tenetur recusandae ipsam cum sint aspernatur voluptas!",
    },
  ];

  const [showedEl, setShowedEl] = useState("descipt");

  return (
    <>
      <DesciptionAndReviewsBtn
        showedEl={showedEl}
        setShowedEl={setShowedEl}></DesciptionAndReviewsBtn>

      <div className={styles.descripReviewContainer}>
        <Description product={product} showedEl={showedEl}></Description>
        <Reviews reviews={testReviews} showedEl={showedEl}></Reviews>
      </div>
    </>
  );
}
