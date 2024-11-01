/** @format */

import { Link, useSearchParams } from "react-router-dom";
import useGetData from "../../hooks/useGetData.jsx";
import { useEffect } from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from "react-share";

import styles from "./BlogDetail.module.css";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";
import RenderQueryData from "../../components/RenderQueryData.jsx";
import { BlankDivider } from "../../components/Divider.jsx";
import Img from "../../components/Img.jsx";

const blogContent = {
  summary:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium officia dolor magnam dolorem Quos obcaecati fugiat",
  header: "Lorem ipsum dolor sit amet",
  opening:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, beatae quisquam non labore, mollitia vero tempora minima debitis tenetur suscipit dolorum eos, cumque a sit porro ipsa natus? Quos, dolorum.",
  paragraph:
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit ut magni fugit tenetur explicabo rerum unde ducimus recusandae, natus cumque, nobis facilis repellendus nesciunt dolorum harum? Vitae saepe ex atque. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio pariatur quae exercitationem nulla nostrum reiciendis minus eligendi quisquam dolores quasi? Perspiciatis adipisci maiores nulla mollitia accusamus necessitatibus eius eveniet cum!",
};

function formatDate(dateString) {
  const postDate = new Date(dateString);
  return postDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function BlogDetail() {
  const [url] = useSearchParams();
  const urlString = window.location.href;
  const blogId = url.get("id");
  const {
    dataResponse: blogData,
    isError,
    isLoading,
  } = useGetData(`products/${blogId}`);

  //   scroll to top when load other blog
  useEffect(function () {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <NavBar></NavBar>
      <BlankDivider distance={2}></BlankDivider>

      {/* back to blog list */}
      <Link to={`/test-covet-lux/blogs`} className={styles.backBtn}>
        <span className="material-symbols-outlined">arrow_back</span>
        GO BACK
      </Link>

      <main className={styles.blogContainer}>
        <RenderQueryData
          isError={isError}
          isLoading={isLoading}
          isEmptyList={blogData === 0}>
          <div className="thin-txt">{formatDate(blogData.creationAt)}</div>

          <h1 className={styles.title}>{blogData.title}</h1>

          <p className={styles.summary}>{blogContent.summary}</p>

          {blogData?.images && (
            <div className={styles.imgContainer}>
              <Img
                alt={blogData.title}
                imgSrc={blogData?.images[0]}
                elClass={`img ${styles.blogImg}`}></Img>
              {/* <img
                loading="lazy"
                alt={blogData.title}
                src={blogData?.images[0].replace("[", "").replace('"', "")}
                className={`img ${styles.blogImg}`}></img> */}
            </div>
          )}

          <p className={styles.paragraph}>{blogContent.opening}</p>

          <blockquote className={styles.blockquote}>
            {blogData.description}
          </blockquote>

          <h2>{blogContent.header}</h2>

          <p className={styles.paragraph}>{blogContent.paragraph}</p>

          <div className={styles.share}>
            Share to:
            <FacebookShareButton hashtag="covetlux" url={urlString}>
              <ion-icon name="logo-facebook"></ion-icon>
            </FacebookShareButton>
            <TwitterShareButton
              url={urlString}
              windowHeight={1000}
              windowWidth={1000}>
              <ion-icon name="logo-twitter"></ion-icon>
            </TwitterShareButton>
            <LinkedinShareButton url={urlString}>
              <ion-icon name="logo-linkedin"></ion-icon>
            </LinkedinShareButton>
          </div>
        </RenderQueryData>
      </main>

      <BlankDivider distance={4}></BlankDivider>
      <Footer></Footer>
    </>
  );
}

export default BlogDetail;
