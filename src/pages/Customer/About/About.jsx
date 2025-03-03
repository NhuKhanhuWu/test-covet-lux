/* * @format */

import styles from "./About.module.css";
import PageIntro from "../../../components/PageIntro/PageIntro.jsx";
import FeatureItem from "./component/FeatureItem.jsx";

const pageIntro = {
  header: "Welcome to Covet Lux",
  paragraph:
    "Welcome to Covet Lux, where style meets quality. We offer a curated collection of shoes and clothing to inspire confidence and fit every occasion. With seamless shopping and exceptional service, we make it easy to find your perfect look.",
};

const features = [
  {
    title: "Quality & Variety",
    img: "https://images.pexels.com/photos/102129/pexels-photo-102129.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    txt: "We offer a wide selection of shoes and clothing, blending diverse styles and trends to fit your unique look. Every item is curated for quality, so you can shop confidently and feel your best.",
  },
  {
    title: "Easy Shopping",
    img: "https://images.pexels.com/photos/935743/pexels-photo-935743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    txt: "Our website is designed for easy browsing on any device. With helpful filters, detailed descriptions, finding the perfect fit has never been easier.",
  },
  {
    title: "Support & Returns",
    img: "https://images.pexels.com/photos/845451/pexels-photo-845451.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    txt: "Your satisfaction is our priority. We provide quick support through email, phone, along with easy return policies, so you can shop stress-free.",
  },
];

function About() {
  return (
    <>
      <main className={styles.mainContainer}>
        <PageIntro
          header={pageIntro.header}
          paragraph={pageIntro.paragraph}></PageIntro>

        <div className={styles.featureContainer}>
          {features.map((feature, i) => (
            <FeatureItem feature={feature} key={i}></FeatureItem>
          ))}
        </div>
      </main>
    </>
  );
}

export default About;
