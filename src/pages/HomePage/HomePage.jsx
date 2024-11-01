/** @format */
import styles from "./HomePage.module.css";
import NavBar from "../../components/NavBar/NavBar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import BigBanner from "../../components/Banner/BigBanner.jsx";
import SmallBanner from "../../components/Banner/SmallBanner.jsx";
import FlexContainer from "../../components/FlexContainer.jsx";
import ListHeader from "../../components/ListHeader/ListHeader.jsx";
import IntroSection from "../../components/IntroSection/IntroSection.jsx";
import BlogItem from "../../components/BlogItem/BlogItem.jsx";
import { BlankDivider, LineDivider } from "../../components/Divider.jsx";
import RenderQueryData from "../../components/RenderQueryData.jsx";

import useGetData from "../../hooks/useGetData.jsx";
import { useMediaQuery } from "react-responsive";
import RecommendProduct from "../../components/RecommendProduct/RecommendProduct.jsx";

const bigBannerData = {
  header: "BLACK FRIDAY SALE",
  text: "Discount up to 30% and free shipping for orders over $399",
  imgUrl:
    "https://images.pexels.com/photos/934069/pexels-photo-934069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  url: "/test-covet-lux/products?page=1",
};

const smallBannerData = [
  {
    header: "EXPLORE OUR BLOGS",
    url: "/test-covet-lux/blogs",
    imgUrl:
      "https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    header: "ABOUT COVET LUX",
    url: "/test-covet-lux/infor",
    imgUrl:
      "https://images.pexels.com/photos/1937336/pexels-photo-1937336.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
];

const introData = {
  title: "What is Covet Lux",
  content:
    "Covet Lux is a minimalist e-commerce website dedicated to offering simple, elegant clothing for those who appreciate timeless fashion. Specializing in high-quality, understated pieces, Covet Lux focuses on creating a curated collection of essential wardrobe staples that are both stylish and versatile.",
  url: "/test-covet-lux/infor",
};

function SmlBannerContaner() {
  return (
    <>
      <SmallBanner
        header={smallBannerData[0].header}
        url={smallBannerData[0].url}
        imgUrl={smallBannerData[0].imgUrl}></SmallBanner>
      <SmallBanner
        header={smallBannerData[1].header}
        url={smallBannerData[1].url}
        imgUrl={smallBannerData[1].imgUrl}></SmallBanner>
    </>
  );
}

function Banner() {
  return (
    <div className={styles.banner}>
      <div className={styles.bigBanner}>
        <BigBanner
          imgUrl={bigBannerData.imgUrl}
          header={bigBannerData.header}
          text={bigBannerData.text}
          url={bigBannerData.url}></BigBanner>
      </div>
      <SmlBannerContaner></SmlBannerContaner>
    </div>
  );
}

function HomePage() {
  const blogQty = useMediaQuery({
    query: "(max-width: 730px) and (min-width:500px)",
  })
    ? 3
    : 4;

  const {
    isLoading: isBlogLoading,
    isError: blogErr,
    dataResponse: blogList,
  } = useGetData(`products?offset=10&limit=${blogQty}`);

  return (
    <>
      <NavBar></NavBar>

      <main>
        <Banner></Banner>

        {/* new product: start */}
        <RecommendProduct offset={0} query={"products/?"}></RecommendProduct>
        {/* new product: end */}

        {/* best seller product: start */}
        <RecommendProduct offset={7} query={"products/?"}></RecommendProduct>
        {/* best seller product: end */}

        <LineDivider distance={2} color={"rgb(252, 108, 34)"}></LineDivider>
        {/* intro section: start */}
        <IntroSection
          header={introData.title}
          content={introData.content}
          url={introData.url}></IntroSection>
        {/* intro section: end */}

        {/* blog section: start */}
        <RenderQueryData
          isError={blogErr}
          isLoading={isBlogLoading}
          isEmptyList={blogList.length === 0}>
          {" "}
          <ListHeader
            title={"New blog"}
            url={"/test-covet-lux/blogs"}></ListHeader>
          <FlexContainer elClass={styles.blogContainer}>
            {blogList.map((blog, i) => (
              <BlogItem blog={blog} key={`blog-${i}`}></BlogItem>
            ))}
          </FlexContainer>
        </RenderQueryData>
        {/* blog section: end */}

        <BlankDivider distance={2}></BlankDivider>
      </main>

      {/* footer: start */}
      <Footer></Footer>
      {/* footer: end */}
    </>
  );
}

export default HomePage;
