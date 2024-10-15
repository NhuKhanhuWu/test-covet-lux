/** @format */

import useGetData from "../../hooks/useGetData.jsx";

import { BlankDivider } from "../../components/Divider";
import GridContainer from "../../components/GridContainer.jsx";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";
import BigBlogItem from "./componemt_blogs/BlogItem.jsx";
import RenderQueryData from "../../components/RenderQueryData.jsx";
import styles from "./Blogs.module.css";
import PageIntro from "../../components/PageIntro/PageIntro.jsx";
import ScrollTopBtn from "../../components/ScrollTopBtn/ScrollTopBtn.jsx";

const pageIntro = {
  header: "Covet Lux Blog",
  paragraph: `Welcome to the Covet Lux blog! Here, you’ll find the latest fashion trends, styling tips, and updates on new arrivals. Get inspired with outfit ideas, learn how to care for your favorite pieces, and dive into behind-the-scenes stories.`,
};

function Blogs() {
  // get blog data
  const {
    dataResponse: blogs,
    isError,
    isLoading,
  } = useGetData("products?offset=0&limit=8");

  return (
    <>
      <NavBar></NavBar>

      <main>
        <PageIntro
          header={pageIntro.header}
          paragraph={pageIntro.paragraph}></PageIntro>

        <RenderQueryData
          isError={isError}
          isLoading={isLoading}
          isEmptyList={blogs.length === 0}>
          <GridContainer
            gap={5}
            numCol={2}
            gapRow={2}
            elClass={styles.listContaner}>
            {blogs.map((blog, i) => (
              <BigBlogItem key={`new-blog-${i}`} blog={blog}></BigBlogItem>
            ))}
          </GridContainer>
        </RenderQueryData>
      </main>

      <BlankDivider></BlankDivider>
      <Footer></Footer>
    </>
  );
}

export default Blogs;
