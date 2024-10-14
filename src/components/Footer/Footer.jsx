/** @format */
import { Link } from "react-router-dom";
import FlexContainer from "../FlexContainer";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <>
      <FlexContainer elClass={styles.footer}>
        <div>
          <h3>About us</h3>
          <p>
            Covet Lux is a minimalist e-commerce website dedicated to offering
            simple, elegant clothing for those who appreciate timeless fashion.
          </p>
        </div>

        <div>
          <h3>Our blog</h3>
          <ul className={styles.columnContent}>
            <li>
              <Link to="/test-covet-lux/blog?id=10">
                Classic Blue Baseball Cap
              </Link>
            </li>
            <li>
              <Link to="/test-covet-lux/blog?id=8">
                Classic Red Jogger Sweatpant
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3>Contact</h3>
          <ul className={`columnContent`}>
            <li>
              <ion-icon name="location-sharp"></ion-icon> Linh Trung, Thu Duc
            </li>
            <li>
              <ion-icon name="call-sharp"></ion-icon> 0123456789
            </li>
            <li>
              <ion-icon name="mail-sharp"></ion-icon> covetlux@gmail.com
            </li>
          </ul>
        </div>

        <div>
          <h3>Social media</h3>
          <div style={{ display: "flex", gap: "1rem", fontSize: "2rem" }}>
            <ion-icon name="logo-facebook"></ion-icon>
            <ion-icon name="logo-instagram"></ion-icon>
            <ion-icon name="logo-tiktok"></ion-icon>
          </div>
        </div>
      </FlexContainer>

      <div className="copyRight">
        <p>&copy; Copy right by Doan Thi Nhu Khanh</p>
        <p>
          This website is for educational purposes only. Do not use your
          personal information here
        </p>
      </div>
    </>
  );
}

export default Footer;
