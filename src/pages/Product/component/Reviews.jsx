/** @format */
import styles from "../ProductDetail.module.css";
import FlexContainer from "../../../components/FlexContainer";
import avatar from "../../../../public/avatar.jpg";

export function Reviews({ reviews, showedEl }) {
  return (
    <div
      className={`${styles.reviews} ${showedEl === "reviews" ? "" : "hidden"}`}>
      {reviews.map((review, i) => (
        <div key={`review-${i}`}>
          <FlexContainer margin={0} gap={1}>
            <img alt={review.userName} src={avatar} className="small-avatar" />

            <div>
              <p>{review.userName}</p>
              <span>⭐⭐⭐⭐⭐</span>
              <p>27/09/2024</p>
              <p
                style={{ marginTop: "1rem", width: "60%" }}
                className={styles.reviewTxt}>
                {review.text}
              </p>
            </div>
          </FlexContainer>
        </div>
      ))}
    </div>
  );
}
