/** @format */
import FlexContainer from "../../../components/FlexContainer";
import styles from "../About.module.css";

function FeatureItem({ feature }) {
  return (
    <FlexContainer elClass={styles.feature}>
      <img
        alt={feature.title}
        src={feature.img}
        loading="lazy"
        className={`img ${styles.featureImg}`}></img>
      <div>
        <h2>{feature.title}</h2>
        <p>{feature.txt}</p>
      </div>
    </FlexContainer>
  );
}

export default FeatureItem;
